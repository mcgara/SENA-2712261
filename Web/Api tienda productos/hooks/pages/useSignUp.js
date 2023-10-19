import PageSignUp from '../../components/pages/SignUp.js';
import { useHtmlTitle } from '../useHtml.js';

/** @param {Element} element */
export function usePagSignUp(element) {
  useHtmlTitle('Api Ecommerce - SignUp');
  element.innerHTML = PageSignUp();
}

export default usePagSignUp;
