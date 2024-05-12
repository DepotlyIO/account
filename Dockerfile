# syntax = docker/dockerfile:1

FROM node:20-alpine as build

ARG VITE_BASE_API_URL

RUN corepack enable

WORKDIR /build

COPY package.json pnpm-lock.yaml .npmrc ./

RUN pnpm install

COPY . .

RUN pnpm generate-sprites

RUN pnpm build

FROM nginx:stable-alpine as production

COPY --from=build /build/build/nginx.conf /etc/nginx/nginx.conf

COPY --from=build /build/dist /app
