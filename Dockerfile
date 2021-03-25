FROM node:14

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Installing dependencies
COPY package.json ./
COPY yarn.lock ./
RUN ["yarn", "install"]

# Copying source files
COPY . .

# Building app
RUN ["yarn", "build"]

# Running the app
CMD [ "yarn", "serve" ]
