const fs = require('fs');
const path = require('path');

const sectionsDir = path.join(__dirname, '../src/components/sections');
const publicDir = path.join(__dirname, '../public');

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

const imagesFound = new Map();

function scanDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            scanDirectory(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            // Look for <img src="..."> or Image src="..."
            const regex = /src=["'](\/[^"']+)["']/g;
            let match;
            while ((match = regex.exec(content)) !== null) {
                const imagePath = match[1];
                if (!imagesFound.has(imagePath)) {
                    imagesFound.set(imagePath, new Set());
                }
                imagesFound.get(imagePath).add(file);
            }
        }
    }
}

scanDirectory(sectionsDir);

console.log("HOMEPAGE IMAGE AUDIT\n=====================");
let totalSize = 0;
const results = [];

for (const [imagePath, components] of imagesFound.entries()) {
    const fullImagePath = path.join(publicDir, imagePath);
    let size = 0;
    let exists = false;
    let format = path.extname(imagePath).substring(1).toUpperCase();
    
    if (fs.existsSync(fullImagePath)) {
        size = fs.statSync(fullImagePath).size;
        totalSize += size;
        exists = true;
    }
    
    results.push({
        image: imagePath,
        format: format,
        size: exists ? formatBytes(size) : 'Not Found',
        rawSize: size,
        usedIn: Array.from(components).join(', ')
    });
}

// Sort by size descending
results.sort((a, b) => b.rawSize - a.rawSize);

results.forEach(r => {
    console.log(`- ${r.image} | Format: ${r.format} | Size: ${r.size} | Used In: ${r.usedIn}`);
});

console.log("\nTOTAL HOMEPAGE IMAGE PAYLOAD:", formatBytes(totalSize));
