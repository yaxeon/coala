import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  variant?: string;
}

export default function Overlay({ children, variant = '' }: Props) {
  const classes = ['overlay', variant && `overlay--${variant}`].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <div className="overlay__backdrop" />
      <div className="overlay__content">{children}</div>
    </div>
  );
}
