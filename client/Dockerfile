# Use an official Node.js runtime as the base image
FROM node:alpine as build

# Set the working directory in the container
WORKDIR /app

# COPY public/ /app/public
# COPY src/ /app/src
COPY /package*.json ./

# Install dependencies
RUN npm install

# Copy the remaining application code
COPY . .

# CMD ["npm", "start"]

# # Build the React app
# RUN npm start

# # Use a lightweight image for production
FROM nginx:alpine

# # Copy built files from the 'build' directory to the NGINX server root
COPY --from=build /app/build /usr/share/nginx/html

# # Expose port 80 to the outside world
EXPOSE 80

# # Run NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]
