// One-off script: renders the first page of each certificate PDF in certificates/ to a WebP image
// in public/images/certifications/. Run with: node scripts/convert-certs.mjs
import { pdf } from 'pdf-to-img'
import sharp from 'sharp'
import { mkdirSync, rmSync } from 'node:fs'
import path from 'node:path'

const SRC_DIR = 'certificates'
const OUT_DIR = 'public/images/certifications'

// Explicit mapping avoids filename-slug collisions (two source PDFs both start with "L M Y C Lansakara").
const FILES = {
  'Critical Thinking in the AI Era.pdf': 'critical-thinking-ai-era',
  'L M Y C LANSAKARA.pdf': 'mastering-azure',
  'L. M. Y. C. Lansakara.pdf': 'cloud-102-aws',
  'Learn the Latest Tech Skills; Advance Your Career _ Udacity_1.pdf': 'aws-ai-practitioner-challenge',
  'Learn the Latest Tech Skills; Advance Your Career _ Udacity_2.pdf': 'future-aws-ai-programmer',
  'Python_for_Beginners_E-Certificate.pdf': 'python-for-beginners',
  'Web_Design_for_Beginners_E-Certificate.pdf': 'web-design-for-beginners',
}

rmSync(OUT_DIR, { recursive: true, force: true })
mkdirSync(OUT_DIR, { recursive: true })

for (const [file, outName] of Object.entries(FILES)) {
  const srcPath = path.join(SRC_DIR, file)
  const doc = await pdf(srcPath, { scale: 2.5 })
  let page1
  for await (const image of doc) {
    page1 = image
    break
  }
  const outPath = path.join(OUT_DIR, `${outName}.webp`)
  await sharp(page1).resize(1000, null, { withoutEnlargement: true }).webp({ quality: 85 }).toFile(outPath)
  console.log(`${file} -> ${outPath}`)
}

console.log('Done.')
