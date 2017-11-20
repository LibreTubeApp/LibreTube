FROM node:8-alpine
VOLUME /code
WORKDIR /code
EXPOSE 3000
CMD "./libretube"
