export const ProductModalBody = () => `
<div class="card border-0">
  <div class="row row-cols-1 row-cols-md-2 g-0">
    <div class="col col-md-4 align-items-center">
      <img class="img-fluid object-fit-contain w-100" src="./assets/placeholder-img.png" style="height: 85vh" />
    </div>
    <div class="col col-md-8 py-1 py-md-2 px-1 px-md-4 d-flex flex-column justify-content-evenly">
      <div class="card-body p-0 py-md-2">
        <h1 class="card-title py-1 py-md-2">
          <h1 class="fs-2 placeholder-glow">
            <span class="placeholder col-11 rounded-4"></span>
            <span class="placeholder col-6 rounded-4"></span>
          </h1>
          <p class="badge bg-secondary fs-5 w-25 placeholder-glow">
            <span class="placeholder col-12 rounded-4"></span>
          </p>
        </h1>

        <p class="card-text py-1 py-md-2 fs-5 placeholder-glow">
          <span class="placeholder col-11 rounded-4"></span>
          <span class="placeholder col-10 rounded-4"></span>
          <span class="placeholder col-11 rounded-4"></span>
          <span class="placeholder col-9 rounded-4"></span>
          <span class="placeholder col-8 rounded-4"></span>
          <span class="placeholder col-4 rounded-4"></span>
        </p>
      </div>

      <div class="card-footer border-0 rounded-4">
        <p class="fs-3 placeholder-glow">
          <span class="placeholder col-4 rounded-4"></span>
        </p>
      </div>

      <button class="btn btn-primary">
        <p class="icon-link h-100 fs-5">
          <span class="material-symbols-outlined">shopping_cart</span>
          Add To Cart
        </p>
      </button>
    </div>
  </div>
</div>
`;

export const ProductModalHeader = () => `
<div class="modal-header position-absolute w-100 border-0">
  <button type="button" class="btn-close p-3 z-3" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
`;

export const ProductModal = () => `
<div id="product-modal" class="modal fade">
  <div
    class="modal-dialog modal-dialog-centered modal-xl mx-auto"
    style="max-width: 100vw; width: 90%"
  >
    <div class="modal-content">

      ${ProductModalHeader()}
      
      ${ProductModalBody()}
      
    </div>
  </div>
</div>
`;

export default ProductModal;
