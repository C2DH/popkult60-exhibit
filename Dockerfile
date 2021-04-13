FROM node:15.12.0-alpine3.10 as builder

ARG GIT_TAG
ARG GIT_BRANCH
ARG GIT_REVISION
ARG PUBLIC_URL

WORKDIR /app

COPY package.json .
# COPY yarn.lock .

# RUN apk add git
RUN yarn cache clean
RUN yarn install

COPY public ./public
COPY src ./src
COPY .env .

ENV NODE_ENV production
ENV NODE_OPTIONS --max_old_space_size=4096

ENV REACT_APP_GIT_TAG=${GIT_TAG}
ENV REACT_APP_GIT_BRANCH=${GIT_BRANCH}
ENV REACT_APP_GIT_REVISION=${GIT_REVISION}
ENV PUBLIC_URL=${PUBLIC_URL}
RUN yarn build

FROM busybox
WORKDIR /app
COPY --from=builder /app/build ./
