import React from 'react';

interface WordmarkProps {
  className?: string;
  animated?: boolean;
}

export const Wordmark: React.FC<WordmarkProps> = ({ className = '', animated = false }) => (
  <span
    className={`wordmark inline-flex items-baseline whitespace-nowrap leading-none ${animated ? 'wordmark-animated' : ''} ${className}`}
  >
    <span className="wordmark-a font-heading-plain">Adhvik</span>
    <span className="wordmark-line" aria-hidden="true" />
    <span className="wordmark-p font-serif-light">projects</span>
  </span>
);
