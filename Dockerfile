# Use an official Node.js runtime as the base image
FROM node:18-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install the bot's dependencies
RUN npm install

# Debug: List contents of the current directory
RUN ls -la

# Copy the bot's source code and configuration
COPY index.js config.json ./

# Debug: List contents again and check config.json
RUN ls -la && cat config.json

# Make sure the bot script is executable
RUN chmod +x index.js

# Run the bot when the container launches
CMD [ "node", "index.js" ]