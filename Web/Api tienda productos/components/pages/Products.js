import Collapse from '../Collapse.js';
import NavBar from '../NavBar.js';
import Title from '../Title.js';
import ProductModal from '../ProductModal.js';
import CartCollapse from '../CartCollapse.js';

export const PageProducts = () => `
<div class="container-fluid p-0">
  
  <div class="sticky-top">
    ${NavBar()}

    ${Collapse()}

    ${CartCollapse('product-collapse-cart')}
  </div>

  ${Title('Api Ecommerce Products')}

  <div id="products-per-categories"></div>

  ${ProductModal('product-modal')}

</div>
`

export default PageProducts;
