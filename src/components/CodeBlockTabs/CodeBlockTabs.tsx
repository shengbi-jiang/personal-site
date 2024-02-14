import type { Props as CodeBlockProps } from '@/components/CodeBlock/CodeBlock';
import CodeBlock from '@/components/CodeBlock/CodeBlock';
import styles from './styles.module.css';
import Tabs from './Tabs';

type CodeBlockSource = {
  fileName: string;
} & CodeBlockProps;

type Props = {
  sources: CodeBlockSource[];
};

export default async function CodeBlockTabs({ sources }: Props) {
  return (
    <Tabs
      sources={sources.map((source) => ({
        fileName: source.fileName,
        element: (
          <CodeBlock
            key={source.fileName}
            stylesheet={{ header: styles.codeblockHeader }}
            source={source.source}
            lang={source.lang}
            showLineNumbers={true}
          />
        ),
      }))}
    />
  );
}
