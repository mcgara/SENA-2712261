import Pages from './hooks/pages/index.js';

/** @type {Record<string, (element: Element) => void>} */
const pages = {
  products: Pages.useProducts,
  users: Pages.useTableUsers,
  signup: Pages.useSignUp,
  signin: Pages.useSignIn
}
const pagesNames = Object.keys(pages);

const index = document.getElementById('index-page');

/** @param {Element} elementAction */
function setIndexPage(elementAction) {
  const indexPageName = elementAction?.getAttribute('page-name')?.toLowerCase();
  if (!(index && indexPageName && pagesNames.includes(indexPageName))) return;
  const page = pages[indexPageName];
  page(index);

  const elementsOnClickSetPage = index.querySelectorAll(`[${index.id}]`);
  elementsOnClickSetPage.forEach(
    element => element.addEventListener('click', () => setIndexPage(element))
  );
}

setIndexPage(index);
