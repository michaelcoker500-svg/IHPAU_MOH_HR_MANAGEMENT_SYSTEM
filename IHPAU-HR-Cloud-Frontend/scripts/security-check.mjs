import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('../src/', import.meta.url);
const forbidden = [
  /dangerouslySetInnerHTML/,
  /\beval\s*\(/,
  /new\s+Function\s*\(/,
  /document\.write\s*\(/,
  /localStorage\.setItem\(['"](?:token|access_token|refresh_token|password)/i,
  /VITE_[A-Z0-9_]*(?:KEY|SECRET|PASSWORD|TOKEN)/i,
];

async function walk(url) {
  const entries = await readdir(url, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = new URL(entry.name + (entry.isDirectory() ? '/' : ''), url);
    if (entry.isDirectory()) files.push(...await walk(path));
    else if (/\.(tsx?|jsx?)$/.test(entry.name)) files.push(path);
  }
  return files;
}

const files = await walk(root);
let failed = false;
for (const file of files) {
  const text = await readFile(file, 'utf8');
  for (const rule of forbidden) {
    if (rule.test(text)) {
      failed = true;
      console.error(`Potential security issue: ${file.pathname} matches ${rule}`);
    }
  }
}
if (failed) process.exit(1);
console.log(`Security pattern check passed: ${files.length} source files inspected.`);
