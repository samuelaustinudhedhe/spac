#!/bin/sh
# Bakes the real deployment URL into every {{SITE_URL}} placeholder in the
# HTML, sitemap.xml, and robots.txt before nginx starts serving them.
# Social-media link-preview crawlers (WhatsApp, Instagram, Facebook) don't
# execute JavaScript, so this has to happen server-side in the actual
# response body, not client-side.
set -e

: "${SITE_URL:=https://cos106.localhost}"
SITE_URL="${SITE_URL%/}"

for f in /usr/share/nginx/html/*.html /usr/share/nginx/html/sitemap.xml /usr/share/nginx/html/robots.txt; do
  [ -f "$f" ] && sed -i "s|{{SITE_URL}}|${SITE_URL}|g" "$f"
done

exec /docker-entrypoint.sh "$@"
