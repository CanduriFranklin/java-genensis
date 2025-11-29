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

# Copy the compiled files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Remove the default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy your custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose the port Cloud Run expects
EXPOSE 8080

# Start Nginx in foreground mode
CMD ["nginx", "-g", "daemon off;"]
