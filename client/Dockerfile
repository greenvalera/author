FROM node:alpine
USER node
RUN mkdir /home/node/app
WORKDIR /home/node/app
COPY --chown=node:node package.json ./
COPY --chown=node:node package-lock.json ./
COPY --chown=node:node ./ ./
RUN npm i
CMD ["npm", "run", "start"]