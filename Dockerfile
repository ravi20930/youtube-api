FROM node:14-alpine
WORKDIR /youtube-api
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD npm start