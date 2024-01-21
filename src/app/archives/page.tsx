import Navbar from '@/components/Navbar/Navbar';
import Container from '@/components/Container/Container';

export default function Page() {
  return (
    <main>
      <Navbar />
      <Container as="section" style={{ marginTop: '0.5rem' }}>
        No posts yet!
      </Container>
    </main>
  );
}
