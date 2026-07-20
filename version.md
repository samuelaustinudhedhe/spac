# Version History

## 1.3.0 — 2026-07-20

- Contact form now actually delivers to `s.austin9897@miva.edu.ng` via Web3Forms — previously it only validated and showed a fake "message received" status without sending anything anywhere
- Site is now open to search engine/AI crawler indexing (`index, follow`, reversing the earlier `noindex, nofollow`)
- Converted all content photos/screenshots to WebP (hero photo, header logo, both project screenshots), roughly halving their size on average; `og-image.jpg` and favicons intentionally kept in their original formats for social-preview and cross-browser favicon compatibility
- Added `loading="lazy"` to below-the-fold images (footer logos, project screenshots) and `fetchpriority="high"` to the homepage hero photo (likely LCP element)
- Synced `js/theme-init.js` and removed all inline `style="..."` attributes (now `.link-gold` / `.card-actions` CSS classes) to match production's stricter CSP with no inline-script/style exceptions
- Production nginx/security-header configuration now intentionally lives server-side only, not duplicated in this repo

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
