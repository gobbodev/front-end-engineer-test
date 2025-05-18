#!/usr/bin/env node

import { readdirSync, statSync } from 'fs';
import { join } from 'path';

// Diretório inicial: argumento ou diretório atual
const startDir = process.argv[2] || process.cwd();

const excludedDirs = new Set(['node_modules', '.next', '.git']);

function printTree(dir, prefix = '') {
  const items = readdirSync(dir).filter(name => {
    const fullPath = join(dir, name);
    if (name.startsWith('.')) return false; // ignora ocultos
    if (excludedDirs.has(name)) return false; // ignora pastas específicas
    try {
      return statSync(fullPath).isDirectory();
    } catch {
      return false;
    }
  });

  items.forEach((name, idx) => {
    const fullPath = join(dir, name);
    const isLast = idx === items.length - 1;
    const branch = isLast ? '└─ ' : '├─ ';
    const nextPrefix = prefix + (isLast ? '   ' : '│  ');

    console.log(`${prefix}${branch}/${name}`);
    printTree(fullPath, nextPrefix);
  });
}

console.log(startDir);
printTree(startDir);
