# QA Engineer Assignment - HMsampoerna

## Web (Playwright + Cucumber BDD)
- Tests live on https://www.saucedemo.com/
- POM pattern in web/pages/
- Features in web/features/
- Steps/Hooks/World in web/tests/

## Running Web Tests
- npm run test:web - full suite with live Cucumber progress on stdout
- npm run test:web:login - login feature only
- npm run test:web:report - runs the suite, writes reports/cucumber-report.json and allure-results/, then prints a summary

## Reports
- npm run report:allure - generate the Allure HTML report from allure-results/ into reports/allure-report
- npm run report:allure:open - serve the generated Allure report

Note: Cucumber keeps only the last target-less --format as stdout, and the Allure
formatter writes to allure-results/ without printing, so test:web:report produces
the summary via shared/utils/report-summary.cjs instead of live progress. Use
test:web for live dots.

## Mobile (Appium)
- mobile/ directory present; no implementation yet.
- Android SDK found at /Users/naz/Library/Android/sdk (platform-tools/emulator present)
- AVD available: Medium_Phone_API_36
- No connected device/emulator detected. Start emulator or connect device before running mobile tests.
