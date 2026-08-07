// scripts/load-env.mjs
// Loader .env sederhana (tanpa perlu install package "dotenv").
// Membaca .env.local / .env / .env.development.local dari root project
// lalu memasukkan isinya ke process.env (kalau belum ada nilainya).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const candidateFiles = [
  '.env.local',
  '.env',
  '.env.development.local',
];

function parseEnvFile(content) {
  const result = {};
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const eqIndex = line.indexOf('=');
    if (eqIndex === -1) continue;
    const key = line.slice(0, eqIndex).trim();
    let value = line.slice(eqIndex + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    result[key] = value;
  }
  return result;
}

export function loadEnv() {
  for (const file of candidateFiles) {
    const fullPath = path.join(rootDir, file);
    if (fs.existsSync(fullPath)) {
      const parsed = parseEnvFile(fs.readFileSync(fullPath, 'utf-8'));
      for (const [key, value] of Object.entries(parsed)) {
        if (process.env[key] === undefined) {
          process.env[key] = value;
        }
      }
      console.log(`[env] Loaded environment variables from ${file}`);
    }
  }
}
