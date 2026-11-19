#!/bin/sh
set -eu

profile=${RADAR_PROFILE_DIR:-/profile}
browser=${RADAR_CHROMIUM_BIN:-chromium}
mkdir -p "$profile"

# Coolify can start the replacement before stopping the previous container.
# Hold this lock until Chromium has exited so they never share a live profile.
exec 9>"$profile/.radar-browser.lock"
flock -x 9
for entry in SingletonLock SingletonSocket SingletonCookie; do
  if [ -L "$profile/$entry" ]; then unlink "$profile/$entry"; fi
done

"$browser" --no-sandbox --disable-dev-shm-usage --disable-gpu --disable-background-networking --no-first-run --no-default-browser-check --remote-debugging-port=9222 --user-data-dir="$profile" --window-size=480,900 'https://m.facebook.com/marketplace/' &
browser_pid=$!
shutdown() {
  kill -TERM "$browser_pid" 2>/dev/null || true
  wait "$browser_pid" 2>/dev/null || true
  exit 0
}
trap shutdown TERM INT
wait "$browser_pid"
