/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Loader } from './components/Loader';
import { HERO_IMAGES } from './components/Hero';
import { TAGLINE, SITE_NAME } from './data/brand';

const INTRO_KEY = 'adhvik-intro-seen';
const HERO_SRCS = HERO_IMAGES.map((i) => i.src);

function shouldShowIntro(): boolean {
  const h = window.location.hash.replace(/^#\/?/, '').trim();
  if (h) return false;
  try {
    if (sessionStorage.getItem(INTRO_KEY)) return false;
    sessionStorage.setItem(INTRO_KEY, '1');
  } catch (e) {
    // Storage blocked: still show it, once per page load
  }
  return true;
}

type Section = 'what-we-build' | 'gallery';

function parseHash(hash: string): { path: string; scrollTo?: Section } {
  const clean = hash.replace(/^#\/?/, '').trim();
  if (clean === 'work') return { path: '/', scrollTo: 'what-we-build' };
  // Old project pages and the old work grid now live in the gallery
  if (clean === 'gallery' || clean.startsWith('work/')) return { path: '/', scrollTo: 'gallery' };
  if (clean === 'about') return { path: '/about' };
  if (clean === 'contact') return { path: '/contact' };
  return { path: '/' };
}

export default function App() {
  const [route, setRoute] = useState(() => parseHash(window.location.hash));
  const [showIntro, setShowIntro] = useState(shouldShowIntro);
  const handleIntroDone = useCallback(() => setShowIntro(false), []);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('adhvik-theme');
      if (saved === 'dark' || saved === 'light') return saved;
    } catch (e) {
      // Fallback to light
    }
    return 'light';
  });

  // Sync dark class on documentElement and persist in localStorage
  useEffect(() => {
    try {
      localStorage.setItem('adhvik-theme', theme);
    } catch (e) {
      // Ignore localStorage errors
    }

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Page title per route
  useEffect(() => {
    let title = `${SITE_NAME} | ${TAGLINE.replace(/\.$/, '')}`;
    if (route.path === '/about') title = `About | ${SITE_NAME}`;
    else if (route.path === '/contact') title = `Contact | ${SITE_NAME}`;
    document.title = title;
  }, [route]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  // Sync hash changes (and send old /work/* links to the gallery)
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash.replace(/^#\/?/, '').startsWith('work/')) {
        window.history.replaceState(null, '', '#gallery');
      }
      setRoute(parseHash(window.location.hash));
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Scroll to the requested section, or to the top on a plain page change
  useEffect(() => {
    if (!route.scrollTo) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    const id = route.scrollTo;
    const t = setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 150);
    return () => clearTimeout(t);
  }, [route]);

  // Programmatic navigation: a path, or a home section to scroll to
  const navigate = useCallback((path: string, section?: 'work' | 'gallery') => {
    if (section) {
      window.location.hash = `#${section}`;
      // Same hash again (already there): hashchange will not fire, so scroll directly
      if (route.path === '/' && route.scrollTo === (section === 'work' ? 'what-we-build' : 'gallery')) {
        document
          .getElementById(section === 'work' ? 'what-we-build' : 'gallery')
          ?.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    window.location.hash = path === '/' ? '#/' : `#${path.startsWith('/') ? path : '/' + path}`;
  }, [route]);

  return (
    <div className="app-root min-h-screen flex flex-col bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-300">
      {showIntro && <Loader imageSrcs={HERO_SRCS} onDone={handleIntroDone} />}

      {/* Navigation on every page */}
      <Navigation
        currentPath={route.path}
        theme={theme}
        onToggleTheme={toggleTheme}
        onNavigate={navigate}
      />

      {/* Main Content Router */}
      <div className="flex-1">
        {route.path === '/' && <Home onNavigate={navigate} introDone={!showIntro} />}
        {route.path === '/about' && <About />}
        {route.path === '/contact' && <Contact />}
      </div>

      {/* Footer on every page */}
      <Footer onNavigate={navigate} />
    </div>
  );
}
