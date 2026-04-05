FROM node:23-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

EXPOSE 3000

CMD ["sh", "-c", "[ ! -f node_modules/.bin/ts-node ] && npm ci; npm run dev"]
