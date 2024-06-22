# Use an official node image as the base image
# Specify the version of Node.js (e.g., 20)
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Set environment variables
ENV NODE_ENV=production

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application using Vite
RUN npm run build

# Install a simple HTTP server to serve the build files
RUN npm install -g serve

# Expose the port you want your app to run on
EXPOSE 8080

# Command to run the application on the desired port
CMD ["serve", "-s", "dist", "-l", "8080"]

