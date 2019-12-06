FROM node:13-alpine
VOLUME /code
WORKDIR /code
EXPOSE 3000
CMD "./libretube"
