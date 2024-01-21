import type { PropsWithChildren } from 'react';
import Navbar from '@/components/Navbar/Navbar';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
}
