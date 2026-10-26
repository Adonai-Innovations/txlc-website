/**
 * Image optimisation pass for public/ (ADO-427).
 *
 * The site shipped several single images of 6–13 MB — public/landing/immersive.png
 * alone was 8.9 MB for a banner that renders at most ~1600 px wide. This script
 * re-encodes every referenced raster over a size threshold as WebP, capped at a
 * sensible pixel width, and reports what it changed.
 *
 * Run with:  npm run optimize:images
 *
 * It is deliberately a committed script rather than a one-off: new photography
 * lands in public/ regularly and will need the same treatment.
 */
import { execFileSync } from "node:child_process";
import { readdirSync, statSync } from "node:fs";
import path from "node:path";

const PUBLIC_DIR = "public";
const MIN_BYTES = 900 * 1024; // only touch images that are actually a problem
const MAX_WIDTH = 1920;
const TARGET_KB = 300;

/**
 * Left as-is on purpose. alt-logo.png is the favicon and apple-touch-icon, and
 * `rel="icon"` support for WebP is still patchy outside evergreen browsers, so
 * the logo stays a PNG. logo.png has no references at all.
 */
const SKIP = new Set(["public/alt-logo.png", "public/logo.png"]);

/** Recursively collect raster images under public/. */
function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    if (!/\.(png|jpe?g)$/i.test(entry.name)) return [];
    return [full];
  });
}

const candidates = walk(PUBLIC_DIR)
  .filter((f) => statSync(f).size >= MIN_BYTES)
  .filter((f) => !SKIP.has(f.split(path.sep).join("/")));

if (candidates.length === 0) {
  console.log("No images above the threshold — nothing to do.");
  process.exit(0);
}

const script = `
import sys, os
from PIL import Image

max_width = ${MAX_WIDTH}
target = ${TARGET_KB} * 1024

for src in sys.argv[1:]:
    dest = os.path.splitext(src)[0] + ".webp"
    before = os.path.getsize(src)
    with Image.open(src) as im:
        has_alpha = im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info)
        im = im.convert("RGBA" if has_alpha else "RGB")
        if im.width > max_width:
            ratio = max_width / im.width
            im = im.resize((max_width, max(1, round(im.height * ratio))), Image.LANCZOS)
        quality = 82
        while True:
            im.save(dest, "WEBP", quality=quality, method=6, exact=False)
            if os.path.getsize(dest) <= target or quality <= 50:
                break
            quality -= 6
    after = os.path.getsize(dest)
    print(f"{src}\\t{before}\\t{dest}\\t{after}")
`;

const out = execFileSync("python3", ["-c", script, ...candidates], {
  encoding: "utf8",
  maxBuffer: 64 * 1024 * 1024,
});

let saved = 0;
const rows = out.trim().split("\n").filter(Boolean);
for (const row of rows) {
  const [src, before, dest, after] = row.split("\t");
  saved += Number(before) - Number(after);
  const kb = (n) => `${(Number(n) / 1024).toFixed(0)} KB`;
  console.log(`${src} ${kb(before)}  ->  ${dest} ${kb(after)}`);
}
console.log(
  `\n${rows.length} images re-encoded; ${(saved / 1024 / 1024).toFixed(1)} MB saved.`
);
console.log("Remember to update the src paths in src/ to the .webp files.");
