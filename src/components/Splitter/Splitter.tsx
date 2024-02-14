'use client';

import type { ReactElement, MouseEvent } from 'react';
import { useState, useCallback, useRef } from 'react';
import useStableCallback from '@/utils/use-stable-callback';
import styles from './styles.module.css';

type Props = {
  left: ReactElement;
  right: ReactElement;
};

const cssVarSplittingPoint = '--splitting-point';
const maxSplittingPoint = 75;
const minSplittingPoint = 25;

function calculateSplittingPoint(positionX: number, width: number): number {
  let percent = (positionX / width) * 100;
  percent = Math.min(percent, maxSplittingPoint);
  percent = Math.max(percent, minSplittingPoint);
  return Number(percent.toFixed(2));
}

function getPositionX(event: MouseEvent<HTMLDivElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  return event.clientX - rect.left;
}

function useContainerMouseMoveHandler(
  isMouseDown: boolean,
  divContainer: HTMLDivElement | null
) {
  return useStableCallback((event: MouseEvent<HTMLDivElement>) => {
    if (!isMouseDown || !divContainer) {
      return;
    }

    const posX = getPositionX(event);
    const percent = calculateSplittingPoint(posX, divContainer.offsetWidth);
    divContainer.style.setProperty(cssVarSplittingPoint, `${percent}%`);
  });
}

function Splitter({ left, right }: Props) {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const refContainer = useRef<HTMLDivElement>(null);

  const handleContainerMouseMove = useContainerMouseMoveHandler(
    isMouseDown,
    refContainer.current
  );

  const setIsMouseDownToTrue = useCallback(() => setIsMouseDown(true), []);
  const setIsMouseDownToFalse = useCallback(() => setIsMouseDown(false), []);

  return (
    <div
      className={styles.split}
      onMouseMove={handleContainerMouseMove}
      onMouseUp={setIsMouseDownToFalse}
      ref={refContainer}
    >
      <div className={styles.left}>{left}</div>
      <button
        className={styles.splittingLineArea}
        onMouseDown={setIsMouseDownToTrue}
        onMouseUp={setIsMouseDownToFalse}
      >
        <div className={styles.splittingLine} />
      </button>
      <div className={styles.right}>{right}</div>
    </div>
  );
}

export default Splitter;
