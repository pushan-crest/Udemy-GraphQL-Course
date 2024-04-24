# Stage 1: Build the React app
FROM node:16 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code to the container
COPY . .

# Build the frontend application
RUN npm run build

# Stage 2: Serve the frontend with Nginx
FROM nginx:alpine

# Remove default Nginx configuration
RUN rm -rf /etc/nginx/conf.d/*

# Copy the custom Nginx configuration
COPY default.conf /etc/nginx/conf.d/

# Copy the built frontend code from the previous stage to Nginx's web root directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
