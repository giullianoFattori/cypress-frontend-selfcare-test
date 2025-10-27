import { readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT_DIR = process.cwd();
const SPEC_DIR = join(ROOT_DIR, "cypress", "e2e");
const SPEC_SUFFIX = ".cy.ts";

const indexArg = Number(process.env.SPEC_SHARD_INDEX ?? process.argv[2] ?? 0);
const totalArg = Number(process.env.SPEC_TOTAL_SHARDS ?? process.argv[3] ?? 1);

if (Number.isNaN(indexArg) || Number.isNaN(totalArg) || totalArg <= 0) {
  console.error("Invalid shard settings. Provide SPEC_SHARD_INDEX and SPEC_TOTAL_SHARDS.");
  process.exit(1);
}

const walk = (dir) => {
  return readdirSync(dir)
    .flatMap((entry) => {
      const fullPath = join(dir, entry);
      const stats = statSync(fullPath);

      if (stats.isDirectory()) {
        return walk(fullPath);
      }

      return fullPath.endsWith(SPEC_SUFFIX) ? [relative(ROOT_DIR, fullPath)] : [];
    })
    .sort();
};

const specs = walk(SPEC_DIR);

if (specs.length === 0) {
  console.error("No Cypress spec files were found.");
  process.exit(1);
}

const chunkSize = Math.ceil(specs.length / totalArg);
const start = indexArg * chunkSize;
const chunk = specs.slice(start, start + chunkSize);

if (chunk.length === 0) {
  console.warn(`Shard ${indexArg + 1}/${totalArg} does not contain specs.`);
  process.exit(0);
}

process.stdout.write(chunk.join(","));
