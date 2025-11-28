# STAGE 1: Construction
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# This will execute "vite build" according to your package.json
RUN npm run build

# STAGE 2: Server
FROM node:18-alpine
WORKDIR /app
# We installed the lightweight web server
RUN npm install -g serve
# We copied the 'dist' folder that Vite generated.
COPY --from=builder /app/dist ./dist
EXPOSE 8080
# We start the server
CMD ["serve", "-s", "dist", "-l", "8080"]
