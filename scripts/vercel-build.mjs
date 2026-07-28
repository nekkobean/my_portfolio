import { spawnSync } from "node:child_process";

const npxCommand =
  process.platform === "win32" ? "npx.cmd" : "npx";

const npmCommand =
  process.platform === "win32" ? "npm.cmd" : "npm";

function runCommand(command, args) {
  console.log(`\n> ${command} ${args.join(" ")}\n`);

  const result = spawnSync(command, args, {
    stdio: "inherit",
    env: process.env,
  });

  if (result.error) {
    console.error(result.error);
    process.exit(1);
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

/*
 * Only apply production migrations when Vercel is building
 * the Production environment.
 *
 * Preview branches must not automatically modify your
 * production database.
 */
if (process.env.VERCEL_ENV === "production") {
  runCommand(npxCommand, [
    "prisma",
    "migrate",
    "deploy",
  ]);
}

/*
 * The regular build script generates Prisma Client
 * and builds the Next.js application.
 */
runCommand(npmCommand, ["run", "build"]);