FROM node:20-alpine
WORKDIR /app

COPY ../../package.json ../../yarn.lock ./
COPY ../../packages/api ./packages/api
COPY ../../prisma ./prisma

WORKDIR /app/packages/api
RUN yarn install --frozen-lockfile
RUN yarn build

CMD ["node", "dist/main"]