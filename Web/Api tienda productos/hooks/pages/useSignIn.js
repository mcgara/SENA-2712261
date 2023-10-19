import PageSignIn from '../../components/pages/SignIn.js';
import { useHtmlTitle } from '../useHtml.js';

/** @param {Element} element */
export function usePagSignIn(element) {
  useHtmlTitle('Api Ecommerce - SignIn');
  element.innerHTML = PageSignIn();
}

export default usePagSignIn;
