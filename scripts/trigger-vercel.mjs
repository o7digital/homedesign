#!/usr/bin/env node
// Trigger a Vercel Deploy Hook from CLI
// Usage:
//   node scripts/trigger-vercel.mjs dev
//   node scripts/trigger-vercel.mjs main

const which = process.argv[2] || 'dev';
const envVar = which === 'main' ? 'VERCEL_DEPLOY_HOOK_URL_MAIN' : 'VERCEL_DEPLOY_HOOK_URL_DEV';
const url = process.env[envVar];

if (!url) {
  console.error(`[trigger-vercel] Missing ${envVar} in environment`);
  process.exit(1);
}

async function run() {
  try {
    const res = await fetch(url, { method: 'POST' });
    const text = await res.text();
    console.log(`[trigger-vercel] ${which}: ${res.status} ${res.statusText}`);
    if (text) console.log(text);
    if (!res.ok) process.exit(1);
  } catch (e) {
    console.error(`[trigger-vercel] Error:`, e?.message || e);
    process.exit(1);
  }
}

run();

