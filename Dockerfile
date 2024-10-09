# Build stage
FROM node:20 AS base

RUN mkdir -p /usr/node/app/node_modules && chown -R node:node /usr/node/app

WORKDIR /usr/node/app

COPY --chown=node:node package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

RUN npm run build

# Production stage
FROM node:20 AS production

WORKDIR /usr/node/app

COPY --chown=node:node package*.json ./

RUN npm ci --only=production

COPY --from=base /usr/node/app/dist ./dist

EXPOSE 3333

CMD ["npm", "run", "start"]