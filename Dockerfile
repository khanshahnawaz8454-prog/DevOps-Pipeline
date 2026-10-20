
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY app/ ./app/

ENV NODE_ENV=production
ENV PORT=3000
ENV APP_VERSION=1.0.0

EXPOSE 3000

USER node

CMD ["node", "app/server.js"]
