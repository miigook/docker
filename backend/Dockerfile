# Backend Dockerfile
# backend/Dockerfile

#image to pull
FROM node:18-alpine 

#initialize /app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY ./backend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY ./backend .

# Create directory for static files
RUN mkdir -p public

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]