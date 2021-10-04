FROM node:alpine as builder
LABEL maintainer="dragmove <dragmove@gmail.com>"
LABEL stage=builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ ./
RUN npm run build
# CMD ["npm", "run", "build"] 사용시, 바로 진행되는 Removing intermediate container 이슈로 COPY --from=builder /app/build /usr/share/nginx/html 구문 실행이 정상적으로 되지 않았다.

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html