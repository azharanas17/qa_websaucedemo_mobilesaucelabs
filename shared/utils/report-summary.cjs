const fs = require('node:fs');
const path = require('node:path');

const jsonPath = path.resolve(process.cwd(), process.argv[2] || 'reports/cucumber-report.json');
const exitCode = Number(process.argv[3] || 0);

const statusOf = (steps) => {
  let outcome = 'passed';
  for (const step of steps) {
    const status = step.result && step.result.status;
    if (status === 'failed' || status === 'ambiguous') return 'failed';
    if (status === 'undefined') outcome = 'undefined';
    else if (status === 'pending') outcome = outcome === 'passed' ? 'pending' : outcome;
    else if (status === 'skipped' && outcome === 'passed') outcome = 'skipped';
  }
  return outcome;
};

const tally = (items) => {
  const counts = { passed: 0, failed: 0, skipped: 0, undefined: 0, pending: 0, ambiguous: 0 };
  for (const item of items) {
    counts[item] = (counts[item] || 0) + 1;
  }
  return counts;
};

const fmt = (counts) =>
  Object.entries(counts)
    .filter(([, n]) => n > 0)
    .map(([status, n]) => `${n} ${status}`)
    .join(', ');

try {
  const features = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  let scenarioCount = 0;
  let stepCount = 0;
  let durationNs = 0;
  const scenarioStatuses = [];
  const stepStatuses = [];

  for (const feature of features) {
    for (const element of feature.elements || []) {
      if (element.type !== 'scenario') continue;
      scenarioCount += 1;
      const steps = element.steps || [];
      scenarioStatuses.push(statusOf(steps));
      for (const step of steps) {
        if (step.hidden) continue;
        stepCount += 1;
        stepStatuses.push((step.result && step.result.status) || 'unknown');
        durationNs += (step.result && step.result.duration) || 0;
      }
    }
  }

  const scenarioTally = tally(scenarioStatuses);
  const stepTally = tally(stepStatuses);
  const durationSec = (durationNs / 1e9).toFixed(2);

  console.log('');
  console.log('Cucumber summary');
  console.log(`  Features : ${features.length}`);
  console.log(`  Scenarios: ${scenarioCount} (${fmt(scenarioTally)})`);
  console.log(`  Steps    : ${stepCount} (${fmt(stepTally)})`);
  console.log(`  Duration : ${durationSec}s`);
  console.log('  Allure   : allure-results/  ->  npm run report:allure');
  console.log('');
} catch (error) {
  console.error(`report-summary: unable to read ${jsonPath}: ${error.message}`);
  process.exit(exitCode || 1);
}

process.exit(exitCode);
