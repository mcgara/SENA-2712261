import Pages from './hooks/pages/index.js';

/** @type {Record<string, (element: Element) => void>} */
const pages = {
  products: Pages.useProducts
}
const pagesNames = Object.keys(pages);

const index = document.getElementById('index-page');
const indexPageName = index?.getAttribute('page-name')?.toLowerCase();
if (indexPageName && pagesNames.includes(indexPageName)) {
  const page = pages[indexPageName];
  page(index);
}
