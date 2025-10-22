const path = require('path');
const fs = require('fs');
// glob will be imported using modern API later

let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.error('The "sharp" module is not installed. Install it with "npm install --save-dev sharp" to enable image optimization. Exiting.');
  process.exit(0);
}

const inputDir = path.normalize(path.join(__dirname, '..', 'assets'));
const outputDir = path.join(inputDir, 'optimized');

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

const sizes = [480, 800, 1200];

async function processFile(file) {
  const ext = path.extname(file).toLowerCase();
  const base = path.basename(file, ext);
  const img = sharp(file);
  const metadata = await img.metadata();

  // create webp (main)
  const webpPath = path.join(outputDir, `${base}.webp`);
  await img.webp({ quality: 80 }).toFile(webpPath);

  // create sizes where original is larger than target
  await Promise.all(sizes.map(async (w) => {
    if (metadata.width && metadata.width <= w) return; // skip if original is smaller
    const outPath = path.join(outputDir, `${base}-${w}.webp`);
    await img.resize({ width: w }).webp({ quality: 80 }).toFile(outPath);
  }));

  // also copy original file into optimized folder with suffix -orig
  const fallbackPath = path.join(outputDir, `${base}-orig${ext}`);
  await img.toFile(fallbackPath);

  console.log('Processed', file);
}

const { glob } = require('glob');

async function main() {
  try {
    const pattern = path.join(inputDir, '*.+(png|jpg|jpeg)');
    const files = await glob(pattern, { nocase: true, nodir: true });
    if (!files || files.length === 0) {
      console.log('No image files found in', inputDir);
      return;
    }
    for (const f of files) {
      try {
        await processFile(f);
      } catch (e) {
        console.error('Error processing', f, e.message);
      }
    }
    console.log('Done optimizing images. Output ->', outputDir);
  } catch (err) {
    console.error('Error while searching for images:', err.message || err);
  }
}

main();
