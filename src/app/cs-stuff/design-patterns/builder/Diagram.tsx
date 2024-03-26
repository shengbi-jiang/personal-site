import Image from 'next/image';
import DiagramImage from './diagram.png';

export default function Diagram() {
  return (
    <Image
      src={DiagramImage}
      alt="Class Diagram"
      style={{ width: '100%', height: 'auto' }}
    />
  );
}
