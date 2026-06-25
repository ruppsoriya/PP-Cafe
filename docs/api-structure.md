# Language Academy REST API Structure

Base URL: `/api/v1`

## Authentication and roles
- `POST /auth/register` creates a student account.
- `POST /auth/login` returns a JWT access token.
- `GET /auth/me` returns the current profile.
- JWT middleware protects learner data.
- Role middleware supports `student`, `teacher`, and `admin` authorization.

## Courses and enrollment
- `GET /courses?language=english|chinese&level=&q=` lists published courses.
- `GET /courses/:slug` returns course modules, lessons, assets, vocabulary, and quiz counts.
- `POST /courses/:id/enroll` enrolls the authenticated student.
- `GET /me/enrollments` returns course progress percentages.

## Lessons and progress
- `GET /lessons/:id` returns video URL, notes, audio, PDF assets, exercises, and previous/next lesson IDs.
- `PATCH /lessons/:id/progress` saves completion and video position automatically.
- `GET /me/dashboard` returns profile, learning streak, completed lessons, quiz scores, progress, badges, points, and rewards.

## Vocabulary
- `GET /vocabulary?q=&tag=&languagePair=en-zh` searches English ↔ Chinese words.
- `POST /vocabulary/:id/favorite` toggles a favorite word.
- `GET /daily-challenge` returns the daily vocabulary challenge.

## Quizzes and certificates
- `GET /quizzes/:id` returns multiple-choice, fill-in-the-blank, and listening questions.
- `POST /quizzes/:id/attempts` scores answers instantly and stores feedback.
- `POST /courses/:id/certificate` generates a certificate after completion.

## Community and AI practice
- `GET /forum/posts`, `POST /forum/posts`, and `POST /forum/posts/:id/replies` power the discussion forum.
- `GET /leaderboard` returns ranked students by points.
- `POST /ai/chat` sends English or Mandarin conversation prompts to an AI chatbot.
- `POST /speech/pronunciation` accepts recorded audio and returns pronunciation feedback.

## Storage
Videos, PDFs, audio files, avatars, and generated certificates are stored in cloud object storage. Database records keep signed or public URLs in `lesson_assets`, `vocabulary_words`, `users`, and `certificates`.
