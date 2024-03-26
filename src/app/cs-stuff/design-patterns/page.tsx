import Container from '@/components/Container/Container';
import SubjectItem from '../components/SubjectItem/SubjectItem';
import AbstractFactoryIcon from './abstract-factory/topic-icon.svg';
import FactoryMethodIcon from './factory-method/topic-icon.svg';
import BuilderIcon from './builder/topic-icon.svg';

export default function Page() {
  return (
    <Container>
      <h1>Design Patterns</h1>
      <section>
        <h2>Creational Patterns</h2>
        <SubjectItem
          name="Abstract Factory"
          href="/cs-stuff/design-patterns/abstract-factory"
          imageSrc={AbstractFactoryIcon}
          imageAlt="Abstract Factory Pattern"
        />
        <SubjectItem
          name="Factory Method"
          href="/cs-stuff/design-patterns/factory-method"
          imageSrc={FactoryMethodIcon}
          imageAlt="Factory Mathod Pattern"
        />
        <SubjectItem
          name="Builder"
          href="/cs-stuff/design-patterns/builder"
          imageSrc={BuilderIcon}
          imageAlt="Builder Pattern"
        />
      </section>
      <section>
        <h2>Structural Patterns</h2>
      </section>
      <section>
        <h2>Behavioral Patterns</h2>
      </section>
    </Container>
  );
}
