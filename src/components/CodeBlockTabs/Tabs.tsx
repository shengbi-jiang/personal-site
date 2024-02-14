'use client';

import type { ReactElement, MouseEvent } from 'react';
import { useState, useCallback } from 'react';
import styles from './styles.module.css';

export type SourceInfo = {
  element: ReactElement;
  fileName: string;
};

type Props = {
  sources: SourceInfo[];
};

function getTabClassName(isActive: boolean): string {
  return isActive ? `${styles.tab} ${styles.active}` : styles.tab;
}

export default function CodeBlockTabs({ sources }: Props) {
  const [currentFileName, setCurrentFileName] = useState<string | null>(
    sources[0]?.fileName || null
  );

  const handleTabClicked = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const fileName = event.currentTarget.dataset.id;
      if (typeof fileName !== 'string') {
        return;
      }
      setCurrentFileName(fileName);
    },
    []
  );

  const currentSource = sources.find((s) => s.fileName === currentFileName);
  return (
    <div className={styles.container}>
      <div role="tablist" className={styles.tabList}>
        {sources.map((source) => (
          <button
            role="tab"
            key={source.fileName}
            className={getTabClassName(currentFileName === source.fileName)}
            data-id={source.fileName}
            onClick={handleTabClicked}
          >
            {source.fileName}
          </button>
        ))}
      </div>
      {currentSource?.element}
    </div>
  );
}
