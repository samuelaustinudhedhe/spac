# Serves the static COS106 portfolio site with nginx, matching how it
# will run on Reonr hosting. Build: docker compose up -d
FROM nginx:alpine

COPY . /usr/share/nginx/html

COPY docker-entrypoint-site.sh /docker-entrypoint-site.sh
RUN chmod +x /docker-entrypoint-site.sh \
    && rm -f /usr/share/nginx/html/docker-entrypoint-site.sh

EXPOSE 80

ENTRYPOINT ["/docker-entrypoint-site.sh"]
CMD ["nginx", "-g", "daemon off;"]
