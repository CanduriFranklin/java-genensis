# Stage 1: Build the React application
FROM node:20-alpine AS build

WORKDIR /app

# Copy only the dependency files first to take advantage of the cache
COPY package*.json ./
RUN npm install --frozen-lockfile

# Copy the rest of the code
COPY . .


# Generate the production build
RUN npm run build

# Stage 2: Serve the static files with Nginx
FROM nginx:1.21.0-alpine

# Install 'gettext' for envsubst and dos2unix to fix line endings
RUN apk add --no-cache gettext dos2unix

# Copy the built assets from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the Nginx configuration template and the entrypoint script
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY entrypoint.sh /entrypoint.sh

# Ensure the entrypoint script has correct line endings and is executable
RUN dos2unix /entrypoint.sh && chmod +x /entrypoint.sh

# Expose the port (the actual port will be set by the entrypoint script)
EXPOSE 8080

# Run the entrypoint script to start Nginx
ENTRYPOINT ["/entrypoint.sh"]
