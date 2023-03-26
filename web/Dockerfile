# build stage
FROM node:14 as base
WORKDIR /app
COPY ./app/package*.json ./
RUN npm install
COPY ./app .
RUN npm run build


EXPOSE 8080

FROM base as dev
WORKDIR /app
RUN npm install --also dev
ENV CHOKIDAR_USEPOLLING=true

# production stage
FROM nginxinc/nginx-unprivileged:latest as prod
COPY --from=base /app/dist /usr/share/nginx/html
