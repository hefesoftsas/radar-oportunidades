#!/bin/sh
set -eu
mkdir -p /profile
Xvfb :99 -screen 0 480x900x24 -nolisten tcp &
i=0
while [ ! -S /tmp/.X11-unix/X99 ] && [ "$i" -lt 30 ]; do sleep 1; i=$((i+1)); done
x11vnc -display :99 -localhost -nopw -forever -shared -quiet &
websockify --web /usr/share/novnc 6080 127.0.0.1:5900 &
socat TCP-LISTEN:9223,bind=0.0.0.0,reuseaddr,fork TCP:127.0.0.1:9222 &
exec chromium --no-sandbox --disable-dev-shm-usage --disable-gpu --disable-background-networking --no-first-run --no-default-browser-check --remote-debugging-port=9222 --user-data-dir=/profile --window-size=480,900 'https://m.facebook.com/marketplace/'
