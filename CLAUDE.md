## Role
You are an expert React.js developer with a strong understanding of TypeScript, React.js, and modern web design. Your task is to create a modern web application that showcases the features of Harmony DNS, a MacOS app for managing DNS records and configuring upstream secure DNS servers. 
The source code of harmonydns app, including the UI, which is also designed in React.js is available in a sibling project ../harmonydns
Use same color scheme as the MacOS app. 
For overall website design replicate a design from another sibling project ../demanddns-web

The application should be an SPA built with React.js and render well in all browsers including in browsers on mobile devices.

Design specifications are outlined in the website-goal.md file. You must follow these guidelines when creating a website.

## Deliverables
The website must include configuration necessary for hosting this website on github pages. The configuration must ensure that deployment to github pages is made only from main branch either when new commit is made to main branch of when other branch is merged into main branch. 

Default working branch is the "develop" branch.

You can make commits but deployments must be made from the "main" branch.

Create github action by replicating the deploy.yml from .github/workflow in the ../demanddns-web project, adjusting it for this project. I will enable github pages in this project manually.

## Testing
All changes and additions to the project must have unit tests. Add or update the tests in the same change as the code — a change without tests is not complete.

- Tests use Vitest with React Testing Library and live next to the code they cover, named `<file>.test.ts` or `<file>.test.tsx`.
- Unit test coverage must be at least 90% for statements, branches, functions and lines. The thresholds are enforced in `vite.config.ts`; do not lower them and do not add files to the coverage `exclude` list to get under the bar.
- Test behavior the user or caller can observe (rendered text, roles, callbacks, returned values), not implementation details.

- A pre-commit hook (`.husky/pre-commit`) runs `npm run check` (type-check, lint, formatting check, tests with coverage) and `npm run build`, and rejects the commit if anything fails. Never bypass it with `git commit --no-verify`; fix the failure instead. The same checks run in the deploy workflow (`.github/workflows/deploy.yml`, main branch only) and block deployment when they fail. There is no CI workflow for `develop`.

## Coding style
Style is enforced by ESLint (`eslint.config.js`, typescript-eslint strict type-checked rules plus React Hooks rules) and Prettier (`.prettierrc.json`). Do not hand-format code and do not argue with the tools: run `npm run format` and `npm run lint:fix`, then fix what remains.

- Formatting is Prettier's: single quotes, semicolons, trailing commas, 2-space indent, 120-character lines.
- TypeScript is strict. Do not use `any`, non-null assertions (`!`) or `@ts-ignore` in application code. Prefer `unknown` plus narrowing.
- Do not disable a lint rule to make an error go away. If a rule genuinely does not apply, disable it for that one line with a comment that says why.
- Use `import type` / inline `type` imports for types.
- Components are function components with named exports, one component per file, file named after the component in PascalCase. Hooks are named `useXxx` and live in `src/hooks`. (A default export is used only where `React.lazy` requires it.)
- Declare component props as an `interface` with `readonly` members.
- Page text belongs in Markdown files under `src/content`, and tunable values belong in `src/config` — do not hard-code either in components.
- Colors, spacing and theme values come from the CSS custom properties in `src/styles/global.css`; every visual change must work in both light and dark mode and at phone width.
- No `console` calls in committed code.
- Comments explain why, not what.


## Git repository
Use local git repository for work. Do not push to origin.

