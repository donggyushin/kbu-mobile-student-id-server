FROM node:10

RUN mkdir /usr/src/test1

WORKDIR /usr/src/test1

COPY package*.json ./ 

RUN npm install 

COPY . .

EXPOSE 3000

CMD ["yarn","docker"]

