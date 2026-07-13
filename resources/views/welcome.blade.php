<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>PT Sucoot Scaform Indonesia</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'IBM Plex Sans', sans-serif; background: #F4F4F5; margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
        .card { background: #fff; border: 1px solid #E4E4E7; border-radius: 6px; padding: 40px; max-width: 500px; width: 100%; }
        h1 { font-size: 18px; color: #09090B; margin: 0 0 8px; }
        p { font-size: 13px; color: #52525B; line-height: 1.6; margin: 0 0 16px; }
        code { background: #F4F4F5; border: 1px solid #E4E4E7; border-radius: 4px; padding: 2px 6px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; }
        .step { background: #FAFAFA; border: 1px solid #E4E4E7; border-radius: 4px; padding: 12px 16px; margin: 8px 0; font-size: 13px; font-family: 'IBM Plex Mono', monospace; }
        .badge { display: inline-block; background: #EAB308; color: #09090B; font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 4px; margin-bottom: 16px; }
    </style>
</head>
<body>
    <div class="card">
        <div class="badge">Setup Required</div>
        <h1>🏗️ Sistem Scaffolding — PT Sucoot Scaform</h1>
        <p>Laravel backend sudah berjalan. Frontend React belum di-build ke <code>public/app/</code>.</p>
        <p><strong>Langkah setup:</strong></p>
        <div class="step">1. cd frontend && yarn install</div>
        <div class="step">2. BUILD_PATH=../public/app yarn build</div>
        <div class="step">3. Buka kembali halaman ini</div>
        <p style="margin-top: 16px; font-size: 11px; color: #A1A1AA;">API tersedia di <code>/api/*</code> — Dokumentasi: <code>php artisan route:list</code></p>
    </div>
</body>
</html>
