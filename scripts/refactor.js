const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            walkDir(dirPath, callback);
        } else if (dirPath.endsWith('.tsx') || dirPath.endsWith('.ts')) {
            callback(dirPath);
        }
    });
}

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Replace framer-motion imports with our local lightweight proxy
    // Be careful with quotes and spaces
    content = content.replace(/from\s+['"]framer-motion['"]/g, 'from "@/lib/motion"');
    
    // Check for bad durations and replace them with semantic tokens
    content = content.replace(/duration-500/g, 'duration-[var(--duration-base)]');
    content = content.replace(/duration-700/g, 'duration-[var(--duration-base)]');
    content = content.replace(/duration-\[1\.5s\]/g, 'duration-[var(--duration-slow)]');
    content = content.replace(/duration-\[2s\]/g, 'duration-[var(--duration-slow)]');
    
    // Check for will-change
    content = content.replace(/will-change-transform/g, '');
    
    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
    }
}

walkDir(path.join(__dirname, '../src'), processFile);

// Also remove from package.json
const pkgPath = path.join(__dirname, '../package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
if (pkg.dependencies && pkg.dependencies['framer-motion']) {
    delete pkg.dependencies['framer-motion'];
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), 'utf8');
    console.log('Removed framer-motion from package.json');
}
