import type { ReactElement } from 'react';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode, { type Options } from 'rehype-pretty-code';
import * as runtime from 'react/jsx-runtime';
import { evaluate } from '@mdx-js/mdx';
import { createElement } from 'react';

async function renderToStaticMarkup(component: ReactElement) {
  const ReactDOMServer = (await import('react-dom/server')).default;
  return ReactDOMServer.renderToStaticMarkup(component);
}

const options: Options = {
  theme: 'one-dark-pro',
};

export default async function getStaticMarkup(source: string) {
  const mdx = (
    await evaluate(source, {
      ...(runtime as any),
      remarkPlugins: [remarkGfm],
      rehypePlugins: [[rehypePrettyCode, options]],
    })
  ).default;
  return renderToStaticMarkup(createElement(mdx));
}
