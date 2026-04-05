FROM node:23-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

EXPOSE 3001

CMD ["sh", "-c", "[ ! -f node_modules/.bin/vite ] && npm ci; npm run dev -- --host 0.0.0.0"]
