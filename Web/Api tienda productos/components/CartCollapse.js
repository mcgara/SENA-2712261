/** @param {string} id */
export const CartCollapse = (id) => `
<div
  class="collapse collapse-horizontal bg-dark p-3 position-absolute end-0 vh-100"
  id="${id}"
>
  <div class="container h-100 pb-5 d-flex flex-column justify-content-between align-items-center" style="width: 30vw;">
    <h2 class="text-white">Cart Products</h2>

    <div class="row row-cols-1 w-100 h-100 pb-3 px-0 gy-2 overflow-auto" id="cart-list-products">
      
      <h4 class="text-white m-auto text-center">Empty Cart</h4>
    
    </div>

    <button id="buy-button-cart" class="btn btn-primary icon-link fs-5 justify-content-center w-100" disabled>
      <span class="material-symbols-outlined">shopping_cart</span>
      Buy
      <span class="mx-1">$0</span>
    </button>
  </div>

</div>
`;

export default CartCollapse;
