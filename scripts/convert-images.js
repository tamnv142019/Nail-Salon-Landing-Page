const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(__dirname, '..', 'public');
// Process the whole `public` directory so gallery images are also converted
const assetsDir = publicDir;

const inputExtensions = ['.jpg', '.jpeg', '.png'];
const sizes = [400, 800, 1200];

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (entry.isFile()) {
      files.push(full);
    }
  }
  return files;
}

async function convert(file) {
  const ext = path.extname(file).toLowerCase();
  if (!inputExtensions.includes(ext)) return;

  const dir = path.dirname(file);
  const base = path.basename(file, ext);

  try {
    const image = sharp(file);

    // For each target size, write a resized original-format, webp and avif
    await Promise.all(
      sizes.map(async (w) => {
        const outOriginal = path.join(dir, `${base}-${w}${ext}`);
        const outWebP = path.join(dir, `${base}-${w}.webp`);
        const outAvif = path.join(dir, `${base}-${w}.avif`);

        // Resize and output original format (jpeg/png)
        const resizeStream = image.clone().resize({ width: w }).withMetadata();
        if (ext === '.png') {
          await resizeStream.png({ quality: 80 }).toFile(outOriginal);
        } else {
          await resizeStream.jpeg({ quality: 85 }).toFile(outOriginal);
        }

        // WebP
        await image.clone().resize({ width: w }).webp({ quality: 75 }).toFile(outWebP);

        // AVIF
        await image.clone().resize({ width: w }).avif({ quality: 60 }).toFile(outAvif);
      })
    );

    console.log('Converted:', path.relative(publicDir, file));
  } catch (err) {
    console.error('Failed to convert', file, err);
  }
}

async function main() {
  try {
    const allFiles = await walk(assetsDir);
    const promises = allFiles.map(convert);
    await Promise.all(promises);
    console.log('Image conversion complete.');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();
