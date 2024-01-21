import getStaticMarkup from './get-static-markup';
import styles from './styles.module.css';

type Props = {
  source: string;
  lang: string;
  showLineNumbers?: boolean;
};

const codeBlockBackticks = '```';

const languageNameMapping: Record<string, string> = {
  ts: 'TypeScript',
  js: 'JavaScript',
};

function wrapCodeblockSyntax(
  source: string,
  lang: string,
  showLineNumbers: boolean = false
) {
  return (
    codeBlockBackticks +
    lang +
    (showLineNumbers ? ' showLineNumbers' : '') +
    '\n' +
    source +
    '\n' +
    codeBlockBackticks
  );
}

async function CodeBlock({ source, lang, showLineNumbers }: Props) {
  const content = await getStaticMarkup(
    wrapCodeblockSyntax(source, lang, showLineNumbers)
  );
  return (
    <div className={styles.contianer}>
      <div className={styles.header}>{languageNameMapping[lang] || lang}</div>
      <div
        className={styles.codeblock}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}

export default CodeBlock;
