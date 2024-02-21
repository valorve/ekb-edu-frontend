import MarkdownIt from 'markdown-it';

export default defineNuxtPlugin(nuxtApp => {
  const md = new MarkdownIt();
  nuxtApp.provide('markdown', {
    toHtml: (markdownText) => md.render(markdownText)
  });
});
