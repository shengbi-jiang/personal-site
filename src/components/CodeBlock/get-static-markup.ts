import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypePrettyCode, { type Options } from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';

const options: Options = {
  theme: 'one-dark-pro',
};

export default async function getStaticMarkup(source: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypePrettyCode, options)
    .use(rehypeStringify)
    .process(source);
  return String(file);
}
