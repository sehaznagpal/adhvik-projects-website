import React from 'react';
import { Clients } from '../components/Clients';
import { Categories } from '../components/Categories';
import { AboutIntro } from '../components/AboutIntro';
import { Gallery } from '../components/Gallery';
import { Hero } from '../components/Hero';

interface HomeProps {
  onNavigate: (path: string) => void;
  introDone?: boolean;
}

export const Home: React.FC<HomeProps> = ({ introDone = true }) => {
  return (
    <main className="w-full">
      <Hero introDone={introDone} />

      {/* INFINITE TICKER MARQUEE */}
      <section className="my-4 md:my-8">
        <Clients />
      </section>

      <AboutIntro />

      <Categories />

      <Gallery />
    </main>
  );
};
