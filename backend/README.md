# Language Academy API notes

This repository includes a lightweight PHP demo endpoint in `public/api.php` for static hosting previews and a production-oriented Node.js + Express TypeScript scaffold in `../backend-node`.

## Static preview

```bash
php -S localhost:8000 -t .
```

Open `http://localhost:8000/index.html` to view the React UI.

## Production backend plan

Use the Express API scaffold in `backend-node` with PostgreSQL tables from `database/schema.sql`.

Key API domains:
- JWT authentication and role-based access for Student, Teacher, and Admin users.
- Course enrollment and structured modules, lessons, videos, PDF notes, vocabulary lists, and quizzes.
- Automatic lesson progress saving, dashboard analytics, learning streaks, badges, and certificates.
- Vocabulary search, favorite words, daily challenges, AI chat practice, and speech pronunciation feedback.
