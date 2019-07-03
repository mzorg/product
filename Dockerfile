# Extending image
FROM node:alpine

# Versions
RUN npm -v
RUN node -v

# App directory
WORKDIR /app

# Environment variables
ENV NODE_ENV production
ENV PORT 3000

# Install app dependencies
COPY package.json /app/
RUN npm install

# Bundle app source
COPY . /app

# Port to listener
EXPOSE $PORT

# Main command
CMD ["npm", "start"]
