FROM node:23-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

EXPOSE 3000

CMD ["npm", "run", "dev"]
