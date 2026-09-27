# HARI TERAKHIR — VS Code Package

Aplikasi web immersive **Hari Terakhir** yang berasal dari workspace yang diberikan, sudah dipisahkan dari artefak workspace/deployment sehingga lebih mudah dijalankan secara lokal.

## Persyaratan

- Node.js **22.x LTS** direkomendasikan
- npm 10+
- Visual Studio Code

## Menjalankan di VS Code

1. Extract ZIP ini.
2. Buka folder `hari-terakhir` di VS Code.
3. Buka Terminal → New Terminal.
4. Jalankan:

```bash
npm install
npm run dev
```

5. Buka:

```text
http://localhost:8080
```

### Windows

Bisa juga menggunakan:

```bash
npm install
npm start
```

### VS Code

Tekan `Ctrl+Shift+P` → **Tasks: Run Task** → pilih **Hari Terakhir: Dev server**.

## Build production

```bash
npm run build
```

Preview hasil build:

```bash
npm run preview
```

Preview berjalan di:

```text
http://127.0.0.1:8081
```

## Struktur utama

- `src/` — source React/TanStack
- `public/last-day/` — gambar dan video utama
- `public/` — aset publik
- `server/` — server-side integration
- `migrations/` — database migrations bila dibutuhkan
- `.vscode/` — task dan konfigurasi launch
- `package.json` — scripts dan dependencies

## Catatan

Versi ini tidak menyertakan `.grok/`, `.vercel/`, dan screenshot QA hasil generator karena bukan bagian yang diperlukan untuk pengembangan lokal.

Aplikasi tetap mempertahankan source dan aset utama dari workspace asli.
