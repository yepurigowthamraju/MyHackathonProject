import 'dotenv/config';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from './database.js';

const JWT_SECRET =
  process.env.JWT_SECRET || 'development-secret-change-this';

export async function registerUser({
  name,
  email,
  unit,
  password,
  role,
}) {
  const existingEmail = db
    .prepare(
      'SELECT id FROM users WHERE email = ?'
    )
    .get(email);

  if (existingEmail) {
    throw new Error(
      'An account with this email already exists.'
    );
  }

  const prefix =
    role === 'Personnel User'
      ? 'PU'
      : 'WA';

  const lastUser = db
    .prepare(
      `SELECT personnel_id
       FROM users
       WHERE personnel_id LIKE ?
       ORDER BY id DESC
       LIMIT 1`
    )
    .get(`${prefix}-%`);

  let nextNumber =
    role === 'Personnel User'
      ? 1001
      : 9001;

  if (lastUser) {
    const number = Number(
      lastUser.personnel_id.split('-')[1]
    );

    if (!Number.isNaN(number)) {
      nextNumber = number + 1;
    }
  }

  const personnelId =
    `${prefix}-${nextNumber}`;

  const passwordHash =
    await bcrypt.hash(password, 12);

  const rankTitle =
    role === 'Personnel User'
      ? 'Personnel'
      : 'Welfare Administrator';

  const securityClearance =
    role === 'Personnel User'
      ? 'Personal Welfare Access'
      : 'Tier 3 - Welfare Confidential';

  db.prepare(`
    INSERT INTO users (
      personnel_id,
      name,
      email,
      unit,
      role,
      rank_title,
      security_clearance,
      password_hash
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    personnelId,
    name,
    email,
    unit,
    role,
    rankTitle,
    securityClearance,
    passwordHash
  );

  return {
    personnelId,
    name,
    email,
    unit,
    role,
    rankTitle,
    securityClearance,
  };
}

export async function loginUser({
  personnelId,
  password,
}) {
  const user = db
    .prepare(
      `SELECT *
       FROM users
       WHERE personnel_id = ?`
    )
    .get(personnelId);

  if (!user) {
    throw new Error(
      'Invalid personnel ID or password.'
    );
  }

  const validPassword =
    await bcrypt.compare(
      password,
      user.password_hash
    );

  if (!validPassword) {
    throw new Error(
      'Invalid personnel ID or password.'
    );
  }

  const token = jwt.sign(
    {
      userId: user.id,
      personnelId: user.personnel_id,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: '8h',
    }
  );

  return {
    token,
    user: {
      id: user.personnel_id,
      name: user.name,
      email: user.email,
      unit: user.unit,
      role: user.role,
      rankTitle: user.rank_title,
      securityClearance:
        user.security_clearance,
      lastLogin: new Date().toISOString(),
      avatarInitials: user.name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase(),
    },
  };
}

export function verifyToken(req, res, next) {
  try {
    const authHeader =
      req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Authentication required.',
      });
    }

    const token =
      authHeader.substring(7);

    const decoded =
      jwt.verify(token, JWT_SECRET);

    req.user = decoded;

    next();
  } catch {
    return res.status(401).json({
      error: 'Invalid or expired token.',
    });
  }
}