FROM alpine:3.24
RUN apk add --no-cache ca-certificates chromium flock font-liberation novnc socat x11vnc xvfb
COPY start.sh /start-browser.sh
COPY launch-profile.sh /launch-profile.sh
RUN chmod 755 /start-browser.sh /launch-profile.sh
ENV DISPLAY=:99
EXPOSE 6080 9223
CMD ["/start-browser.sh"]
