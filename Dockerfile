# syntax=docker/dockerfile:1

FROM node:current-alpine
ENV NODE_ENV=production
COPY . /movie-analyst-api
WORKDIR /movie-analyst-api
RUN npm install --production
CMD [ "node", "server.js" ]