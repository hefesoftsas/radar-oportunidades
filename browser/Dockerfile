FROM node:22-bookworm-slim
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends chromium xvfb x11vnc novnc websockify socat fonts-liberation ca-certificates util-linux && rm -rf /var/lib/apt/lists/*
COPY start.sh /start-browser.sh
COPY launch-profile.sh /launch-profile.sh
RUN chmod 755 /start-browser.sh /launch-profile.sh
ENV DISPLAY=:99
EXPOSE 6080 9223
CMD ["/start-browser.sh"]
