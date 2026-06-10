const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('./src/app');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('const locale = useLocale();') && !content.includes('const isAr')) {
    content = content.replace(/const locale = useLocale\(\);/g, 'const locale = useLocale();\n  const isAr = locale === "ar";');
    fs.writeFileSync(file, content);
    console.log('Restored in', file);
  }
  
  if (content.includes('const resolvedParams = await params;') && !content.includes('const isAr')) {
    content = content.replace(/const resolvedParams = await params;/g, 'const resolvedParams = await params;\n  const isAr = resolvedParams.locale === "ar";');
    fs.writeFileSync(file, content);
    console.log('Restored (params) in', file);
  }
});
