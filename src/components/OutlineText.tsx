import React from 'react';
import { cn } from '@/lib/utils';

interface OutlineTextProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'div';
}

export default function OutlineText({
  children,
  className,
  as: Component = 'span',
}: OutlineTextProps) {
  return (
    <Component
      className={cn(
        'font-display uppercase tracking-tight text-transparent select-none',
        'outline-text-stroke',
        className
      )}
    >
      {children}
    </Component>
  );
}
