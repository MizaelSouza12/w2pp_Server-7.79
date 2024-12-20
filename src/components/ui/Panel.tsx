import { ReactNode } from 'react';

interface PanelProps {
  children: ReactNode;
  className?: string;
}

export function Panel({ children, className = '' }: PanelProps) {
  return (
    <div className={`bg-gradient-to-b from-gray-800/90 to-gray-900/90 border-2 border-amber-900/50 rounded-lg shadow-xl backdrop-blur-sm p-4 ${className}`}>
      {children}
    </div>
  );
}