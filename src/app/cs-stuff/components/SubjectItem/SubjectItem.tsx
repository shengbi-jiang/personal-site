import Link from 'next/link';
import Image from 'next/image';
import styles from './styles.module.css';

type Props = {
  name: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
};

export default function SubjectItem({ name, href, imageSrc, imageAlt }: Props) {
  return (
    <Link href={href} className={styles.item}>
      <Image
        className={styles.image}
        src={imageSrc}
        alt={imageAlt}
        height={64}
        width={64}
      />
      {name}
    </Link>
  );
}
