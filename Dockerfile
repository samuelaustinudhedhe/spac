# Serves the static COS106 portfolio site with nginx, matching how it
# will run on Reonr hosting. Build: docker compose up -d
FROM nginx:alpine

COPY . /usr/share/nginx/html

EXPOSE 80
