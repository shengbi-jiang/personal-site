import type { ElementType, ReactNode, CSSProperties } from 'react';
import styles from './styles.module.css';

type Props = {
  as?: ElementType;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export default function Container(props: Props) {
  const { as: Component = 'div', className, ...restProps } = props;
  const computedClassName = className
    ? `${styles.container} ${className}`
    : styles.container;
  return <Component className={computedClassName} {...restProps} />;
}
