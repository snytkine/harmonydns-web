/**
 * Turns the path the site is served under into Vite's `base`: always a leading and a trailing slash.
 * GitHub Pages serves a project site under `/<repository>/` and a custom domain from the root, so the
 * deploy workflow passes `actions/configure-pages`'s `base_path` (empty on a custom domain) in.
 */
export function resolveBase(basePath: string | undefined): string {
  const trimmed = (basePath ?? '').replace(/^\/+|\/+$/g, '');
  return trimmed === '' ? '/' : `/${trimmed}/`;
}
