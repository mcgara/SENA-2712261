import PageProducts from '../../components/pages/Products.js';
import SpinnerLoading from '../../components/SpinnerLoading.js';
import { ProductsPerCategory } from '../../components/Products.js';
import { useProductsPerCategory } from '../useProducts.js';
import useProductModal from '../useProductModal.js';
import { useHtmlTitle } from '../useHtml.js'

/** @typedef {import('../../api/fakestore').Product} IProduct */

export const useProductsPerCategories = (shuffle=true) => 
  useProductsPerCategory(productsPerCategories => {
    const categories = Object.keys(productsPerCategories);
    let stringProductsPerCategories = '';
    categories.forEach(category => {
      const products = productsPerCategories[category];
      stringProductsPerCategories += ProductsPerCategory(category, products);
    })
    return stringProductsPerCategories;
  }, shuffle)

/** @param {Element} element */
export function usePageProducts(element) {
  useHtmlTitle('Api Ecommerce - Products');
  element.innerHTML = PageProducts();

  const productsPerCategories = element.querySelector('#products-per-categories');
  const productModal = element.querySelector('#product-modal');
  const navButton = element.querySelector('nav button[page-name="Products"]');

  if (productsPerCategories) {
    productsPerCategories.innerHTML = SpinnerLoading();
    useProductsPerCategories()
      .then(outer => productsPerCategories.outerHTML = outer);
  }

  if (productModal) useProductModal(productModal);
  if (navButton) navButton.toggleAttribute('disabled', true);
}

export default usePageProducts;
