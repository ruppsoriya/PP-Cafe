#!/usr/bin/env bash
set -euo pipefail

php -l backend/public/api.php
php -l backend/routes/api.php

php -S 127.0.0.1:8000 -t . >/tmp/pp-cafe-php.log 2>&1 &
SERVER_PID=$!
trap 'kill $SERVER_PID >/dev/null 2>&1 || true' EXIT

sleep 1

curl -fsS "http://127.0.0.1:8000/backend/public/api.php?endpoint=meta" >/tmp/meta.json
curl -fsS "http://127.0.0.1:8000/backend/public/api.php?endpoint=cafes&q=coffee&area=all&vibe=all" >/tmp/cafes.json

php -r '$m=json_decode(file_get_contents("/tmp/meta.json"), true); if(!isset($m["areas"],$m["vibes"])) exit(1);'
php -r '$c=json_decode(file_get_contents("/tmp/cafes.json"), true); if(!isset($c["count"],$c["cafes"])) exit(1);'

echo "All checks passed"
