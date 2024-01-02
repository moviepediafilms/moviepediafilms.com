# build stage
FROM node:14 as build-stage
WORKDIR /app
COPY ./src/package*.json ./
RUN npm install
COPY ./src .
RUN npm run build

FROM build-stage as dev
EXPOSE 8000
CMD ["npm", "run", "serve"]

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]