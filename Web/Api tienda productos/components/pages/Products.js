import Collapse from '../Collapse.js';
import NavBar from '../NavBar.js';
import Title from '../Title.js';
import ProductModal from '../ProductModal.js';

export const props = {
  idProductPerCategories: 'products-per-categories',
  idProductModal: 'product-modal',
  attributesModalData: {
    product: 'data-bs-product'
  }
}

/** @param {typeof props} props */
export const PageProducts = (props=props) => `
<div class="container-fluid p-0">
    
  ${Collapse()}
  
  ${NavBar()}
  
  ${Title('Api Ecommerce Products')}

  <div id="${props.idProductPerCategories ?? 'products-per-categories'}"></div>

  ${ProductModal(props.idProductModal)}

</div>
`

export default {
  PageProducts,
  props
}
