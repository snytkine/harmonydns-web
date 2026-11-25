import { site } from '../config/site';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const years =
    currentYear > site.copyrightStartYear
      ? `${site.copyrightStartYear} - ${currentYear}`
      : `${site.copyrightStartYear}`;

  return (
    <footer className="footer">
      Copyright © {years} {site.name}
    </footer>
  );
}
