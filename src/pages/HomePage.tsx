import { Link } from 'react-router-dom';
import { GlassIcon } from '../components/GlassIcon';
import { Markdown } from '../components/Markdown';
import { APP_STORE_URL, type IconName } from '../config/site';
import home from '../content/home.md?raw';
import homeScreenshot from '../content/home-screenshot.md?raw';
import featuresCard from '../content/cards/features.md?raw';
import getTheAppCard from '../content/cards/get-the-app.md?raw';
import howItWorksCard from '../content/cards/how-it-works.md?raw';

interface HomeCard {
  readonly icon: IconName;
  readonly content: string;
  readonly to: string;
  readonly linkLabel: string;
  readonly external?: boolean;
}

const cards: readonly HomeCard[] = [
  { icon: 'features', content: featuresCard, to: '/features', linkLabel: 'Explore features' },
  { icon: 'how-it-works', content: howItWorksCard, to: '/documentation', linkLabel: 'Read the documentation' },
  { icon: 'app-store', content: getTheAppCard, to: APP_STORE_URL, linkLabel: 'Open the App Store', external: true },
];

export function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero__text prose">
          <Markdown content={home} />
          <div className="hero__actions">
            <a className="button button--primary" href={APP_STORE_URL} target="_blank" rel="noreferrer noopener">
              Get the App
            </a>
            <Link className="button" to="/features">
              See features
            </Link>
          </div>
        </div>
        <div className="hero__shot">
          <Markdown content={homeScreenshot} />
        </div>
      </section>

      <section className="cards" aria-label="Overview">
        {cards.map((card) => (
          <div className="glass card" key={card.to}>
            <GlassIcon name={card.icon} size="large" />
            <div className="card__body">
              <Markdown content={card.content} />
            </div>
            {card.external ? (
              <a className="card__link" href={card.to} target="_blank" rel="noreferrer noopener">
                {card.linkLabel} <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <Link className="card__link" to={card.to}>
                {card.linkLabel} <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>
        ))}
      </section>
    </>
  );
}
