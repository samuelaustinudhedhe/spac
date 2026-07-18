# Samuel Austin Udhedhe — Student Portfolio & Academic Planner

COS106 (Introduction to Web Technologies) term project for MIVA Open University. A five-page personal portfolio and academic planner built with plain HTML, CSS, and JavaScript — no frameworks, no build step.

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
│   ├── images/       # photos, logos, project thumbnails
│   ├── audio/        # click.mp3 (synthesized UI sound)
│   ├── video/        # wow.mp4 (bowling clip), intro.mp4 pending
│   └── code/cos102/  # real Python source for the COS102 project card
├── Dockerfile, docker-compose.yml, .dockerignore
```

## Known placeholders

A couple of pieces are still pending real content:

- **Telegram and Facebook** social links (`{{SOCIAL_TELEGRAM_URL}}`, `{{SOCIAL_FACEBOOK_URL}}` in the footer of every page) — Facebook's link is commented out until it's ready.
- **Intro video** — the homepage entry gate uses a CSS-animated placeholder; a real `assets/video/intro.mp4` can be dropped in and the `<video>` tag in `index.html` uncommented.
- **Flutter certification** — listed on the About page pending the certificate details.
