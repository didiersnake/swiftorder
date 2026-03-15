
FROM node:18.16.0

ENV PORT 3030
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

RUN apt-get update

# Bundle app source
ENV PATH /app/node_modules/.bin:$PATH

COPY . .

EXPOSE $PORT

CMD [ "npm", "start"]
