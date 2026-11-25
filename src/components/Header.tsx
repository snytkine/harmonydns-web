import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { navItems, site } from '../config/site';
import type { Theme } from '../hooks/useTheme';
import { GlassIcon } from './GlassIcon';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  readonly theme: Theme;
  readonly onToggleTheme: () => void;
}

export function Header({ theme, onToggleTheme }: HeaderProps) {
  return (
    <header className="toolbar">
      <div className="toolbar__title">
        <span className="traffic-lights" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <Link to="/" className="brand">
          <img className="brand__logo" src={logo} alt="" width="28" height="28" />
          {site.name}
        </Link>
      </div>

      <nav className="nav" aria-label="Main">
        {navItems.map((item) => (
          <NavLink key={item.path} to={item.path} end={item.path === '/'} className="nav__item">
            <GlassIcon name={item.icon} />
            <span data-short={item.shortLabel}>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
    </header>
  );
}
