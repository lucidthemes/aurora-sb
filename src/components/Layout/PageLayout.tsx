import type { ReactNode } from 'react';

import Container from '@components/Layout/Container';

export function PageLayout({ children, fullWidth = false }: { children: ReactNode; fullWidth?: boolean }) {
  if (!fullWidth) return <Container>{children}</Container>;

  if (fullWidth) return <div className="flex flex-col">{children}</div>;
}

export function PageSidebarLayout({
  content,
  sidebar,
  sidebarPosition = 'right',
}: {
  content?: ReactNode;
  sidebar?: ReactNode;
  sidebarPosition?: 'left' | 'right';
}) {
  const isLeft = sidebarPosition === 'left';

  return (
    <Container>
      <div className={`flex flex-col gap-10 ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
        <div className="basis-3/4">{content}</div>
        <div className="basis-1/4">{sidebar}</div>
      </div>
    </Container>
  );
}

export function PageSidebarLayoutLoading({
  content,
  sidebarPosition = 'right',
}: {
  content?: ReactNode;
  sidebarPosition?: 'left' | 'right';
}) {
  const isLeft = sidebarPosition === 'left';

  return (
    <Container>
      <div className={`flex flex-col gap-10 ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
        <div className="basis-3/4">{content}</div>
        <div className="basis-1/4">
          <div className="h-screen w-full animate-pulse rounded-md bg-white"></div>
        </div>
      </div>
    </Container>
  );
}
