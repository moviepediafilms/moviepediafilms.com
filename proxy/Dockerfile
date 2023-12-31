FROM nginxinc/nginx-unprivileged:latest

COPY nginx.conf "/etc/nginx/nginx.conf"
VOLUME [ "/media", "/static" ]
EXPOSE 8080
CMD nginx -g "daemon off;"