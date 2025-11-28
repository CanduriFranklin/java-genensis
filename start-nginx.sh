#!/bin/sh
# Set the port to the value of the PORT environment variable, or 8080 if it's not set.
export PORT="${PORT:-8080}"

# Use envsubst to create the final nginx.conf from the template.
# This replaces the default nginx.conf entirely.
envsubst '$PORT' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

# Print out the generated config file for debugging
echo "--- Generated Nginx Config ---"
cat /etc/nginx/nginx.conf
echo "------------------------------"

# Start Nginx in the foreground
exec nginx -g 'daemon off;'
