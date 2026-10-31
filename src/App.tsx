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
import { ProjectDetail } from './pages/ProjectDetail';
import { Loader } from './components/Loader';
import { HERO_IMAGES } from './pages/Home';
import { PROJECTS } from './data/projects';
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

function parseHash(hash: string): { path: string; slug?: string; isWorkScroll?: boolean } {
  const clean = hash.replace(/^#\/?/, '').trim();
  if (!clean || clean === '') {
    return { path: '/' };
  }
  if (clean === 'work') {
    return { path: '/', isWorkScroll: true };
  }
  if (clean === 'about') {
    return { path: '/about' };
  }
  if (clean === 'contact') {
    return { path: '/contact' };
  }
  if (clean.startsWith('work/')) {
    const slug = clean.replace('work/', '');
    return { path: `/work/${slug}`, slug };
  }
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
    else if (route.slug) {
      const project = PROJECTS.find((p) => p.slug === route.slug);
      title = project ? `${project.name} | ${SITE_NAME}` : `Project | ${SITE_NAME}`;
    }
    document.title = title;
  }, [route]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  // Sync hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const parsed = parseHash(window.location.hash);
      setRoute(parsed);
      if (parsed.isWorkScroll) {
        setTimeout(() => {
          const el = document.getElementById('work');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Handle programmatic navigation
  const navigate = useCallback((path: string, scrollToWork: boolean = false) => {
    if (scrollToWork) {
      if (route.path === '/') {
        const el = document.getElementById('work');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
        window.history.pushState(null, '', '#work');
      } else {
        window.location.hash = '#work';
      }
      return;
    }

    if (path === '/') {
      window.location.hash = '#/';
    } else {
      window.location.hash = `#${path.startsWith('/') ? path : '/' + path}`;
    }
  }, [route.path]);

  // Initial scroll to #work if page was opened with #work
  useEffect(() => {
    if (route.isWorkScroll) {
      setTimeout(() => {
        const el = document.getElementById('work');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }
  }, [route.isWorkScroll]);

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
        {route.slug && <ProjectDetail slug={route.slug} onNavigate={navigate} />}
      </div>

      {/* Footer on every page */}
      <Footer onNavigate={navigate} />
    </div>
  );
}
