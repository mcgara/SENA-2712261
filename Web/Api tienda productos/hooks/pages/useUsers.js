import PageTableUsers from '../../components/pages/Users.js';
import TableUsers from '../../components/TableUsers.js';
import SpinnerLoading from '../../components/SpinnerLoading.js';
import useUsers from '../useUsers.js';
import { useHtmlTitle } from '../useHtml.js';
import useCartCollapse from '../useCartCollapse.js';

export const useTableUsers = (shuffle=false) => useUsers(users => TableUsers(users), shuffle)

/** @param {Element} element */
export function usePageTableUsers(element) {
  useHtmlTitle('Api Ecommerce - Users');
  element.innerHTML = PageTableUsers();

  const tableUsers = element.querySelector('#table-users');
  const navButton = element.querySelector('nav button[page-name="Users"]');
  const productCartCollapse = element.querySelector('#product-collapse-cart');

  if (tableUsers) {
    tableUsers.innerHTML = SpinnerLoading();
    useTableUsers().then(outer => tableUsers.outerHTML = outer);
  }

  if (navButton) navButton.toggleAttribute('disabled', true);
  if (productCartCollapse) useCartCollapse(productCartCollapse);
}

export default usePageTableUsers;
