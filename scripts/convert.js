const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(__dirname, '../public');

async function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            await processDirectory(fullPath);
        } else {
            const ext = path.extname(file).toLowerCase();
            if (['.jpg', '.jpeg', '.png'].includes(ext)) {
                // If it's a hero image, we make an AVIF
                if (file.includes('hero') || file.includes('banner')) {
                    const avifPath = fullPath.replace(ext, '.avif');
                    if (!fs.existsSync(avifPath)) {
                        console.log(`Converting ${file} to AVIF...`);
                        await sharp(fullPath)
                            .avif({ quality: 80 })
                            .toFile(avifPath);
                    }
                }
                
                // Convert everything else to WebP
                const webpPath = fullPath.replace(ext, '.webp');
                if (!fs.existsSync(webpPath)) {
                    console.log(`Converting ${file} to WebP...`);
                    // Different quality based on folder/name
                    let quality = 80;
                    if (fullPath.includes('gallery') || fullPath.includes('packages')) quality = 75;
                    
                    await sharp(fullPath)
                        .webp({ quality })
                        .toFile(webpPath);
                }
            }
        }
    }
}

async function run() {
    console.log('Starting image conversion...');
    try {
        await processDirectory(publicDir);
        console.log('Image conversion complete!');
    } catch (err) {
        console.error('Error during conversion:', err);
    }
}

run();
