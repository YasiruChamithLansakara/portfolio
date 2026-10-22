// One-off script: trims the background-removed photo to the subject's bounding box, frames it
// into the hero's portrait canvas (transparent WebP + a dark-flattened JPEG fallback).
import sharp from 'sharp'

const SRC = 'photo/profile-nobg.png'
const CANVAS_W = 760
const CANVAS_H = 950
const FALLBACK_BG = '#0d1220' // matches --color-canvas-raised (dark theme)

const trimmed = await sharp(SRC).trim({ threshold: 10 }).toBuffer({ resolveWithObject: true })
const { data, info } = trimmed

// Fit the trimmed subject into the canvas width, anchored to the bottom so it reads as
// a figure standing in the frame rather than floating in empty space.
const scale = Math.min(CANVAS_W / info.width, CANVAS_H / info.height)
const resizedW = Math.round(info.width * scale)
const resizedH = Math.round(info.height * scale)

const resizedSubject = await sharp(data).resize(resizedW, resizedH).toBuffer()

const left = Math.round((CANVAS_W - resizedW) / 2)
const top = CANVAS_H - resizedH

await sharp({
  create: { width: CANVAS_W, height: CANVAS_H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
})
  .composite([{ input: resizedSubject, left, top }])
  .webp({ quality: 90 })
  .toFile('public/images/profile.webp')

await sharp({
  create: { width: CANVAS_W, height: CANVAS_H, channels: 4, background: FALLBACK_BG },
})
  .composite([{ input: resizedSubject, left, top }])
  .flatten({ background: FALLBACK_BG })
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile('public/images/profile.jpg')

console.log('Done. Subject placed at', { left, top, resizedW, resizedH })
