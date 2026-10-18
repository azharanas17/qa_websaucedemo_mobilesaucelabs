#!/usr/bin/env bash
#
# CI helper: run the mobile (Appium) BDD suite against a booted Android emulator.
# Invoked from .github/workflows/mobile-tests.yml inside the
# reactivecircus/android-emulator-runner step, which runs each `script` line
# with `sh -c`. Keeping the logic here lets us rely on bash (pipefail, loops).
#
# Usage: bash mobile/ci/run-mobile-tests.sh /path/to/app.apk
set -euo pipefail

APK_PATH="${1:?path to the sample APK is required}"
APPIUM_LOG="reports/appium.log"
BOOT_RETRIES=120
APPIUM_RETRIES=60

mkdir -p reports

echo "== adb devices (before) =="
adb devices
adb wait-for-device

echo "== Waiting for the emulator to finish booting =="
boot=""
for _ in $(seq 1 "$BOOT_RETRIES"); do
  boot="$(adb shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')"
  if [ "$boot" = "1" ]; then
    break
  fi
  sleep 5
done
if [ "$boot" != "1" ]; then
  echo "ERROR: emulator did not report sys.boot_completed=1"
  adb devices
  exit 1
fi
echo "sys.boot_completed=$boot"
echo "bootanim=$(adb shell getprop init.svc.bootanim | tr -d '\r')"

echo "== Verifying adb reports a device =="
adb devices
device_count="$(adb devices | awk 'NR>1 && $2=="device"{c++} END{print c+0}')"
if [ "$device_count" -lt 1 ]; then
  echo "ERROR: no device reported by adb in 'device' state"
  exit 1
fi
echo "adb online devices: $device_count"

echo "== Installing the Sauce Labs sample app =="
adb install -r "$APK_PATH"
if ! adb shell pm list packages | grep -q com.swaglabsmobileapp; then
  echo "ERROR: com.swaglabsmobileapp was not installed"
  exit 1
fi

echo "== Starting the Appium server =="
npx appium --address 127.0.0.1 --port 4723 > "$APPIUM_LOG" 2>&1 &
APPIUM_PID=$!
trap 'kill "$APPIUM_PID" 2>/dev/null || true' EXIT

appium_ready=0
for _ in $(seq 1 "$APPIUM_RETRIES"); do
  if curl -sf http://127.0.0.1:4723/status >/dev/null 2>&1; then
    appium_ready=1
    break
  fi
  sleep 2
done
if [ "$appium_ready" != "1" ]; then
  echo "ERROR: Appium server did not become ready"
  cat "$APPIUM_LOG" || true
  exit 1
fi
echo "Appium is ready:"
curl -s http://127.0.0.1:4723/status || true
echo

echo "== Running the five mobile login scenarios =="
if npm run test:mobile:login 2>&1 | tee reports/mobile-login.log; then
  echo "== Login scenarios passed; running the full mobile suite =="
  npm run test:mobile 2>&1 | tee reports/mobile-full.log
else
  echo "== Login scenarios failed; skipping the full mobile suite =="
  exit 1
fi
