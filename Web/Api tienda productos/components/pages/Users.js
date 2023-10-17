import Collapse from '../Collapse.js';
import NavBar from '../NavBar.js';
import Title from '../Title.js';
import CartCollapse from '../CartCollapse.js';

export const PageUsers = () => `
<div class="container-fluid p-0">
  
  <div class="sticky-top">
    ${NavBar()}

    ${Collapse()}

    ${CartCollapse('product-collapse-cart')}
  </div>
  
  ${Title('Api Ecommerce Users')}

  <div id="table-users"></div>

</div>
`

export default PageUsers;
