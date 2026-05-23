# PP Café Finder

A lightweight React frontend with a Laravel-style PHP backend for café recommendations in Phnom Penh.

## Run locally

```bash
php -S 127.0.0.1:8000 -t .
```

Open `http://127.0.0.1:8000/`.

## Check locally

```bash
./check.sh
```

This checks:
- PHP syntax for API files
- `meta` endpoint response shape
- `cafes` endpoint response shape

## Deploy

### Option 1: Docker (recommended)

Build and run:

```bash
docker build -t pp-cafe .
docker run -p 8080:80 pp-cafe
```

Then open `http://localhost:8080/`.

### Option 2: Traditional PHP hosting

Upload this repository so web root points to project root. Ensure these paths are publicly accessible:
- `/index.html`
- `/styles.css`
- `/react-app.js`
- `/backend/public/api.php`

No database is required.
