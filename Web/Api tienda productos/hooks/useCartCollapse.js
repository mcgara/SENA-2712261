import useCart from './useCart.js';
import { Product } from '../components/Products.js';
import { useProducts } from './useProducts.js';

export const cartKey = 'api-ecommerce-cart';
export const cart = useCart(cartKey);
// cart.clear();

/** @param {Element} cartCollapseElement */
export default function useCartCollapse(cartCollapseElement) {
  const listProductsElement = cartCollapseElement.querySelector('#cart-list-products');
  const initialListProductsElement = listProductsElement.innerHTML;
  const buyButton = cartCollapseElement.querySelector('#buy-button-cart');
  const navButtonCartBadge = cartCollapseElement.ownerDocument
    .querySelector('[data-bs-target="#product-collapse-cart"]')
    .lastElementChild;
  
  /** @param {Event} event */
  const callback = event => {
    /** @type {Element} */
    if (navButtonCartBadge) {
      navButtonCartBadge.classList.toggle('visually-hidden', true);
      navButtonCartBadge.innerHTML = '0';
    }

    if (buyButton && cart.value.products().length > 0) {
      buyButton.toggleAttribute('disabled', false);
      buyButton.lastElementChild.innerHTML = '$' + cart.value.total().toFixed(2);
    }

    useProducts(allProducts => {
      const products = allProducts.filter(product => cart.has(product));
      let listProducts = '';
      if (products.length === 0) listProducts = initialListProductsElement;
      else listProducts = products.map(product => Product(product)).join('\n');

      if (listProductsElement) listProductsElement.innerHTML = listProducts;
    }, false);
  }

  cartCollapseElement?.addEventListener('show.bs.collapse', callback);
  return () => cartCollapseElement?.removeEventListener('show.bs.collapse', callback);
}
