FROM node:8-alpine
VOLUME /code
WORKDIR /code
EXPOSE 4000
CMD ["./wait-for", "db:5432", "--timeout=60", "--", "npm", "start"]
