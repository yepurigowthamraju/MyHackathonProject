import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './database.js';
import { askAI } from './ai.js';

import {
  registerUser,
  loginUser,
  verifyToken,
} from './auth.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

app.use(express.json());

/* -------------------------
   HEALTH CHECK
------------------------- */

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message:
      'Welfare Intelligence backend is running.',
  });
});

/* -------------------------
   REGISTER
------------------------- */

app.post(
  '/api/auth/register',
  async (req, res) => {
    try {
      const {
        name,
        email,
        unit,
        password,
        role,
      } = req.body;

      if (
        !name ||
        !email ||
        !unit ||
        !password ||
        !role
      ) {
        return res.status(400).json({
          error:
            'All registration fields are required.',
        });
      }

      if (
        ![
          'Personnel User',
          'Welfare Administrator',
        ].includes(role)
      ) {
        return res.status(400).json({
          error: 'Invalid account role.',
        });
      }

      if (password.length < 6) {
        return res.status(400).json({
          error:
            'Password must contain at least 6 characters.',
        });
      }

      const user =
        await registerUser({
          name,
          email,
          unit,
          password,
          role,
        });

      res.status(201).json({
        message:
          'Account created successfully.',
        user,
      });
    } catch (error) {
      console.error(error);

      res.status(400).json({
        error:
          error instanceof Error
            ? error.message
            : 'Registration failed.',
      });
    }
  }
);

/* -------------------------
   LOGIN
------------------------- */

app.post(
  '/api/auth/login',
  async (req, res) => {
    try {
      const {
        personnelId,
        password,
      } = req.body;

      if (!personnelId || !password) {
        return res.status(400).json({
          error:
            'Personnel ID and password are required.',
        });
      }

      const result =
        await loginUser({
          personnelId,
          password,
        });

      res.json(result);
    } catch (error) {
      res.status(401).json({
        error:
          error instanceof Error
            ? error.message
            : 'Login failed.',
      });
    }
  }
);

/* -------------------------
   CURRENT USER
------------------------- */

app.get(
  '/api/auth/me',
  verifyToken,
  (req, res) => {
    res.json({
      user: req.user,
    });
  }
);

/* -------------------------
   START SERVER
------------------------- */

app.post('/api/ai/chat', verifyToken, async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: 'Message is required.',
      });
    }

    let welfareData;

if (req.user.role === 'Personnel User') {
  welfareData = db
    .prepare(`
      SELECT
        personnel_id,
        date,
        sleep_hours,
        sleep_quality,
        stress_level,
        fatigue_level,
        mood,
        energy_level,
        rest_recovery,
        ai_risk,
        ai_confidence,
        human_verification
      FROM wellness_updates
      WHERE personnel_id = ?
      ORDER BY date DESC
      LIMIT 100
    `)
    .all(req.user.personnelId);
} else if (req.user.role === 'Welfare Administrator') {
  welfareData = db
    .prepare(`
      SELECT
        personnel_id,
        date,
        sleep_hours,
        sleep_quality,
        stress_level,
        fatigue_level,
        mood,
        energy_level,
        rest_recovery,
        ai_risk,
        ai_confidence,
        human_verification
      FROM wellness_updates
      ORDER BY date DESC
      LIMIT 100
    `)
    .all();
} else {
  return res.status(403).json({
    error: 'You are not authorized to access wellness data.',
  });
}

const response = await askAI({
  message: message.trim(),
  role: req.user.role,
  welfareData,
});

    res.json({
      response,
    });
  } catch (error) {
    console.error('AI error:', error);

    res.status(500).json({
      error: 'AI assistant failed to respond.',
    });
  }
});
/* -------------------------
   WELLNESS UPDATE
------------------------- */

app.post(
  '/api/wellness',
  verifyToken,
  async (req, res) => {
    try {
      const {
        date,
        bodyWeight,
        waterIntake,
        meals,
        sleepHours,
        sleepQuality,
        exercise,
        stressLevel,
        fatigueLevel,
        mood,
        energyLevel,
        restRecovery,
        notes,
        aiRisk,
        aiConfidence,
        humanVerification,
        notificationStatus,
      } = req.body;

      if (
        sleepHours === undefined ||
        stressLevel === undefined ||
        fatigueLevel === undefined ||
        energyLevel === undefined
      ) {
        return res.status(400).json({
          error: 'Required wellness fields are missing.',
        });
      }

      const result = db.prepare(`
        INSERT INTO wellness_updates (
          personnel_id,
          date,
          body_weight,
          water_intake,
          meals,
          sleep_hours,
          sleep_quality,
          exercise,
          stress_level,
          fatigue_level,
          mood,
          energy_level,
          rest_recovery,
          notes,
          ai_risk,
          ai_confidence,
          human_verification,
          notification_status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        req.user.personnelId,
        date || new Date().toISOString(),
        bodyWeight ?? null,
        waterIntake ?? null,
        meals || '',
        sleepHours,
        sleepQuality || 'Good',
        exercise || '',
        stressLevel,
        fatigueLevel,
        mood || 'Good',
        energyLevel,
        restRecovery || '',
        notes || '',
        aiRisk || 'Low',
        aiConfidence ?? 80,
        humanVerification || 'Pending',
        notificationStatus || 'Not Sent'
      );

      res.status(201).json({
        message: 'Wellness update saved successfully.',
        id: result.lastInsertRowid,
      });
    } catch (error) {
      console.error('Wellness update error:', error);

      res.status(500).json({
        error: 'Failed to save wellness update.',
      });
    }
  }
);
app.get('/api/wellness/analytics', verifyToken, (req, res) => {
  try {
    if (req.user.role !== 'Welfare Administrator') {
      return res.status(403).json({
        error: 'You are not authorized to access welfare analytics.',
      });
    }

    const totalPersonnel = db
      .prepare(`
        SELECT COUNT(DISTINCT personnel_id) AS count
        FROM wellness_updates
      `)
      .get().count;

    const totalRecords = db
      .prepare(`
        SELECT COUNT(*) AS count
        FROM wellness_updates
      `)
      .get().count;

    const riskCounts = db
      .prepare(`
        SELECT
          ai_risk,
          COUNT(*) AS count
        FROM wellness_updates
        GROUP BY ai_risk
      `)
      .all();

    const averages = db
      .prepare(`
        SELECT
          ROUND(AVG(stress_level), 1) AS averageStress,
          ROUND(AVG(fatigue_level), 1) AS averageFatigue,
          ROUND(AVG(sleep_hours), 1) AS averageSleep,
          ROUND(AVG(energy_level), 1) AS averageEnergy
        FROM wellness_updates
      `)
      .get();

    const pendingReviews = db
      .prepare(`
        SELECT COUNT(*) AS count
        FROM wellness_updates
        WHERE human_verification = 'Pending'
      `)
      .get().count;

    const lowRisk =
      riskCounts.find((item) => item.ai_risk === 'Low')?.count || 0;

    const moderateRisk =
      riskCounts.find((item) => item.ai_risk === 'Moderate')?.count || 0;

    const highRisk =
      riskCounts.find((item) => item.ai_risk === 'High')?.count || 0;

    const totalRiskRecords = lowRisk + moderateRisk + highRisk;

    const riskDistribution = [
      {
        name: 'Low Risk',
        value:
          totalRiskRecords > 0
            ? Number(((lowRisk / totalRiskRecords) * 100).toFixed(1))
            : 0,
        color: '#10b981',
      },
      {
        name: 'Moderate',
        value:
          totalRiskRecords > 0
            ? Number(((moderateRisk / totalRiskRecords) * 100).toFixed(1))
            : 0,
        color: '#f59e0b',
      },
      {
        name: 'High',
        value:
          totalRiskRecords > 0
            ? Number(((highRisk / totalRiskRecords) * 100).toFixed(1))
            : 0,
        color: '#f97316',
      },
    ];

    res.json({
      totalPersonnel,
      totalRecords,
      lowRisk,
      moderateRisk,
      highRisk,
      pendingReviews,
      averageStress: averages.averageStress ?? 0,
      averageFatigue: averages.averageFatigue ?? 0,
      averageSleep: averages.averageSleep ?? 0,
      averageEnergy: averages.averageEnergy ?? 0,
      riskDistribution,
    });
  } catch (error) {
    console.error('Wellness analytics error:', error);

    res.status(500).json({
      error: 'Failed to load wellness analytics.',
    });
  }
});
app.get('/api/wellness/trends', verifyToken, (req, res) => {
  try {
    if (req.user.role !== 'Welfare Administrator') {
      return res.status(403).json({
        error: 'You are not authorized to access wellness trends.',
      });
    }

    const trends = db
      .prepare(`
        SELECT
          date,
          ROUND(AVG(stress_level), 1) AS avgStress,
          ROUND(AVG(fatigue_level), 1) AS fatigue,
          ROUND(AVG(energy_level), 1) AS recovery
        FROM wellness_updates
        GROUP BY date
        ORDER BY date ASC
        LIMIT 30
      `)
      .all();

    res.json(trends);
  } catch (error) {
    console.error('Wellness trends error:', error);

    res.status(500).json({
      error: 'Failed to load wellness trends.',
    });
  }
});
const server = app.listen(PORT, () => {
  console.log(
    `Welfare Intelligence backend running on http://localhost:${PORT}`
  );
});

server.on('error', (error) => {
  console.error('SERVER ERROR:', error);
});

server.on('close', () => {
  console.log('SERVER CLOSED');
});

process.on('exit', (code) => {
  console.log('NODE PROCESS EXITED:', code);
});