import Container from '@/components/Container/Container';
import TopicIconSvg from './design-patterns/topic-icon.svg';
import SubjectItem from './components/SubjectItem/SubjectItem';

export default async function Page() {
  return (
    <Container as="section">
      <p>Posts and gadgets related to computer science stuff placed here!</p>
      <div style={{ marginTop: '0.5rem' }}>
        <SubjectItem
          name="Design Patterns"
          href="/cs-stuff/design-patterns"
          imageSrc={TopicIconSvg}
          imageAlt="Design Patterns Icon"
        />
      </div>
    </Container>
  );
}
