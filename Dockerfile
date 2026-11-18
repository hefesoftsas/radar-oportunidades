FROM node:22-bookworm-slim
WORKDIR /app
ENV NODE_ENV=production PORT=8096 RADAR_DATA=/data OPENCODE_KEY_FILE=/run/secrets/opencode_key
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --no-audit --no-fund
COPY server ./server
COPY dist ./dist
EXPOSE 8096
CMD ["node", "--experimental-sqlite", "server/server.mjs"]
