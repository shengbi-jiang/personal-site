'use client';

import { useEffect, useRef } from 'react';
import Main from './code';

function Component() {
  const divRef = useRef<HTMLDivElement | null>(null);
  const mainRef = useRef<Main | null>(null);

  useEffect(() => {
    if (!mainRef.current) {
      mainRef.current = new Main();
    }
    if (divRef.current) {
      mainRef.current.execute(divRef.current);
    }
    return () => {
      if (mainRef.current) {
        mainRef.current.cleanUp();
      }
    };
  }, []);

  return <div ref={divRef}>Default</div>;
}

export default Component;
