const { useMemo, useState } = React;

const courses = [
  { id: 'eng-beginner', language: 'English', title: 'Beginner English', level: 'A1–A2', learners: '12.4k', progress: 72, accent: 'blue', description: 'Build everyday grammar, pronunciation, listening, and confidence from zero.', modules: ['Introductions', 'Daily routines', 'Essential grammar', 'Real-life conversations'], lessons: 48, videos: 36, pdfs: 18, vocabulary: 620, quizzes: 24 },
  { id: 'eng-intermediate', language: 'English', title: 'Intermediate English', level: 'B1–B2', learners: '8.9k', progress: 44, accent: 'blue', description: 'Improve fluency with stories, discussions, writing, and practical listening.', modules: ['Fluent speaking', 'Phrasal verbs', 'Listening labs', 'Paragraph writing'], lessons: 56, videos: 42, pdfs: 22, vocabulary: 840, quizzes: 30 },
  { id: 'eng-advanced', language: 'English', title: 'Advanced English', level: 'C1–C2', learners: '5.1k', progress: 31, accent: 'blue', description: 'Master nuanced vocabulary, debates, academic texts, and advanced writing.', modules: ['Academic reading', 'Persuasive speaking', 'Advanced grammar', 'Essay mastery'], lessons: 44, videos: 30, pdfs: 20, vocabulary: 980, quizzes: 22 },
  { id: 'business-english', language: 'English', title: 'Business English', level: 'B1–C1', learners: '6.8k', progress: 58, accent: 'purple', description: 'Present, negotiate, email, interview, and lead meetings with professional English.', modules: ['Meetings', 'Presentations', 'Email writing', 'Negotiation'], lessons: 40, videos: 32, pdfs: 16, vocabulary: 520, quizzes: 18 },
  { id: 'ielts', language: 'English', title: 'IELTS Preparation', level: 'Band 5–8+', learners: '9.7k', progress: 63, accent: 'purple', description: 'Target reading, writing, listening, and speaking skills with exam strategy.', modules: ['Writing Task 1', 'Writing Task 2', 'Speaking clinic', 'Mock tests'], lessons: 52, videos: 44, pdfs: 28, vocabulary: 760, quizzes: 34 },
  { id: 'mandarin-beginner', language: 'Chinese', title: 'Beginner Mandarin', level: 'HSK 1–2', learners: '10.2k', progress: 68, accent: 'red', description: 'Learn tones, pinyin, greetings, numbers, and survival Mandarin conversations.', modules: ['Pinyin & tones', 'Greetings', 'Numbers & time', 'Ordering food'], lessons: 50, videos: 38, pdfs: 20, vocabulary: 500, quizzes: 26 },
  { id: 'hsk', language: 'Chinese', title: 'HSK 1–6 Preparation', level: 'HSK 1–6', learners: '11.6k', progress: 39, accent: 'red', description: 'Structured vocabulary, grammar, reading, and mock tests for every HSK level.', modules: ['HSK 1–2 core', 'HSK 3–4 growth', 'HSK 5 reading', 'HSK 6 mastery'], lessons: 96, videos: 72, pdfs: 42, vocabulary: 5000, quizzes: 60 },
  { id: 'conversation', language: 'Chinese', title: 'Chinese Conversation', level: 'A2–B2', learners: '7.4k', progress: 52, accent: 'red', description: 'Practice natural Mandarin dialogues for travel, friends, work, and daily life.', modules: ['Travel talk', 'Opinions', 'Storytelling', 'Fluency drills'], lessons: 42, videos: 35, pdfs: 14, vocabulary: 650, quizzes: 21 },
  { id: 'characters', language: 'Chinese', title: 'Chinese Characters Writing', level: 'All levels', learners: '6.2k', progress: 47, accent: 'gold', description: 'Understand radicals, stroke order, memory systems, and handwriting practice.', modules: ['Radicals', 'Stroke order', 'Character families', 'Writing challenges'], lessons: 45, videos: 28, pdfs: 35, vocabulary: 900, quizzes: 20 },
  { id: 'business-chinese', language: 'Chinese', title: 'Business Chinese', level: 'B1–C1', learners: '4.6k', progress: 25, accent: 'gold', description: 'Use Mandarin for meetings, networking, trade, customer service, and email.', modules: ['Introductions', 'Meetings', 'Contracts', 'Professional messages'], lessons: 38, videos: 30, pdfs: 18, vocabulary: 560, quizzes: 18 },
];

const vocab = [
  { en: 'achievement', zh: '成就', pinyin: 'chéng jiù', tag: 'Academic', fav: true },
  { en: 'pronunciation', zh: '发音', pinyin: 'fā yīn', tag: 'Speaking', fav: false },
  { en: 'schedule', zh: '日程', pinyin: 'rì chéng', tag: 'Business', fav: true },
  { en: 'confidence', zh: '信心', pinyin: 'xìn xīn', tag: 'Mindset', fav: false },
  { en: 'certificate', zh: '证书', pinyin: 'zhèng shū', tag: 'Academy', fav: false },
  { en: 'practice', zh: '练习', pinyin: 'liàn xí', tag: 'Study', fav: true },
];

const testimonials = [
  ['Dara S.', 'The lessons feel like a real academy, but I can study after work. My speaking confidence improved quickly.'],
  ['Mei Lin', 'The HSK path, flashcards, and daily vocabulary challenge keep me consistent every day.'],
  ['Sopheak R.', 'I use the IELTS quizzes and progress dashboard to see exactly what to improve next.'],
];

function App() {
  const [dark, setDark] = useState(false);
  const [lang, setLang] = useState('English');
  const [query, setQuery] = useState('');
  const [favoriteWords, setFavoriteWords] = useState(vocab.filter((word) => word.fav).map((word) => word.en));

  const filteredCourses = useMemo(() => courses.filter((course) => {
    const matchesLang = lang === 'All' || course.language === lang;
    const text = `${course.title} ${course.description} ${course.modules.join(' ')}`.toLowerCase();
    return matchesLang && text.includes(query.toLowerCase());
  }), [lang, query]);

  const filteredWords = useMemo(() => vocab.filter((word) => `${word.en} ${word.zh} ${word.pinyin} ${word.tag}`.toLowerCase().includes(query.toLowerCase())), [query]);

  const toggleFavorite = (word) => {
    setFavoriteWords((current) => current.includes(word) ? current.filter((item) => item !== word) : [...current, word]);
  };

  return (
    <div className={dark ? 'app dark' : 'app'}>
      <nav className="nav">
        <a className="brand" href="#home"><span>文</span> Language Academy</a>
        <div className="nav-links">
          {['Home', 'Courses', 'Lesson', 'Vocabulary', 'Quiz', 'Dashboard', 'Community', 'Contact'].map((item) => <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}
        </div>
        <div className="nav-actions">
          <select aria-label="Interface language"><option>English</option><option>中文</option><option>ខ្មែរ</option></select>
          <button className="ghost" onClick={() => setDark(!dark)}>{dark ? '☀️ Light' : '🌙 Dark'}</button>
          <button className="primary small">Login</button>
        </div>
      </nav>

      <header id="home" className="hero section">
        <div className="hero-copy">
          <p className="eyebrow">Self-paced • School structured • AI supported</p>
          <h1>Master English & Chinese at Your Own Pace</h1>
          <p className="lead">Follow academy-style learning paths with video lessons, PDF notes, vocabulary lists, quizzes, certificates, speech recognition, and a friendly AI conversation coach.</p>
          <div className="hero-actions"><a className="primary" href="#courses">Start Learning</a><a className="secondary" href="#courses">View Courses</a></div>
          <div className="stats"><strong>25k+</strong><span>students</span><strong>10</strong><span>career-ready courses</span><strong>3</strong><span>interface languages</span></div>
        </div>
        <div className="hero-panel glass">
          <div className="video-card"><span>▶</span><p>Live lesson preview</p><strong>Mandarin tones + English fluency drills</strong></div>
          <div className="streak-card"><b>🔥 18 day streak</b><span>Daily vocabulary challenge completed</span></div>
          <div className="ai-card"><b>AI Practice Chatbot</b><span>“Tell me about your weekend in Mandarin.”</span></div>
        </div>
      </header>

      <main>
        <section className="section features">
          <div className="section-head"><p className="eyebrow">Everything in one academy</p><h2>Built for interactive self-study</h2></div>
          <div className="feature-grid">
            {['Interactive Lessons', 'Vocabulary Builder', 'Speaking Practice', 'Progress Tracking', 'Certificates', 'Daily Challenges'].map((feature, index) => <article className="feature" key={feature}><span>{['🎬','🧠','🎙️','📈','🏅','⚡'][index]}</span><h3>{feature}</h3><p>Clear activities, instant feedback, and motivating milestones for every learner.</p></article>)}
          </div>
        </section>

        <section id="courses" className="section split-section">
          <div className="section-head"><p className="eyebrow">Curriculum</p><h2>English and Chinese courses</h2><p>Every course includes modules, lessons, videos, PDF notes, vocabulary lists, quizzes, enrollment, and certificate eligibility.</p></div>
          <div className="toolbar"><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search courses, words, modules..." aria-label="Search" /><div className="tabs">{['All','English','Chinese'].map((item) => <button className={lang === item ? 'active' : ''} onClick={() => setLang(item)} key={item}>{item}</button>)}</div></div>
          <div className="course-grid">{filteredCourses.map((course) => <CourseCard course={course} key={course.id} />)}</div>
        </section>

        <section id="lesson" className="section lesson-layout">
          <div className="lesson-video"><div className="player">▶<span>Lesson video player</span></div><div className="lesson-nav"><button>← Previous lesson</button><button>Next lesson →</button></div></div>
          <div className="lesson-notes"><p className="eyebrow">Sample lesson</p><h2>Introducing yourself in English and Mandarin</h2><p>Learn model sentences, audio pronunciation, downloadable notes, and guided practice exercises.</p><ul><li>Audio: “My name is…” / “我叫…”</li><li>PDF: sentence pattern notes and stroke practice</li><li>Exercise: record your answer and compare pronunciation</li></ul><button className="secondary">Download materials</button></div>
        </section>

        <section id="vocabulary" className="section">
          <div className="section-head"><p className="eyebrow">Flashcards</p><h2>English ↔ Chinese vocabulary builder</h2></div>
          <div className="vocab-grid">{filteredWords.map((word) => <article className="flashcard" key={word.en}><button onClick={() => toggleFavorite(word.en)}>{favoriteWords.includes(word.en) ? '★' : '☆'}</button><span>{word.tag}</span><h3>{word.en}</h3><h2>{word.zh}</h2><p>{word.pinyin}</p><small>🔊 pronunciation audio</small></article>)}</div>
        </section>

        <section id="quiz" className="section quiz-dashboard">
          <div className="quiz-card"><p className="eyebrow">Instant scoring quiz</p><h2>Choose the correct translation</h2><p>“practice” means:</p><div className="answers"><button>学习</button><button className="correct">练习 ✓</button><button>考试</button></div><div className="score"><span>Score: 8/10</span><progress value="80" max="100"></progress><strong>Great progress — review tones tomorrow.</strong></div></div>
          <div id="dashboard" className="dashboard-card"><p className="eyebrow">Student dashboard</p><h2>Srey Neang</h2><div className="profile-grid"><span>🔥 18 day streak</span><span>✅ 126 lessons</span><span>🏆 14 badges</span><span>🎯 87% avg quiz</span></div><div className="progress-list">{courses.slice(0,4).map((course) => <label key={course.id}>{course.title}<progress value={course.progress} max="100"></progress><small>{course.progress}% complete</small></label>)}</div></div>
        </section>

        <section id="community" className="section community">
          <div><p className="eyebrow">Community</p><h2>Ask questions, share tips, and climb the leaderboard</h2><div className="forum"><p><b>Teacher Lina:</b> Post your Mandarin tone recording for feedback.</p><p><b>Student Vannak:</b> My IELTS speaking tip: answer, explain, example.</p></div></div>
          <ol className="leaderboard"><li>Mei Lin — 9,840 pts</li><li>Dara — 8,610 pts</li><li>Sopheak — 7,920 pts</li></ol>
        </section>

        <section className="section testimonials"><div className="section-head"><p className="eyebrow">Student stories</p><h2>Learners love the structure</h2></div>{testimonials.map(([name, text]) => <blockquote key={name}>“{text}”<cite>{name}</cite></blockquote>)}</section>

        <section id="contact" className="section contact">
          <form><p className="eyebrow">Contact</p><h2>Need help choosing a path?</h2><input placeholder="Your name" /><input placeholder="Email address" /><textarea placeholder="Tell us your learning goal"></textarea><button className="primary">Send message</button></form>
          <div className="faq"><h3>FAQ & support</h3><details open><summary>Can I get a certificate?</summary><p>Yes. Complete all required lessons and pass the final quiz to generate a certificate.</p></details><details><summary>Which roles are supported?</summary><p>Student, Teacher, and Admin access are planned for JWT-secured accounts.</p></details><p>Email: support@languageacademy.example</p><p>Social: Facebook • YouTube • Telegram • WeChat</p></div>
        </section>
      </main>

      <footer>Language Academy REST API ready • PostgreSQL schema planned • Cloud storage for videos, PDFs, audio, and certificates.</footer>
    </div>
  );
}

function CourseCard({ course }) {
  return <article className={`course-card ${course.accent}`}><div className="course-top"><span>{course.language}</span><b>{course.level}</b></div><h3>{course.title}</h3><p>{course.description}</p><div className="module-list">{course.modules.map((module) => <small key={module}>{module}</small>)}</div><div className="course-meta"><span>🎬 {course.videos} videos</span><span>📄 {course.pdfs} PDFs</span><span>🧾 {course.quizzes} quizzes</span><span>🔤 {course.vocabulary} words</span></div><progress value={course.progress} max="100"></progress><button className="primary full">Enroll now</button></article>;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
