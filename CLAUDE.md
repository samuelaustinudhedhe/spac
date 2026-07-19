# Repository Guidelines for AI Coding Assistants

Instructions for any AI assistant (Claude Code, ChatGPT, Copilot, etc.)
making changes in this repository. For crawler-facing content about Samuel
and the site itself, see `AI.README.md` / `llms.txt` instead — this file is
about editing the repo, not describing it.

## What this project is

A five-page static portfolio and academic planner for Samuel Austin
Udhedhe — see `README.md` for the full technical rundown (stack, structure,
how to run it locally).

## Hard rule: no private credentials or secrets — ever

This is a **public repository and a publicly hosted site**. Never add,
restore, reintroduce, or otherwise expose any of the following anywhere in
this project — HTML, JS, JSON, images, comments, commit messages, or
anywhere else a user or crawler could read it:

- Matric number or student ID (deliberately removed from `about.html` —
  do not add them back, even if asked to "restore missing fields" or
  "fill in the education table")
- National ID, passport, or any government-issued identifier
- Home address
- Bank details, payment credentials, or financial information
- Passwords, API keys, tokens, or any other secret/credential
- Any other personal identifier that isn't already intentionally public

If a request would reintroduce any of the above, decline and explain why,
even if it looks like routine "fill in the blank" or "restore this row"
work — confirm explicitly with Samuel first.

## What's already intentionally public

The Contact page email, phone number, and the social links in the footer
(Instagram, WhatsApp, GitHub, LinkedIn) are deliberately public — they're
there so people can reach Samuel. No need to redact or question those
unless explicitly asked to.
