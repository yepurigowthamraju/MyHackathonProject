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
    origin: true,
    credentials: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use(express.json({ limit: '25mb' }));

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

      // Employee/Welfare Administrator accounts are provisioned by authorized
      // administrators and cannot be created from the public registration form.
      if (role === 'Welfare Administrator') {
        return res.status(403).json({
          error: 'Employee accounts cannot be self-registered. Please contact the system administrator.',
        });
      }

      if (password.length < 6 || !/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
        return res.status(400).json({
          error:
            'Password must be at least 6 characters and contain at least 1 letter and 1 number.',
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
            'Personnel ID or name and password are required.',
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
    const {
  message,
  language = 'English',
} = req.body;

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
  language,
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
   USER VIDEO SENSOR
------------------------- */

app.post('/api/wellness/videos', verifyToken, (req, res) => {
  try {
    if (req.user.role !== 'Personnel User') {
      return res.status(403).json({ error: 'Only personnel users can upload wellness videos.' });
    }

    const { fileName, mimeType, dataUrl } = req.body || {};

    if (!fileName || !mimeType || !dataUrl) {
      return res.status(400).json({ error: 'Video file data is required.' });
    }

    if (!mimeType.startsWith('video/')) {
      return res.status(400).json({ error: 'Only video files are allowed.' });
    }

    if (!String(dataUrl).startsWith('data:video/')) {
      return res.status(400).json({ error: 'Invalid video data.' });
    }

    // Keep the deployed API payload bounded. A short video is recommended.
    if (String(dataUrl).length > 20 * 1024 * 1024) {
      return res.status(413).json({ error: 'Video is too large. Please upload a short video under 15 MB.' });
    }

    const result = db.prepare(`
      INSERT INTO wellness_videos (personnel_id, file_name, mime_type, data_url, analysis_status)
      VALUES (?, ?, ?, ?, 'Pending')
    `).run(req.user.personnelId, String(fileName).slice(0, 180), mimeType, dataUrl);

    res.status(201).json({
      message: 'Video uploaded successfully.',
      id: String(result.lastInsertRowid),
      analysisStatus: 'Pending',
    });
  } catch (error) {
    console.error('Video upload error:', error);
    res.status(500).json({ error: 'Failed to upload video.' });
  }
});

app.get('/api/wellness/videos/mine', verifyToken, (req, res) => {
  try {
    if (req.user.role !== 'Personnel User') {
      return res.status(403).json({ error: 'Only personnel users can access their own videos.' });
    }

    const videos = db.prepare(`
      SELECT id, personnel_id AS personnelId, file_name AS fileName, mime_type AS mimeType,
             data_url AS dataUrl, analysis_status AS analysisStatus, created_at AS createdAt
      FROM wellness_videos
      WHERE personnel_id = ?
      ORDER BY id DESC
      LIMIT 10
    `).all(req.user.personnelId);

    res.json(videos);
  } catch (error) {
    console.error('User videos error:', error);
    res.status(500).json({ error: 'Failed to load your videos.' });
  }
});

app.get('/api/wellness/videos', verifyToken, (req, res) => {
  try {
    if (req.user.role !== 'Welfare Administrator') {
      return res.status(403).json({ error: 'You are not authorized to access personnel videos.' });
    }

    const videos = db.prepare(`
      SELECT v.id, v.personnel_id AS personnelId,
             COALESCE(u.name, v.personnel_id) AS personnelName,
             COALESCE(u.unit, '') AS unit,
             v.file_name AS fileName, v.mime_type AS mimeType, v.data_url AS dataUrl,
             v.analysis_status AS analysisStatus, v.created_at AS createdAt
      FROM wellness_videos v
      LEFT JOIN users u ON u.personnel_id = v.personnel_id
      ORDER BY v.id DESC
      LIMIT 50
    `).all();

    res.json(videos);
  } catch (error) {
    console.error('Personnel videos error:', error);
    res.status(500).json({ error: 'Failed to load personnel videos.' });
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
/* -------------------------
   USER WELLNESS HISTORY
------------------------- */

app.get('/api/wellness/history', verifyToken, (req, res) => {
  try {
    if (req.user.role !== 'Personnel User') {
      return res.status(403).json({
        error: 'Only personnel users can access their wellness history.',
      });
    }

    const history = db.prepare(`
      SELECT
        id,
        personnel_id AS personnelId,
        date,
        body_weight AS bodyWeight,
        water_intake AS waterIntake,
        meals,
        sleep_hours AS sleepHours,
        sleep_quality AS sleepQuality,
        exercise,
        stress_level AS stressLevel,
        fatigue_level AS fatigueLevel,
        mood,
        energy_level AS energyLevel,
        rest_recovery AS restRecovery,
        notes,
        ai_risk AS aiRisk,
        ai_confidence AS aiConfidence,
        human_verification AS humanVerification,
        notification_status AS notificationStatus
      FROM wellness_updates
      WHERE personnel_id = ?
      ORDER BY date DESC
    `).all(req.user.personnelId);

    res.json(history);
  } catch (error) {
    console.error('Wellness history error:', error);

    res.status(500).json({
      error: 'Failed to load wellness history.',
    });
  }
});
app.get('/api/wellness/history', verifyToken, (req, res) => {
  try {
    if (req.user.role !== 'Personnel User') {
      return res.status(403).json({
        error: 'Only personnel users can access wellness history.',
      });
    }

    const history = db.prepare(`
      SELECT
        id,
        personnel_id AS personnelId,
        date,
        body_weight AS bodyWeight,
        water_intake AS waterIntake,
        meals,
        sleep_hours AS sleepHours,
        sleep_quality AS sleepQuality,
        exercise,
        stress_level AS stressLevel,
        fatigue_level AS fatigueLevel,
        mood,
        energy_level AS energyLevel,
        rest_recovery AS restRecovery,
        notes,
        ai_risk AS aiRisk,
        ai_confidence AS aiConfidence,
        human_verification AS humanVerification,
        notification_status AS notificationStatus,
        created_at AS createdAt
      FROM wellness_updates
      WHERE personnel_id = ?
      ORDER BY date DESC, id DESC
    `).all(req.user.personnelId);

    res.json(history);
  } catch (error) {
    console.error('Wellness history error:', error);
    res.status(500).json({
      error: 'Failed to load wellness history.',
    });
  }
});
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
          id,
          personnel_id,
          date,
          created_at,
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
      id: `REAL-ALERT-${item.id}`,
      severity: item.ai_risk,
      status: 'Active',
      riskType:
        item.ai_risk === 'High'
          ? 'High Wellness Risk'
          : 'Elevated Wellness Risk',
      timestamp: new Date(item.created_at || item.date).toLocaleString(),
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
      createdAt: item.created_at,
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