FROM node:20

WORKDIR /code

COPY . /code/

RUN npm install 

EXPOSE 3000

CMD ["npm", "run", "dev"]




