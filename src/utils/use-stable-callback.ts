import { useCallback, useRef } from 'react';

interface Callable<Arg, Return> {
  (...args: Arg[]): Return;
}

export default function useStableCallback<Arg, Return>(
  callback: Callable<Arg, Return>
): Callable<Arg, Return> {
  const ref = useRef<Callable<Arg, Return>>(callback);
  const stableCallback = useCallback<Callable<Arg, Return>>(
    (...args) => ref.current(...args),
    []
  );
  ref.current = callback;
  return stableCallback;
}
