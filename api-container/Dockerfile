FROM node:lts-alpine@sha256:c785e617c8d7015190c0d41af52cc69be8a16e3d9eb7cb21f0bb58bcfca14d6b
RUN apk add dumb-init
ENV NODE_ENV production
WORKDIR /api-container
COPY --chown=node:node package*.json .
RUN npm ci --only=production
COPY --chown=node:node . ./
USER node
CMD ["dumb-init", "node", "api.server.js"]