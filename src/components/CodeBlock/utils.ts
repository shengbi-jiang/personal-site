const codeBlockBackticks = '```';

export function wrapCodeblockSyntax(
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

export function computeClassName(...names: (string | undefined)[]): string {
  return names
    .filter((name) => typeof name === 'string' && name.length >= 1)
    .join(' ');
}
