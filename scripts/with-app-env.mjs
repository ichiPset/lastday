import { spawn } from 'child_process';

// Ambil argumen setelah kata "vite"
const args = process.argv.slice(3);

console.log('[with-app-env] Menjalankan: npx vite', ...args);

const child = spawn('npx', ['vite', ...args], {
  stdio: 'inherit',
  shell: false
});

child.on('close', (code) => process.exit(code ?? 0));
child.on('error', (err) => {
  console.error('[with-app-env] Error:', err.message);
  process.exit(1);
});