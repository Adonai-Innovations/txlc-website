/**
 * Static checks for the things ADO-427 had to fix by hand (run: npm run check).
 *
 * All three failures this guards against shipped to production and stayed there
 * for months, because nothing in the build fails when a src path 404s, a page
 * forgets its canonical, or a ROLLER product id goes stale. None of these need
 * a browser, so they are cheap to run on every change.
 */
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import path from "node:path";

const errors = [];
const warnings = [];

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name);
    return e.isDirectory() ? walk(full) : [full];
  });

const srcFiles = walk("src").filter((f) => /\.(jsx?|html)$/.test(f));
const scanned = [...srcFiles, "index.html", "public/sitemap.xml"].filter(existsSync);

/* 1. Every referenced asset under public/ must exist. ------------------- */
const ASSET_RE =
  /["'(](\/[^"'()\s]+\.(?:png|jpe?g|webp|svg|mp4|ico|JPG|JPEG|PNG))["')]/g;
const ABS_RE =
  /https:\/\/txlasercombat\.com(\/[^"'\s<]+\.(?:png|jpe?g|webp|svg))/g;

for (const file of scanned) {
  const content = readFileSync(file, "utf8");
  for (const re of [ASSET_RE, ABS_RE]) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(content))) {
      const target = path.join("public", m[1]);
      if (!existsSync(target)) {
        errors.push(`Missing asset ${m[1]} referenced by ${file}`);
      }
    }
  }
}

/* 2. Every routed page needs its own description + canonical. ----------- */
const appSource = readFileSync("src/App.jsx", "utf8");
const routes = [...appSource.matchAll(/<Route\s+path="([^"]+)"\s+element=\{<(\w+)/g)]
  .map(([, routePath, component]) => ({ routePath, component }))
  .filter(({ routePath }) => routePath !== "*");

const importMap = Object.fromEntries(
  [...appSource.matchAll(/import\s+(\w+)\s+from\s+"([^"]+)"/g)].map(
    ([, name, rel]) => [name, rel]
  )
);

const seenDescriptions = new Map();
const seenCanonicals = new Map();

for (const { routePath, component } of routes) {
  const rel = importMap[component];
  if (!rel) {
    warnings.push(`Could not resolve the import for ${component} (${routePath})`);
    continue;
  }
  const file = path.join("src", rel.replace(/^\.\//, "")) + ".jsx";
  if (!existsSync(file)) {
    warnings.push(`Could not find ${file} for route ${routePath}`);
    continue;
  }
  const content = readFileSync(file, "utf8");

  const description = content.match(/description="([^"]+)"/)?.[1];
  const canonical = content.match(/canonical="([^"]+)"/)?.[1];

  if (!description) errors.push(`${routePath} has no meta description`);
  if (!canonical) errors.push(`${routePath} has no canonical tag`);

  if (description) {
    const prior = seenDescriptions.get(description);
    if (prior) errors.push(`${routePath} reuses the meta description from ${prior}`);
    else seenDescriptions.set(description, routePath);
  }
  if (canonical) {
    const prior = seenCanonicals.get(canonical);
    if (prior) errors.push(`${routePath} reuses the canonical from ${prior}`);
    else seenCanonicals.set(canonical, routePath);
    if (canonical !== routePath) {
      warnings.push(`${routePath} declares canonical ${canonical}`);
    }
  }
}

/* 3. No retired ROLLER product ids. ------------------------------------- */
// These three were removed from the ROLLER catalogue; any button still using
// them silently lands on the generic product list instead of the product.
// Comments are stripped first so the changelog in lib/roller.js can name them.
const stripComments = (code) =>
  code.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1");

const RETIRED_PRODUCT_IDS = ["1692026", "1692180", "1692224"];
for (const file of srcFiles) {
  const content = stripComments(readFileSync(file, "utf8"));
  for (const id of RETIRED_PRODUCT_IDS) {
    if (content.includes(id)) {
      errors.push(`${file} references retired ROLLER product id ${id}`);
    }
  }
}

/* 4. Nothing enormous in public/. --------------------------------------- */
const MAX_IMAGE_BYTES = 1_000 * 1024;
const SIZE_EXEMPT = new Set(["public/alt-logo.png", "public/logo.png"]);
for (const file of walk("public")) {
  if (!/\.(png|jpe?g|webp)$/i.test(file)) continue;
  const key = file.split(path.sep).join("/");
  if (SIZE_EXEMPT.has(key)) continue;
  const { size } = statSync(file);
  if (size > MAX_IMAGE_BYTES) {
    warnings.push(
      `${key} is ${(size / 1024 / 1024).toFixed(1)} MB — run npm run optimize:images`
    );
  }
}

/* ----------------------------------------------------------------------- */
for (const w of warnings) console.warn(`warn  ${w}`);
for (const e of errors) console.error(`ERROR ${e}`);

console.log(
  `\nChecked ${scanned.length} files and ${routes.length} routes — ` +
    `${errors.length} error(s), ${warnings.length} warning(s).`
);
process.exit(errors.length ? 1 : 0);
