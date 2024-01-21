'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './styles.module.css';

function getTitle(pathname: string): string | null {
  if (pathname.startsWith('/archives')) {
    return 'Archives';
  }
  if (pathname.startsWith('/cs-stuff')) {
    return 'CS Stuff';
  }
  return null;
}

export default function Navbar() {
  const pathname = usePathname();
  const title = getTitle(pathname);
  return (
    <nav className={styles.navbar}>
      <section
        className={
          styles.container + (pathname === '/' ? ` ${styles.centered}` : '')
        }
      >
        {title && <h1>{title}</h1>}
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/archives">Archives</Link>
          </li>
          <li>
            <Link href="/cs-stuff">CS Stuff</Link>
          </li>
        </ul>
      </section>
    </nav>
  );
}
