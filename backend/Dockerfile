# Backend Dockerfile
# backend/Dockerfile
FROM node:18-alpine

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
EXPOSE 4000

# Start the application
CMD ["npm", "start"]