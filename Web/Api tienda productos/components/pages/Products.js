import Collapse from '../Collapse.js';
import NavBar from '../NavBar.js';
import Title from '../Title.js';
import ProductModal from '../ProductModal.js';

export const PageProducts = () => `
<div class="container-fluid p-0">
    
  ${Collapse()}
  
  ${NavBar()}
  
  ${Title('Api Ecommerce Products')}

  <div id="products-per-categories"></div>

  ${ProductModal()}

</div>
`

export default PageProducts;
