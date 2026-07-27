// Warms up Next.js dev-mode's on-demand route compilation before any
// test runs. Without this, the FIRST hit to /admin/<token> (or the first
// tab switch to Education/Skills/Projects) can trigger a cold compile
// that exceeds a test's own timeout - causing failures that have nothing
// to do with the test's actual logic, and orphaned rows when cleanup
// (afterEach) hits the same cold-compile delay and times out too.
async function globalSetup() {
  const token = process.env.TOKEN;
  if (!token) {
    // Don't throw here - admins.spec.ts already throws its own clear
    // error if TOKEN is missing. This warm-up is best-effort only.
    return;
  }

  const baseUrl = "http://localhost:3000";

  try {
    // Hit the admin page once - triggers compilation of the shared
    // admin route/layout.
    await fetch(`${baseUrl}/admin/${token}`);
  } catch (err) {
    console.warn(
      "[global-setup] Could not warm up /admin route - dev server may still be starting. Continuing anyway:",
      err,
    );
  }
}

export default globalSetup;