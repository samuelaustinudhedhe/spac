# Samuel Austin Udhedhe — Student Portfolio & Academic Planner

A five-page student portfolio and academic planner for Samuel Austin Udhedhe, a Software Engineering student at MIVA Open University and founder of [Reonr](https://reonr.com). Built with plain HTML, CSS, and JavaScript — no frameworks, no build step.

Live at [cos106.localhost](https://cos106.localhost) (local Traefik) or `http://localhost:8080` (direct), once the container is running.

## Pages

| Page | File | What's there |
|---|---|---|
| Home | `index.html` | Entry gate, hero, stats strip, bowling video |
| About Me | `about.html` | Professional summary, education, career aspirations, experience timeline, tabbed technical skills, certifications, hobbies |
| Projects | `projects.html` | Real projects: COS102 toolkit, Reonr, Laravel Livewire Select Component, Expense Tracker, Tontrends |
| Academic Planner | `planner.html` | Add/complete/delete task manager, persisted to `localStorage` |
| Contact | `contact.html` | Contact form with client-side validation |

## Stack

- Static HTML/CSS/JS, one shared `css/styles.css` and a few `js/*.js` files
- Dark mode via CSS custom properties (`--bg`, `--surface`, `--text`, etc.) and a `data-theme` attribute, no utility framework
- `nginx:alpine` to serve it (see `Dockerfile` / `docker-compose.yml`)

## Running locally

```bash
docker compose up -d --build
```

Serves on `http://localhost:8080`. If you have the project's Traefik `proxy` network running (see `docker-compose.yml` labels), it's also reachable at `https://cos106.localhost`.

To stop:

```bash
docker compose down
```

## Project structure

```
├── index.html, about.html, projects.html, planner.html, contact.html
├── css/styles.css
├── js/
│   ├── main.js       # nav, theme toggle, click sound, entry gate, skills tabs
│   ├── planner.js    # academic planner CRUD + localStorage
│   └── contact.js    # contact form validation
├── assets/
│   ├── images/       # photos, logos, project thumbnails, og-image.jpg
│   ├── audio/        # click.mp3 (synthesized UI sound)
│   ├── video/        # wow.mp4 (bowling clip), intro.mp4 pending
│   ├── code/cos102/  # real Python source for the COS102 project card
│   └── data/         # tasks.json — preinstalled Academic Planner goals
├── Dockerfile, docker-entrypoint-site.sh, docker-compose.yml, .dockerignore, .htaccess
├── robots.txt, sitemap.xml
├── AI.README.md, llms.txt   # crawler-facing summary for AI systems (mirrors each other)
├── CLAUDE.md                # repo-editing guardrails for AI coding assistants
```

## SEO

Every page carries a description, canonical link, and Open Graph/Twitter Card
tags (shared `assets/images/og-image.jpg`, a screenshot of the homepage entry
gate). `<meta name="robots" content="index, follow">` is set site-wide —
search engines and AI crawlers are welcome to index and rank this site.

`robots.txt` sets `Allow: /` for everyone (including AI crawlers) and points
to `sitemap.xml`, which lists all five pages. `AI.README.md` and `llms.txt` (identical content, two filenames for
compatibility — the latter is the emerging convention AI crawlers look for
by default) give AI systems accurate, non-sensitive context about Samuel and
the site to answer questions with, without needing to guess at anything
private.

Every page's HTML has `{{SITE_URL}}` in place of a real domain for the
canonical link and every Open Graph/Twitter `image`/`url` tag — see
[Site URL substitution](#site-url-substitution) below for how that gets
filled in for real. Until it's deployed somewhere publicly reachable over
HTTPS, link previews on WhatsApp/Instagram/Facebook won't render at all —
those crawlers can't reach `localhost` or a LAN-only Traefik host no matter
what the tags say.

## Site URL substitution

`docker-entrypoint-site.sh` runs before nginx starts and replaces every
`{{SITE_URL}}` in the built HTML with the `SITE_URL` environment variable
(`docker-compose.yml`), so the actual HTML nginx serves has real absolute
URLs baked in — this has to happen server-side since link-preview crawlers
don't execute JavaScript. Defaults to `https://cos106.localhost` for local
dev; override it for a real deployment:

```bash
SITE_URL=https://your-real-domain.com docker compose up -d --build
```

The `{{SITE_URL}}` tokens in the source `.html` files themselves are never
modified — only the copy inside the running container is.

## Security headers

Production security headers (CSP, Permissions-Policy, HSTS, etc.) are
configured server-side only, outside this repo — not duplicated here.

Content-wise, this repo is already CSP-friendly regardless of exact policy:
`js/theme-init.js` is a separate file rather than an inline `<head>` script,
and there are no inline `style="..."` attributes anywhere in the HTML — use
the `.link-gold` / `.card-actions` utility classes (or add a new one)
instead of reaching for an inline style.

## Academic Planner data

`assets/data/tasks.json` holds the preinstalled starter goals for the
planner — it's fetched once to seed a genuinely first visit. From then on,
`js/planner.js` reads and writes the live list to the browser's
`localStorage`, same as any task you add yourself. If the JSON file can't be
fetched, a small hardcoded fallback list keeps the planner from ever loading
empty.

## Known placeholders

A couple of pieces are still pending real content:

- **Telegram and Facebook** social links (`{{SOCIAL_TELEGRAM_URL}}`, `{{SOCIAL_FACEBOOK_URL}}` in the footer of every page) — Facebook's link is commented out until it's ready.
- **Intro video** — the homepage entry gate uses a CSS-animated placeholder; a real `assets/video/intro.mp4` can be dropped in and the `<video>` tag in `index.html` uncommented.
- **Flutter certification** — listed on the About page pending the certificate details.
