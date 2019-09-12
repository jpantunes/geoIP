FROM node:10-alpine

WORKDIR /src/app

COPY package.json package-lock.json ./

RUN npm ci

# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 10010

CMD [ "npm", "start" ]