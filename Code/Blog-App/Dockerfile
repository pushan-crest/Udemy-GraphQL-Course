# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /src

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build Prisma client
RUN npx prisma generate

# Expose the port the app runs on
EXPOSE 4000

# Command to run the application
CMD ["npm", "run", "start"]
