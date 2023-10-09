import { ProductsPerCategory } from '../components/Products.js';
import { useProductsPerCategory } from '../hooks/useProduct.js';

const rootProductsPerCategory = document.getElementById('com-products-per-category');

useProductsPerCategory(productsPerCategories => {
  const categories = Object.keys(productsPerCategories);
  let outer = '';
  categories.forEach(category => {
    const products = productsPerCategories[category];
    outer += ProductsPerCategory(category, products);
  })
  rootProductsPerCategory.outerHTML = outer;
})
