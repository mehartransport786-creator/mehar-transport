/**
 * Adds `export const dynamic = 'force-dynamic';` to every API route
 * that doesn't already have it. Runs with plain Node (no deps).
 */
const fs = require('fs');
const path = require('path');

const apiDir = path.join(__dirname, '..', 'src', 'app', 'api');

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.name === 'route.ts' || entry.name === 'route.js') {
      const content = fs.readFileSync(full, 'utf8');
      if (!content.includes('force-dynamic')) {
        // Find the end of the import block and insert after it
        const lines = content.split('\n');
        let lastImportLine = -1;
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].match(/^import\s/)) {
            lastImportLine = i;
          }
        }
        if (lastImportLine >= 0) {
          lines.splice(lastImportLine + 1, 0, '', "export const dynamic = 'force-dynamic';");
        } else {
          lines.unshift("export const dynamic = 'force-dynamic';", '');
        }
        fs.writeFileSync(full, lines.join('\n'), 'utf8');
        console.log('Patched:', path.relative(apiDir, full));
      } else {
        console.log('Skip (already has it):', path.relative(apiDir, full));
      }
    }
  }
}

walk(apiDir);
console.log('\nDone.');
