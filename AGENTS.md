# AGENTS.md

## Overview
Static portfolio website for Juan Dio. Pure vanilla HTML5, CSS3, and JavaScript with no build steps, bundlers, or package manager dependencies.

## Architecture & File Structure
- `index.html`: Main single-page entry point.
- `project-detail.html`: Dynamic project detail page rendering project info based on URL query parameters (`?id=<slug>`).
- `scripts/script.js`: Core client-side interactions (navbar toggle, scroll spy, typing animation, modals, audio player).
- `scripts/projects-data.js`: Centralized array of project data objects used by both index cards and detail pages.
- `scripts/project-detail.js`: Client-side logic for parsing query params and rendering individual project details dynamically.
- `styles/style.css`: Aggregator stylesheet importing modular CSS files:
  - `styles/base.css`: Global resets, CSS variables, typography, utility classes.
  - `styles/navbar.css`, `dashboard.css`, `about.css`, `experience.css`, `skills.css`, `projects.css`, `footer.css`, `modal.css`, `music.css`, `project-detail.css`, `animations.css`.
- `assets/`: Static media including fonts (`Poppins`), project thumbnails (`images/`), PDFs (`documents/`), and background audio tracks (`musics/`).
- `old/`: Deprecated previous version of the portfolio. Do not modify or reference for production updates.

## Development & Serving
- No build or compilation step required.
- Serve locally using any static HTTP server (e.g. VS Code Live Server, `python -m http.server`, or `npx serve .`).
- Open `index.html` directly in modern web browsers.

## Conventions & Rules
- Do not introduce npm/node dependencies or build tooling unless explicitly requested.
- Maintain CSS modularity by editing specific feature stylesheets in `styles/` rather than dumping styles into `style.css`.
- Keep script additions vanilla JavaScript (`scripts/script.js` or feature-specific scripts).
- When adding or updating projects, update both `scripts/projects-data.js` and project card links in `index.html`.
