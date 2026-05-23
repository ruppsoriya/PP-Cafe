# Laravel-style backend structure

This folder uses Laravel-like directories (`routes/`, `app/Http/Controllers/`, `public/`) and provides API endpoints via `public/api.php`.

## Run backend locally

```bash
php -S localhost:8000 -t backend/public
```

Endpoints:
- `/api.php?endpoint=meta`
- `/api.php?endpoint=cafes&q=&area=all&vibe=all`
