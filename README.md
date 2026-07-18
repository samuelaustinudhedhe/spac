# Samuel Austin Udhedhe — Student Portfolio & Academic Planner

A five-page student portfolio and academic planner for Samuel Austin Udhedhe, a Software Engineering student at MIVA Open University and founder of [Reonr](https://reonr.com). Built with plain HTML, CSS, and JavaScript — no frameworks, no build step.

Live at [cos106.localhost](https://cos106.localhost) (local Traefik) or `http://localhost:8080` (direct), once the container is running.

## Pages

| Page | File | What's there |
|---|---|---|
| Home | `index.html` | Entry gate (speech-synthesis welcome), hero, stats strip, bowling video |
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

Serves on `http://localhost:8080`. If you have the project's Traefik `proxy` network running (see `docker-compose.yml` labels), it's also reachable at `https://mrsau.localhost`.

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
├── Dockerfile, docker-compose.yml, .dockerignore, .htaccess
```

## SEO

Every page carries a description, canonical link, and Open Graph/Twitter Card
tags (shared `assets/images/og-image.jpg`, a screenshot of the homepage entry
gate). `<meta name="robots" content="noindex, nofollow">` is set site-wide on
purpose — this is a coursework/practice site, not meant to be indexed by
search engines.

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
- **Site URL** (`{{SITE_URL}}` in the canonical/Open Graph/Twitter meta tags on every page) — swap in the real production domain once one exists.
- **Intro video** — the homepage entry gate uses a CSS-animated placeholder; a real `assets/video/intro.mp4` can be dropped in and the `<video>` tag in `index.html` uncommented.
- **Flutter certification** — listed on the About page pending the certificate details.
