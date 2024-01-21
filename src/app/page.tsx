import Image from 'next/image';
import TempleImage from '@/images/temple.jpg';
import Navbar from '@/components/Navbar/Navbar';
import Container from '@/components/Container/Container';
import IntroductionMdx from './introduction.mdx';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <header className={styles.backgroundImageContainer}>
        <Image
          className={styles.backgroundImage}
          src={TempleImage}
          alt="Background Image"
        />
        <div className={styles.backgroundImageCover} />
      </header>
      <Navbar />
      <Container as="section" className={styles.contentSection}>
        <IntroductionMdx />
      </Container>
    </main>
  );
}
