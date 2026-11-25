import { Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { PageTransition } from './components/PageTransition';
import { useTheme } from './hooks/useTheme';
import { HomePage } from './pages/HomePage';
import { MarkdownPage } from './pages/MarkdownPage';
import documentation from './content/documentation.md?raw';
import features from './content/features.md?raw';
import notFound from './content/not-found.md?raw';
import privacy from './content/privacy.md?raw';
import support from './content/support.md?raw';

export function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="app">
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main className="main">
        <PageTransition>
          {(location) => (
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/features" element={<MarkdownPage content={features} />} />
              <Route path="/documentation" element={<MarkdownPage content={documentation} />} />
              <Route path="/support" element={<MarkdownPage content={support} />} />
              <Route path="/privacy" element={<MarkdownPage content={privacy} />} />
              <Route path="*" element={<MarkdownPage content={notFound} />} />
            </Routes>
          )}
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}
