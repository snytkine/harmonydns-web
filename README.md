# Harmony DNS website

The marketing site for Harmony DNS, a macOS app that serves your own DNS zones and forwards everything
else to a secure upstream DNS server. React + TypeScript single-page app built with Vite and hosted on
GitHub Pages.

## Development

```sh
npm install      # also installs the pre-commit hook
npm run dev      # local dev server
npm run check    # type-check, lint, formatting, tests with the 90% coverage gate
npm run build    # production build in dist/
```

## Editing content

- Page text lives in Markdown under `src/content` (one file per page, plus the home page cards in
  `src/content/cards`).
- Show an app screenshot in any Markdown file with `![Caption](screenshot:<id>)`; the ids are listed in
  `src/config/screenshots.ts`. Images written on consecutive lines of one paragraph sit side by side.
  Clicking a screenshot opens the large version.
- Navigation, the site name and the App Store link are in `src/config/site.ts`.
- Colors and spacing are CSS custom properties in `src/styles/global.css` (light and dark).

## Deployment

`.github/workflows/deploy.yml` builds and deploys to GitHub Pages only for commits on `main` (direct
pushes or merges). Work happens on `develop`. GitHub Pages must be enabled in the repository settings
with **GitHub Actions** as the source.
