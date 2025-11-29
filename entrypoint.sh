#!/bin/sh

# Set a default for the PORT variable if it's not provided by the environment.
export PORT=${PORT:-8080}

# Substitute the PORT variable into the Nginx config template
envsubst '${PORT}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

# Print the generated config for debugging purposes
echo "--- Starting Nginx with the following configuration ---"
cat /etc/nginx/conf.d/default.conf
echo "-----------------------------------------------------"

# Start Nginx in the foreground
exec nginx -g 'daemon off;'
