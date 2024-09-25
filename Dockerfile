FROM node:alpine as build
WORKDIR /opt/app
ADD package*.json ./
RUN npm ci
ADD public/ ./public/
ADD *.html ./
ADD *.ts ./
ADD *.json ./
ADD .env* ./
ADD src/ ./src/
RUN npm run build

FROM nginx:alpine
COPY --from=build /opt/app/build  /usr/share/nginx/html
ADD ./config/nginx/nginx.conf /etc/nginx/templates/nginx.conf
ADD run.sh ./
RUN chmod +x ./run.sh
EXPOSE 80
CMD ["/bin/sh", "-c", "./run.sh"]
