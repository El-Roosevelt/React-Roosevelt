FROM node:24.8.0-alpine

WORKDIR /React-Roosevelt

COPY package.json package-lock.json ./

RUN --mount=type=cache,target=/root/.npm npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]