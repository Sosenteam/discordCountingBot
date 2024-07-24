# Use an official Node.js runtime as the base image
FROM node:18-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install the bot's dependencies
RUN npm install

# Copy the bot's source code and configuration
COPY . .

# Make sure the bot script is executable
RUN chmod +x bot.js

# Run the bot when the container launches
CMD [ "node", "bot.js" ]
