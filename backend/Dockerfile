# Backend Dockerfile
# backend/Dockerfile

#image to pull
FROM node:18-alpine 

#initialize /app working directory The WORKDIR instruction sets the working directory for any 
#RUN, CMD, ENTRYPOINT, COPY and ADD instructions that follow it in the Dockerfile.
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