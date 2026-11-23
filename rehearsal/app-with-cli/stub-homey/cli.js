#!/usr/bin/env node
'use strict';

// A stand-in for the Homey CLI: it uploads nothing and prints the lines
// the real one printed for a release (homey 4.6.3), the app's id apart.
const { HOMEY_HEADLESS: headless, HOMEY_PAT: token, SCENARIO: scenario } = process.env;
const command = process.argv.slice(2).join(' ');

// The calls it received, for the workflow to assert.
require('node:fs').appendFileSync('rehearsal-calls.log', `${command}\n`);

if (command === '--version') {
  console.log('0.0.0 (stand-in)');
  process.exit(0);
}

if (command !== 'app publish' || headless !== '1' || token !== 'rehearsal-not-a-token') {
  console.error(`unexpected call: "${command}", headless "${headless}", token ${token ? 'set' : 'unset'}`);
  process.exit(2);
}

console.log('✓ Submitting com.example.app@1.2.3...');
console.log('✓ Created Build ID 361');
console.log('✓ Uploading com.example.app@1.2.3...');
if (scenario === 'failing') {
  console.error('✖ Upload failed');
  process.exit(1);
}
console.log('✓ App com.example.app@1.2.3 successfully uploaded.');
if (scenario !== 'unnamed') {
  console.log('\nVisit https://tools.developer.homey.app/apps/app/com.example.app/build/361 to publish your app.');
}
