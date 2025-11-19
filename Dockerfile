FROM node:22-alpine as final
FROM node:22-alpine as build

# Build step of the Dockerfile. Compiles the application into a smaller, sleeked down, optimized build.
RUN mkdir -p /app

WORKDIR /app

COPY package*.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

# Run step of the Dockerfile. Gets the compiled build of the app from the build step and runs it.
FROM final

RUN mkdir -p /app

WORKDIR /app

RUN apk update && apk add nginx

COPY ./nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist /app/dist

COPY --from=build /app/node_modules /app/node_modules

EXPOSE 80

CMD ["nginx", "-g", "'daemon off;'"]