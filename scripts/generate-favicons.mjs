// One-off script: rasterizes public/favicon.svg into the PNG fallback sizes referenced
// in index.html. Run with: node scripts/generate-favicons.mjs (after editing favicon.svg).
import sharp from 'sharp'

const SRC = 'public/favicon.svg'

await sharp(SRC).resize(32, 32).png().toFile('public/favicon-32.png')
await sharp(SRC).resize(180, 180).png().toFile('public/apple-touch-icon.png')

console.log('Favicon PNGs regenerated.')
