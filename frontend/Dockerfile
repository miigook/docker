# Frontend Dockerfile
# frontend/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy frontend files
COPY ./frontend/index.html /app/public/index.html

# Install a simple static file server
RUN npm install -g serve

# Expose port
EXPOSE 5000

# Start the static server
CMD ["serve", "-s", "public", "-l", "5000"]