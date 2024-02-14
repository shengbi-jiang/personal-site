import type { PropsWithChildren } from 'react';
import Navbar from '@/components/Navbar/Navbar';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <main style={{ paddingBottom: '2rem', minHeight: '100vh' }}>
      <Navbar />
      <article style={{ marginTop: '0.5rem' }}>{children}</article>
    </main>
  );
}
