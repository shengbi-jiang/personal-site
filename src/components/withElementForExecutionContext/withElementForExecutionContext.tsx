'use client';

import type { FunctionComponent, CSSProperties } from 'react';
import { useEffect, useRef } from 'react';
import HtmlElementExecutionContext from '@/types/html-element-execution-context';

interface Constructable<T> {
  new (...args: any): T;
}

type Props = {
  className?: string;
  style?: CSSProperties;
};

export default function withElementForExecutionContext(
  Context: Constructable<HtmlElementExecutionContext>,
  displayName = 'Component'
) {
  const Component: FunctionComponent = function (props: Props) {
    const divRef = useRef<HTMLDivElement | null>(null);
    const contextRef = useRef<HtmlElementExecutionContext | null>(null);

    useEffect(() => {
      if (!contextRef.current) {
        contextRef.current = new Context();
      }
      if (divRef.current) {
        contextRef.current.execute(divRef.current);
      }
      return () => {
        if (contextRef.current) {
          contextRef.current.cleanUp();
        }
      };
    }, []);

    return <div {...props} ref={divRef} />;
  };
  Component.displayName = displayName;
  return Component;
}
