// main.ts — entry program for the World by the Numbers site.
// Copies app/ and screenshots/ into the output directory and writes
// /output/dossier.json via buildDossier from vendor/makefun-frontend.ts.
// Node 22 standard library only; deterministic (same bytes every run).
import { cpSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { buildDossier } from "./vendor/makefun-frontend.ts";

const out = process.env.MAKEFUN_OUTPUT_DIR || "/output";

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
cpSync("app", out + "/app", { recursive: true });
cpSync("screenshots", out + "/screenshots", { recursive: true });

writeFileSync(
  out + "/dossier.json",
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);
