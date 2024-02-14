import getStaticMarkup from './get-static-markup';
import { wrapCodeblockSyntax, computeClassName } from './utils';
import styles from './styles.module.css';

type Stylesheet = {
  container?: string;
  header?: string;
  codeblock?: string;
};

export type Props = {
  className?: string;
  stylesheet?: Stylesheet;
  source: string;
  lang: string;
  showLineNumbers?: boolean;
};

const languageNameMapping: Record<string, string> = {
  ts: 'TypeScript',
  js: 'JavaScript',
};

async function CodeBlock({
  className,
  stylesheet,
  source,
  lang,
  showLineNumbers,
}: Props) {
  const content = await getStaticMarkup(
    wrapCodeblockSyntax(source, lang, showLineNumbers)
  );
  return (
    <div
      className={computeClassName(
        styles.contianer,
        stylesheet?.container,
        className
      )}
    >
      <div className={computeClassName(styles.header, stylesheet?.header)}>
        {languageNameMapping[lang] || lang}
      </div>
      <div
        className={computeClassName(styles.codeblock, stylesheet?.codeblock)}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}

export default CodeBlock;
