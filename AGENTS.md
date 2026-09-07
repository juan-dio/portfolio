# AGENTS.md

## Overview
Static portfolio website for Juan Dio. Pure vanilla HTML5, CSS3, and JavaScript with no build steps, bundlers, or package manager dependencies.

## Architecture & File Structure
- `index.html`: Main single-page entry point with static layout; projects grid (`#projects-grid`) is populated dynamically.
- `project-detail.html`: Dynamic project detail page rendering project info based on URL query parameters (`?id=<slug>`).
- `scripts/script.js`: Core client-side interactions (splash screen, navbar toggle, scroll spy, typing animation, CV modal, audio player, dynamic project cards rendering).
- `scripts/projects-data.js`: Centralized array of project data objects used by both index cards and detail pages.
- `scripts/project-detail.js`: Client-side logic for parsing query params and rendering individual project details dynamically.
- `styles/style.css`: Aggregator stylesheet importing modular CSS files (`dashboard.css`, `about.css`, `projects.css`, `footer.css`, etc.).
- `assets/`: Static media including fonts (`Poppins`), project screenshots (`images/projects/<slug>/`), PDFs (`documents/`), and background audio tracks (`musics/`).
- `old/`: Deprecated previous version. Do not modify or reference.

## Project Data Schema & Link Behavior
Projects in `scripts/projects-data.js` contain:
- `id`, `title`, `subtitle`, `category`, `image`, `images` (array), `repoUrl`, `liveUrl`, `figmaUrl` (optional), `description`, `highlights` (array), `techStack` (array).
- **Categories**: `"Uni Project"`, `"Intern Project"`, and `"Dummy Project"`. Each has a dedicated SVG icon handled in `scripts/script.js` and `scripts/project-detail.js`.
- **Figma Designs**: When `figmaUrl` is set and `repoUrl`/`liveUrl` are empty, both index cards and detail pages conditionally render a single dark Figma button instead of Repo and Live Demo buttons.

## Development & Verification
- No build or compilation step required.
- Serve locally using static HTTP server (`python -m http.server`, `npx serve .`, or VS Code Live Server).
- Validate JS syntax after edits: `node -c scripts/projects-data.js; node -c scripts/script.js; node -c scripts/project-detail.js`.

## Conventions & Rules
- Do not introduce npm/node dependencies or build tooling unless explicitly requested.
- Maintain CSS modularity by editing specific feature stylesheets in `styles/` rather than dumping styles into `style.css`.
- Keep script additions vanilla JavaScript (`scripts/script.js` or feature-specific scripts).
- When adding or updating projects, only edit `scripts/projects-data.js` (and add media in `assets/images/projects/`). Cards and detail pages render automatically.
- Maintain OpenGraph/Twitter meta tags in `index.html` using `assets/images/16_9.png`.
