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



import cors from "cors";

const allowedOrigins = [
  "https://my-hackathon-project-kappa.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

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
app.get('/api/wellness/alerts', verifyToken, (req, res) => {
  try {
    if (req.user.role !== 'Welfare Administrator') {
      return res.status(403).json({
        error: 'You are not authorized to access welfare alerts.',
      });
    }

    const alerts = db
      .prepare(`
        SELECT
          personnel_id,
          date,
          stress_level,
          fatigue_level,
          sleep_hours,
          mood,
          energy_level,
          ai_risk,
          ai_confidence,
          human_verification
        FROM wellness_updates
        WHERE ai_risk IN ('Moderate', 'High')
        ORDER BY date DESC
        LIMIT 20
      `)
      .all();

    const formattedAlerts = alerts.map((item, index) => ({
      id: `REAL-ALERT-${index}-${item.personnel_id}`,
      severity: item.ai_risk,
      title: `${item.ai_risk} wellness risk detected`,
      timestamp: new Date(item.date).toLocaleString(),
      description:
        `Personnel ${item.personnel_id} recorded stress ${item.stress_level}/10, ` +
        `fatigue ${item.fatigue_level}/10, sleep ${item.sleep_hours} hours, ` +
        `mood ${item.mood}, and energy ${item.energy_level}/10.`,
      affectedGroup: item.personnel_id,
      aiConfidence: item.ai_confidence,
      humanVerification: item.human_verification,
    }));

    res.json(formattedAlerts);
  } catch (error) {
    console.error('Wellness alerts error:', error);

    res.status(500).json({
      error: 'Failed to load wellness alerts.',
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
app.get('/api/wellness/personnel', verifyToken, (req, res) => {
  try {
    if (req.user.role !== 'Welfare Administrator') {
      return res.status(403).json({
        error: 'You are not authorized to access personnel wellness data.',
      });
    }

    const personnel = db
      .prepare(`
        SELECT
          personnel_id,
          MAX(date) AS last_check_in,
          ROUND(AVG(sleep_hours), 1) AS average_sleep,
          ROUND(AVG(stress_level), 1) AS average_stress,
          ROUND(AVG(fatigue_level), 1) AS average_fatigue,
          ROUND(AVG(energy_level), 1) AS average_energy,
          ai_risk,
          ai_confidence,
          human_verification
        FROM wellness_updates
        GROUP BY personnel_id
        ORDER BY
          CASE ai_risk
            WHEN 'High' THEN 1
            WHEN 'Moderate' THEN 2
            WHEN 'Low' THEN 3
            ELSE 4
          END,
          last_check_in DESC
      `)
      .all();

    res.json(personnel);
  } catch (error) {
    console.error('Personnel wellness error:', error);

    res.status(500).json({
      error: 'Failed to load personnel wellness data.',
    });
  }
});
app.get('/api/wellness/alerts', verifyToken, (req, res) => {
  try {
    if (req.user.role !== 'Welfare Administrator') {
      return res.status(403).json({
        error: 'You are not authorized to access welfare alerts.',
      });
    }

    const alerts = db
      .prepare(`
        SELECT
          personnel_id,
          date,
          stress_level,
          fatigue_level,
          sleep_hours,
          mood,
          energy_level,
          ai_risk,
          ai_confidence,
          human_verification
        FROM wellness_updates
        WHERE ai_risk IN ('Moderate', 'High')
        ORDER BY date DESC
        LIMIT 50
      `)
      .all();

    const formattedAlerts = alerts.map((item, index) => ({
      id: `REAL-ALERT-${index + 1}`,
      severity: item.ai_risk,
      status: 'Active',
      riskType:
        item.ai_risk === 'High'
          ? 'High Wellness Risk'
          : 'Elevated Wellness Risk',
      timestamp: new Date(item.date).toLocaleString(),
      title:
        item.ai_risk === 'High'
          ? 'High Wellness Risk Detected'
          : 'Moderate Wellness Risk Detected',
      description:
        `Personnel ${item.personnel_id} recorded stress ` +
        `${item.stress_level}/10, fatigue ${item.fatigue_level}/10, ` +
        `sleep ${item.sleep_hours} hours, mood ${item.mood}, ` +
        `and energy ${item.energy_level}/10.`,
      affectedGroup: item.personnel_id,
      aiConfidence: item.ai_confidence ?? 80,
      recommendedAction:
        item.ai_risk === 'High'
          ? 'Review the personnel wellness record and initiate appropriate human welfare support.'
          : 'Review the wellness record and continue monitoring for changes.',
      humanVerification: item.human_verification,
    }));

    res.json(formattedAlerts);
  } catch (error) {
    console.error('Wellness alerts error:', error);

    res.status(500).json({
      error: 'Failed to load wellness alerts.',
    });
  }
});
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(
    `Welfare Intelligence backend running on port ${PORT}`
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