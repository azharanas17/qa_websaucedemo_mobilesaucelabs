# QA Engineer Assignment - HMsampoerna

BDD test automation for the Sauce Labs sample Web and Mobile applications using
Cucumber + TypeScript, Playwright (web) and Appium (mobile), with Allure reporting.

## Web (Playwright + Cucumber BDD)
- Tests live on https://www.saucedemo.com/
- POM pattern in web/pages/
- Features in web/features/
- Steps/Hooks/World in web/tests/

### Running Web Tests
- `npm run test:web` - full suite with live Cucumber progress on stdout
- `npm run test:web:login` - login feature only
- `npm run test:web:report` - runs the suite, writes reports/cucumber-report.json and allure-results/, then prints a summary

## Mobile (Appium + Cucumber BDD)
- Tests run against the official Sauce Labs sample app (release 2.7.1)
  https://github.com/saucelabs/sample-app-mobile/releases
- POM pattern in mobile/pages/
- Features in mobile/features/
- Steps/Hooks/World in mobile/tests/

### Mobile prerequisites
- Node.js v22 (this repo was validated on v22.3.0)
- Java 17
- Android SDK, e.g. `/Users/naz/Library/Android/sdk`
- An Android Virtual Device (AVD). This repo was used with `Medium_Phone_API_36`
- Appium (installed locally as a devDependency) and the UiAutomator2 driver

Expose the Android SDK for the Appium server:

```sh
export ANDROID_HOME="$HOME/Library/Android/sdk"
export ANDROID_SDK_ROOT="$ANDROID_HOME"
export PATH="$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator:$PATH"
```

### 1. Start the Android emulator

```sh
emulator -avd Medium_Phone_API_36 -no-snapshot -gpu host &
adb wait-for-device
adb shell getprop sys.boot_completed   # expect: 1
```

Install the sample app (only needed once, or after wiping data):

```sh
curl -L -o /tmp/saucelabs.apk \
  https://github.com/saucelabs/sample-app-mobile/releases/download/2.7.1/Android.SauceLabs.Mobile.Sample.app.2.7.1.apk
adb install -r /tmp/saucelabs.apk
```

### 2. Start the Appium server

```sh
npm run appium:start
curl -s http://127.0.0.1:4723/status   # expect {"value":{"ready":true,...}}
```

### 3. Run the mobile scenarios

- `npm run test:mobile` - all mobile scenarios
- `npm run test:mobile:login` - login scenarios only

The mobile suite connects to Appium at `127.0.0.1:4723` and launches
`com.swaglabsmobileapp` on the running emulator/device.

## Reports (Allure)
- `npm run report:allure` - generate the Allure HTML report from allure-results/ into reports/allure-report
- `npm run report:allure:open` - serve reports/allure-report
- Mobile results are written to `allure-results-mobile/` (kept separate from the web
  results in `allure-results/`). Generate a mobile report with the Allure CLI:
  `npx allure generate allure-results-mobile --clean -o reports/allure-report-mobile`
- `npm run report:allure:combine` - placeholder script for a combined report; see
  "Known limitations" before relying on it.

## Mobile CI (GitHub Actions)
`.github/workflows/mobile-tests.yml` runs the mobile suite on a fresh, cleaner
environment than a local emulator.

- Trigger: `push` / `pull_request` to `main`/`master` when `mobile/**`, `shared/**`,
  `package.json`, `package-lock.json`, or the workflow itself changes, plus manual
  `workflow_dispatch`. The web workflow is not affected.
- Runner: `ubuntu-latest` (hardware-accelerated x86_64 emulator via KVM).
- Steps: install Node LTS and Java 17, `npm ci`, verify the Appium + UiAutomator2 driver,
  download the sample APK 2.7.1, boot an API 34 `google_apis` emulator, then run
  `mobile/ci/run-mobile-tests.sh` inside the `reactivecircus/android-emulator-runner`
  step. That helper waits for `sys.boot_completed=1`, verifies `adb` reports a device,
  installs the APK, starts Appium on `127.0.0.1:4723`, runs the five login scenarios,
  and only then runs the full suite.
- Artifacts: `mobile-test-reports` on success and `mobile-diagnostics` on failure
  (`reports/` including `appium.log`, the per-run logs, and the Cucumber JSON report,
  plus `allure-results-mobile/`).
  The mobile Allure HTML report is generated into `reports/allure-report-mobile/`.

## Mobile scenarios
Validated against real app behavior. The login screen only advertises three users
(`standard_user`, `locked_out_user`, `problem_user`); there is no `performance_glitch_user`.

- `mobile/features/login.feature`
  - Successful login with valid credentials (@smoke @positive)
  - Successful login with problem user (@positive)
  - Locked out user cannot login (@negative)
  - Login with unknown user is rejected (@negative)
  - Login with empty credentials shows error (@negative)
- `mobile/features/inventory.feature` - add to cart, remove from cart
- `mobile/features/cart.feature` - cart screen, continue shopping, proceed to checkout
- `mobile/features/checkout.feature` - checkout information, overview, complete

## Known limitations and troubleshooting
- The Android emulator/Appium environment can become unstable over long runs
  (`adb forward` timeouts, `socket hang up` on the UiAutomator2 server, or
  `am start-activity timed out`). Mitigations used here:
  - Start the emulator with `-gpu host` on Apple Silicon.
  - Disable animations: `adb shell settings put global window_animation_scale 0`
    (and `transition_animation_scale`, `animator_duration_scale`).
  - Keep Appium raised timeouts (`adbExecTimeout`, `appWaitDuration`) - set in `mobile/tests/world.ts`.
  - If the device goes bad, restart the emulator and the Appium server.
- Each scenario opens its own Appium session for isolation, so mobile runs are slower
  than web runs.
- Web suite pre-existing issue: `web/pages/CartPage.ts` declares a `continueShopping`
  Locator field and a same-named method (dead/shadowed). It does not affect the Cucumber
  runs (tsx transpiles without typechecking) but makes `tsc --noEmit` fail.
- Allure result directories are gitignored and must be regenerated; do not commit them.
