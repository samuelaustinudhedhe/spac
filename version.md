# Version History

## 1.2.0 — 2026-07-19

- Removed matric number and student ID from the About page; added `CLAUDE.md` with a hard rule against ever exposing private credentials
- Added `AI.README.md` / `llms.txt` (crawler-facing summaries for AI systems), `sitemap.xml`, and `robots.txt`
- `SITE_URL` is now baked into canonical/Open Graph/Twitter tags and the sitemap server-side at container start, instead of a manual placeholder swap
- Academic Planner now seeds starter goals from `assets/data/tasks.json` on first visit instead of loading empty
- Home page video: unmuted (40% volume), lazy-loaded, plays only while scrolled into view, no longer loops
- Fixed the click sound effect, which could fail silently on Safari/iOS from cloning a fresh, unlocked `<audio>` element per click
- Fixed the broken `{{SOCIAL_TELEGRAM_URL}}` link left live on About/Projects/Planner/Contact
- Fixed a mobile nav bug where the closed menu's own padding left a visible sliver below the header
- Hardened the Docker image so `CLAUDE.md` and the entrypoint script aren't accidentally served publicly
- Expanded skills and hobby copy on the About page with additional detail from Samuel's resume

## 1.1.0 — 2026-07-19

- Replaced the header logo with the new "Dev SAU" face logo (`assets/images/9c1b5403-res.png`) on every page except the Academic Planner, which still uses the placeholder logo

## 1.0.0 — 2026-07-18

Initial release.

- Five-page portfolio: Home, About Me, Projects, Academic Planner, Contact
- Academic planner with add/complete/delete tasks, persisted to `localStorage`
- Contact form with client-side validation
- Light/dark theme toggle
- Dockerized with nginx for local and Traefik-proxied serving
