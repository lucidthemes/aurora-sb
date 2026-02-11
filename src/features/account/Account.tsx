import type { ReactNode } from 'react';

import Nav from './components/Nav';

export default function Account({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-10 md:flex-row">
      <Nav />
      <div className="max-h-fit basis-3/4 gap-y-5 rounded-md bg-white p-5 md:p-7.5 lg:p-10">{children}</div>
    </div>
  );
}
