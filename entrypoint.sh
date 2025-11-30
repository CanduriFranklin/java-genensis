#!/bin/sh
# entrypoint.sh

# Substitute environment variables in the nginx configuration
envsubst '$PORT' < /etc/nginx/nginx.template > /etc/nginx/conf.d/default.conf

# Execute the command passed to this script
exec "$@"
