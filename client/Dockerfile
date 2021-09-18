FROM node:alpine
WORKDIR /app
COPY --chown=node:node package.json ./
COPY --chown=node:node package-lock.json ./
COPY --chown=node:node ./ ./
USER node
RUN npm i
CMD ["npm", "run", "start"]