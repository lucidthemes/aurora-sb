import type { ReactNode } from 'react';

export default function WidgetTitle({ align = 'left', children }: { align?: 'left' | 'center'; children: ReactNode }) {
  if (!children) return null;

  const alignClass = align === 'center' ? 'justify-items-center' : '';

  return (
    <h3 className={`mb-6 text-sm tracking-xwide text-shark uppercase after:mt-3.5 after:block after:h-0.25 after:w-10 after:bg-shark ${alignClass}`}>
      {children}
    </h3>
  );
}
