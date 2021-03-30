FROM node:14 AS builder

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /app

# Installing dependencies
COPY package.json ./
COPY yarn.lock ./
RUN ["yarn", "install", "--network-timeout 100000"]

# Copying source files
COPY . .

# Building app
RUN ["yarn", "build"]

FROM nginx:1.16.0-alpine AS server
ENV PUBLIC_URL=/
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.config /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Running the app with yarn
# CMD [ "yarn", "serve" ]
