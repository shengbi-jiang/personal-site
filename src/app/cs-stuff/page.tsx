import Link from 'next/link';
import Container from '@/components/Container/Container';
import type Item from './item';
import getPostHierarchy from './get-post-hierarchy';
import styles from './styles.module.css';

function ItemComponent({ item }: { item: Item }) {
  const hasChildren = item.children.length >= 1;
  return (
    <li>
      {item.hasContent ? (
        <p>
          <Link href={`/cs-stuff/${item.segments.join('/')}`}>{item.name}</Link>
        </p>
      ) : (
        <p>{item.name}</p>
      )}
      {hasChildren && (
        <ul>
          {item.children.map((child) => (
            <ItemComponent key={child.name} item={child} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default async function Page() {
  const root = await getPostHierarchy();
  return (
    <Container as="section">
      <p>Posts and gadgets related to computer science stuff placed here!</p>
      <nav className={styles.hierarchy}>
        <ul>
          {root.children.map((child) => (
            <ItemComponent key={child.name} item={child} />
          ))}
        </ul>
      </nav>
    </Container>
  );
}
