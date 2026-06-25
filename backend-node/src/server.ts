import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '2mb' }));

const jwtSecret = process.env.JWT_SECRET ?? 'replace-in-production';
const courses = [
  { slug: 'beginner-english', language: 'english', title: 'Beginner English', level: 'A1-A2', lessons: 48 },
  { slug: 'ielts-preparation', language: 'english', title: 'IELTS Preparation', level: 'Band 5-8+', lessons: 52 },
  { slug: 'beginner-mandarin', language: 'chinese', title: 'Beginner Mandarin', level: 'HSK 1-2', lessons: 50 },
  { slug: 'hsk-1-6-preparation', language: 'chinese', title: 'HSK 1-6 Preparation', level: 'HSK 1-6', lessons: 96 }
];

function requireAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Missing bearer token' });
  try {
    res.locals.user = jwt.verify(token, jwtSecret);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
}

app.get('/api/v1/health', (_req, res) => res.json({ status: 'ok', service: 'Language Academy API' }));

app.post('/api/v1/auth/login', (req, res) => {
  const body = z.object({ email: z.string().email(), password: z.string().min(8) }).parse(req.body);
  const token = jwt.sign({ sub: body.email, role: 'student' }, jwtSecret, { expiresIn: '2h' });
  res.json({ token, user: { name: 'Demo Student', email: body.email, role: 'student' } });
});

app.get('/api/v1/courses', (req, res) => {
  const language = typeof req.query.language === 'string' ? req.query.language : undefined;
  const q = typeof req.query.q === 'string' ? req.query.q.toLowerCase() : '';
  res.json({ courses: courses.filter((course) => (!language || course.language === language) && course.title.toLowerCase().includes(q)) });
});

app.post('/api/v1/courses/:slug/enroll', requireAuth, (req, res) => {
  res.status(201).json({ courseSlug: req.params.slug, enrolled: true, progressPercent: 0 });
});

app.get('/api/v1/me/dashboard', requireAuth, (_req, res) => {
  res.json({ streakDays: 18, completedLessons: 126, averageQuizScore: 87, badges: ['First Quiz', 'Tone Master', 'IELTS Starter'], courseProgress: courses.slice(0, 3).map((course, index) => ({ ...course, progressPercent: [72, 58, 39][index] })) });
});

app.post('/api/v1/quizzes/:id/attempts', requireAuth, (req, res) => {
  const answers = z.array(z.string()).parse(req.body.answers ?? []);
  const score = Math.min(100, answers.length * 20);
  res.status(201).json({ quizId: req.params.id, score, feedback: score >= 80 ? 'Excellent work.' : 'Review the lesson notes and try again.' });
});

app.post('/api/v1/ai/chat', requireAuth, (req, res) => {
  const body = z.object({ message: z.string().min(1), language: z.enum(['english', 'chinese']) }).parse(req.body);
  res.json({ reply: `Practice prompt received for ${body.language}: ${body.message}`, suggestions: ['Repeat with clearer pronunciation', 'Add one new vocabulary word'] });
});

const port = Number(process.env.PORT ?? 4000);
app.listen(port, () => console.log(`Language Academy API running on :${port}`));
