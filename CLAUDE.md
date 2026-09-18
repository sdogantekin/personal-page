# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Serkan Dogantekin's personal website: a single-page site (About / Resume / Projects / Writing / Contact) with hash-based client-side routing and a small easter-egg game in the footer. Plain HTML/CSS/JS — no build step, no framework, no dependencies.

## Running locally

There is no build step. Serve the directory with any static file server, e.g.:

```
python3 -m http.server 8934
```

Then open `http://localhost:8934/index.html`.

## Architecture

- `index.html` — markup for all five "pages," each a `<section class="page" id="page-*">`. Only one is visible at a time (`.page.active`), toggled by `app.js` based on `location.hash`.
- `style.css` — all styling, using CSS custom properties in `:root` (`--bg`, `--fg`, `--accent`, etc.) for the color palette. Colors are defined in OKLCH.
- `app.js` — single IIFE handling three things:
  - **Router**: `applyRoute()` reads `location.hash`, shows the matching `.page`, updates the active nav link. Runs on load and on `hashchange`.
  - **Resume rendering**: `timelineData` and `skillGroups` arrays are the single source of truth for work history and skills; `renderTimeline()`/`renderSkillGroups()` build the DOM from them on load. Edit the data arrays, not the DOM structure, to update resume content.
  - **Footer game**: a small physics-based endless-runner (jump over cacti/arrows) rendered by direct DOM manipulation on a `setInterval` game loop (`step()`), gated behind a "psst, bored?" toggle. Closes itself on tab blur/hide or navigation away from the page.
- `assets/` — static files served as-is (currently the downloadable résumé PDF).

## Content source

The design originates from a Claude Design canvas project ("Personal Website Design Plan"). This repo is a hand-written static reimplementation of that design — not a build output — so edits here don't sync back automatically.

## Deployment

- **Live at:** https://serkandogantekin.com
- **Hosting:** Vercel, project `personal-page` under the `yoshi-f34b` team (same team as `cv-butler` and `quiz-project`). Domain DNS is proxied through Cloudflare in front of Vercel.
- **GitHub:** `sdogantekin/personal-page` (public). Vercel is not connected to auto-deploy on push — `vercel git connect` previously failed silently; deploys are manual.
- **To deploy:** after pushing to `main`, run `npx --yes vercel deploy --prod --yes` from the repo root (already linked via `.vercel/project.json`). Occasionally fails with a transient "Not authorized" right after the CLI auto-updates mid-command — just retry, it's not a real auth problem (confirmed via `vercel whoami` / `vercel project ls`).
- **Analytics:** GA4 (`G-P1Z1BTKGMQ`), inline `gtag.js` snippet in `index.html`. Custom events (defined in `app.js`): `page_view` on section navigation, `resume_download`, `cv_butler_try`/`cv_butler_github`, `contact_email`/`contact_linkedin`/`contact_medium`/`contact_github`, `footer_game_open`/`footer_game_start`/`footer_game_high_score`. Wired via `data-ga` attributes + one delegated click listener, plus explicit calls at the game/router call sites.

## Working notes

- **Browser caching bites during local dev**: a plain `python3 -m http.server` + repeated edits often serves stale `style.css`/`app.js` to an already-open tab, even after a hash-URL reload — the browser caches the JS/CSS subresources independently of the HTML. If a change doesn't seem to apply when testing in Chrome, don't assume the code is wrong — restart the server on a fresh port and/or open a brand-new tab before concluding there's a bug.
- **Footer game testing**: Chrome throttles `setInterval` heavily in backgrounded/automated tabs, making real-time playthroughs unreliable for verification. To test deterministically, override `window.setInterval`/`clearInterval` to capture the tick callback and invoke it synchronously in a loop instead of waiting on wall-clock time.
