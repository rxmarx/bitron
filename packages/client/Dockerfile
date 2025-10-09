FROM node:20-alpine
WORKDIR /app

COPY ../../package.json ../../yarn.lock ./
COPY ../../packages/client ./packages/client
COPY ../../prisma ./prisma

WORKDIR /app/packages/client
RUN yarn install --frozen-lockfile
RUN yarn build

CMD ["node", "dist/index.js"]
