import React from 'react';

interface WordmarkProps {
  className?: string;
  animated?: boolean;
  showLine?: boolean;
}

export const Wordmark: React.FC<WordmarkProps> = ({
  className = '',
  animated = false,
  showLine = false,
}) => (
  <span
    className={`wordmark inline-flex items-baseline whitespace-nowrap leading-none ${animated ? 'wordmark-animated' : ''} ${className}`}
  >
    <span className="wordmark-a font-heading-plain">ADHVIK</span>
    {showLine ? (
      <span className="wordmark-line" aria-hidden="true" />
    ) : (
      <span aria-hidden="true">&nbsp;</span>
    )}
    <span className="wordmark-p font-serif-light">PROJECTS</span>
  </span>
);
