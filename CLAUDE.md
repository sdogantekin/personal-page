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
