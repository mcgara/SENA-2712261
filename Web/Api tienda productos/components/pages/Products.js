import Collapse from '../Collapse.js';
import NavBar from '../NavBar.js';
import Title from '../Title.js';
import ProductModal from '../ProductModal.js';
import CollapseCart from '../Cart.js';

export const PageProducts = () => `
<div class="container-fluid p-0">
  
  <div class="sticky-top">
    ${NavBar()}

    ${Collapse()}
  </div>

  ${CollapseCart()}
  
  ${Title('Api Ecommerce Products')}

  <div id="products-per-categories"></div>

  ${ProductModal()}

</div>
`

export default PageProducts;
