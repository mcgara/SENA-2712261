import { ProductsPerCategory } from '../components/Products.js';
import { useProductsPerCategory } from '../hooks/useProduct.js';
import SpinnerLoading from '../components/SpinnerLoading.js';

const rootProductsPerCategory = document.getElementById('com-products-per-category');
rootProductsPerCategory.innerHTML = SpinnerLoading();

useProductsPerCategory(productsPerCategories => {
  const categories = Object.keys(productsPerCategories);
  let outer = '';
  categories.forEach(category => {
    const products = productsPerCategories[category];
    outer += ProductsPerCategory(category, products);
  })
  rootProductsPerCategory.outerHTML = outer;
})
