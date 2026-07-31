import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const sourceDirectory = process.argv[2];

if (!sourceDirectory) {
  throw new Error('Usage: node scripts/prepare-user-assets.mjs <source-directory>');
}

const projectRoot = process.cwd();
const galleryDirectory = path.join(projectRoot, 'public', 'images', 'gallery', 'academy');
const brandDirectory = path.join(projectRoot, 'public', 'images', 'brand');

await Promise.all([
  mkdir(galleryDirectory, { recursive: true }),
  mkdir(brandDirectory, { recursive: true }),
]);

const galleryAssets = [
  ['SPFE6222.JPG.jpeg', 'joy-and-ball.webp'],
  ['SPFE0149.jpg.jpeg', 'welcome-wave.webp'],
  ['SPFE5467 (2).jpeg', 'coach-on-ball.webp'],
  ['SPFE5477 (1).jpeg', 'team-spirit.webp'],
  ['SPFE6007.JPG.jpeg', 'training-detail.webp'],
  ['SPFE6087.JPG.jpeg', 'academy-play.webp'],
  ['SPFE5724 (1).jpeg', 'focused-training.webp'],
  ['SPFE5498 (1).jpeg', 'first-steps.webp'],
  ['SPFE5590.jpeg', 'guided-training.webp'],
  ['SPFE6656.JPG.jpeg', 'ball-control.webp'],
  ['SPFE9822.jpg.jpeg', 'academy-smile.webp'],
  ['SPFE5682.jpeg', 'sideline-control.webp'],
];

for (const [sourceName, outputName] of galleryAssets) {
  await sharp(path.join(sourceDirectory, sourceName))
    .rotate()
    .resize({
      width: 1600,
      height: 1600,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality: 84, effort: 5 })
    .toFile(path.join(galleryDirectory, outputName));
}

const brandAssets = [
  ['1000046338.png', 'academy-logo-light.png'],
  ['1000046340.png', 'academy-logo-dark.png'],
];

for (const [sourceName, outputName] of brandAssets) {
  await sharp(path.join(sourceDirectory, sourceName))
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .resize({ width: 1200, withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toFile(path.join(brandDirectory, outputName));
}

console.log(`Prepared ${galleryAssets.length + brandAssets.length} assets.`);
