import { UserProfile } from '../types';

export interface LoginAccount {
  id: string;
  password: string;
  profile: UserProfile;
}

export const userAccounts: LoginAccount[] = [
  {
    id: 'PU-1001',
    password: 'user123',
    profile: {
      id: 'PU-1001',
      name: 'Personnel User 01',
      email: 'pu1001@welfare.mil',
      unit: 'Unit Alpha',
      role: 'Personnel User',
      rankTitle: 'Personnel',
      securityClearance: 'Personal Welfare Access',
      lastLogin: 'Active Session',
      avatarInitials: 'P1',
    },
  },
  {
    id: 'PU-1002',
    password: 'user123',
    profile: {
      id: 'PU-1002',
      name: 'Personnel User 02',
      email: 'pu1002@welfare.mil',
      unit: 'Unit Bravo',
      role: 'Personnel User',
      rankTitle: 'Personnel',
      securityClearance: 'Personal Welfare Access',
      lastLogin: 'Active Session',
      avatarInitials: 'P2',
    },
  },
  {
    id: 'PU-1003',
    password: 'user123',
    profile: {
      id: 'PU-1003',
      name: 'Personnel User 03',
      email: 'pu1003@welfare.mil',
      unit: 'Unit Charlie',
      role: 'Personnel User',
      rankTitle: 'Personnel',
      securityClearance: 'Personal Welfare Access',
      lastLogin: 'Active Session',
      avatarInitials: 'P3',
    },
  },
];

export const employeeAccounts: LoginAccount[] = [
  {
    id: 'WA-9042',
    password: 'admin123',
    profile: {
      id: 'WA-9042',
      name: 'Capt. Alex Vance',
      email: 'alex.vance@welfare.mil',
      unit: 'Joint Command Directorate',
      role: 'Welfare Administrator',
      rankTitle: 'Captain',
      securityClearance: 'Tier 3 - Welfare Confidential',
      lastLogin: 'Active Session',
      avatarInitials: 'AV',
    },
  },
  {
    id: 'WA-9043',
    password: 'admin123',
    profile: {
      id: 'WA-9043',
      name: 'Maj. Sarah Morgan',
      email: 'sarah.morgan@welfare.mil',
      unit: 'Personnel Welfare Division',
      role: 'Welfare Administrator',
      rankTitle: 'Major',
      securityClearance: 'Tier 3 - Welfare Confidential',
      lastLogin: 'Active Session',
      avatarInitials: 'SM',
    },
  },
];

const getRegisteredAccounts = (): LoginAccount[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const stored = localStorage.getItem(
      'welfare_registered_accounts'
    );

    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const getAllAccounts = (): LoginAccount[] => {
  return [
    ...userAccounts,
    ...employeeAccounts,
    ...getRegisteredAccounts(),
  ];
};

export const findAccount = (
  portal: 'user' | 'employee',
  id: string,
  password: string
): UserProfile | null => {
  const accounts = getAllAccounts().filter((account) =>
    portal === 'user'
      ? account.profile.role === 'Personnel User'
      : account.profile.role === 'Welfare Administrator'
  );

  const account = accounts.find(
    (item) =>
      item.id.toLowerCase() === id.trim().toLowerCase() &&
      item.password === password
  );

  return account ? account.profile : null;
};

export const registerAccount = (
  portal: 'user' | 'employee',
  name: string,
  email: string,
  unit: string,
  password: string
): UserProfile => {
  const allAccounts = getAllAccounts();

  const existingEmail = allAccounts.some(
    (account) =>
      account.profile.email.toLowerCase() ===
      email.trim().toLowerCase()
  );

  if (existingEmail) {
    throw new Error(
      'An account with this email already exists.'
    );
  }

  const prefix = portal === 'user' ? 'PU' : 'WA';

  const existingIds = allAccounts
    .map((account) => account.id)
    .filter((id) => id.startsWith(`${prefix}-`))
    .map((id) => Number(id.split('-')[1]))
    .filter((number) => !Number.isNaN(number));

  const nextNumber =
    existingIds.length > 0
      ? Math.max(...existingIds) + 1
      : portal === 'user'
        ? 1001
        : 9001;

  const id = `${prefix}-${nextNumber}`;

  const profile: UserProfile = {
    id,
    name: name.trim(),
    email: email.trim(),
    unit: unit.trim(),

    role:
      portal === 'user'
        ? 'Personnel User'
        : 'Welfare Administrator',

    rankTitle:
      portal === 'user'
        ? 'Personnel'
        : 'Welfare Administrator',

    securityClearance:
      portal === 'user'
        ? 'Personal Welfare Access'
        : 'Tier 3 - Welfare Confidential',

    lastLogin: 'Active Session',

    avatarInitials: name
      .trim()
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase(),
  };

  const newAccount: LoginAccount = {
    id,
    password,
    profile,
  };

  const registeredAccounts =
    getRegisteredAccounts();

  localStorage.setItem(
    'welfare_registered_accounts',
    JSON.stringify([
      ...registeredAccounts,
      newAccount,
    ])
  );

  return profile;
};