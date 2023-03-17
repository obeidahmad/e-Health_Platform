FROM node:16-alpine as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/

RUN npm run build --output-path=./dist/out --production

FROM nginx:1.19

COPY --from=build-stage /app/dist/fyp /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
