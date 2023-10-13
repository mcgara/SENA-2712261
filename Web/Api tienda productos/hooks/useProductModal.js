/** @typedef {import('../api/fakestore').Product} IProduct */

/** @param {Element} elementModal */
export default function useProductModal(elementModal) {
  /** @param {Event} event */
  const callback = event => {
    /** @type {Element} */
    const productElement = event.relatedTarget;
    const productString = productElement?.getAttribute('data-bs-product');
    if (!productElement || !productString) return;

    /** @type {IProduct} */
    const productData = JSON.parse(productString.replace(/&quot;/g, '"'));
    const productModalElements = elementModal.querySelectorAll('[product]')
    const buttonAddToCart = elementModal.querySelector('#add-to-cad');
    let totalPrice = productData.price.toFixed(2);
    
    productModalElements.forEach(element => {
      const key = element.getAttribute('product');
      if (!productData[key]) return;
      if (key === 'image') {
        element.setAttribute('src', productData.image);
        element.setAttribute('alt', productData.title);
      } else if (key === 'price') {
        element.value = '1';
        element.previousElementSibling.innerHTML = '$' + totalPrice;
        element.addEventListener('change', () => {
          const value = Number(element.value);
          totalPrice = (productData.price * value).toFixed(2);
          element.previousElementSibling.innerHTML = '$' + totalPrice;
        })
      } else element.innerHTML = productData[key];
    })

    // if (buttonAddToCart) {
    //   const cart = window.localStorage.getItem('api-ecommerce-cart');
    //   if (!cart) 
    //   window.localStorage.setItem('api-ecommerce-cart',  )
    // }
  }
  elementModal.addEventListener('show.bs.modal', callback);
  return () => elementModal.removeEventListener('show.bs.modal', callback);
}