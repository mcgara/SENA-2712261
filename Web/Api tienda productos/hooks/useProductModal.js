import { useProducts } from './useProducts.js';
import { cart } from './useCartCollapse.js';

/** @typedef {import('../api/fakestore').Product} IProduct */

/** @param {Element} modalElement */
export default function useProductModal(modalElement) {
  const initialModal = modalElement.innerHTML;
  const navButtonCartBadge = modalElement.ownerDocument
    .querySelector('[data-bs-target="#product-collapse-cart"]')
    .lastElementChild;
  
  /** @param {Event} event */
  const callback = event => {
    /** @type {Element} */
    const productElement = event.relatedTarget;
    const productId = productElement?.getAttribute('data-bs-product-id');
    if (!productElement || !productId) return;
    modalElement.innerHTML = initialModal;

    useProducts(products => {
      const product = products.filter(product => String(product.id) === productId)[0];
      if (!product) return;
      
      const productModalElements = modalElement.querySelectorAll('[product]');
      const buttonAddToCart = modalElement.querySelector('#add-to-cart');

      buttonAddToCart?.toggleAttribute('disabled', false);
      let quantity = Number(product.quantity ?? 1);
      let totalPrice = (product.price * quantity).toFixed(2);

      productModalElements.forEach(element => {
        const key = element.getAttribute('product');
        if (!product[key]) return;
        if (key === 'image') {
          element.classList.remove('placeholder');
          element.setAttribute('src', product.image);
          element.setAttribute('alt', product.title);
        } else if (key === 'price') {
          element.toggleAttribute('disabled', false);
          element.previousElementSibling.innerHTML = '$' + totalPrice;
          element.addEventListener('change', () => {
            quantity = Number(element.value);
            totalPrice = (product.price * quantity).toFixed(2);
            element.previousElementSibling.innerHTML = '$' + totalPrice;
          })
        } else element.innerHTML = product[key];
      })

      buttonAddToCart?.addEventListener('click', () => {
        cart.add({ ...product, quantity });
        if (navButtonCartBadge) {
          navButtonCartBadge.innerHTML = '' + (Number(navButtonCartBadge.innerHTML) + 1);
          navButtonCartBadge.classList.toggle('visually-hidden', false);
        }
      });
    })
  }

  modalElement?.addEventListener('show.bs.modal', callback);
  return () => modalElement?.removeEventListener('show.bs.modal', callback);
}