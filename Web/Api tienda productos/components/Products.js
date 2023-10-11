/** @typedef {import('../api/fakestore').Product} IProduct */

/** @param {IProduct} [product] */
export const Product = (product) => `
<div
  class="col"
  data-bs-toggle="modal"
  data-bs-target="#product-modal"
  data-bs-product="${JSON.stringify(product)}"
>
  <div class="card h-100 border-0 p-3">

    <img
      class="card-img-top object-fit-contain rounded-3"
      height="230vh"
      src=${product.image ?? "/assets/placeholder-img.png"}
      alt=${product.title ?? "..."}
    />

    <div class="card-body d-flex align-items-center">
      <h1 class="card-title placeholder-glow w-100 fs-4">
        ${
          product.title ??
          `<span class="placeholder col-12 rounded-4"></span>
          <span class="placeholder col-6 rounded-4"></span>`
        }
      </h1>
    </div>

    <div class="card-footer border-0 rounded-4">
      <p class="fs-5 placeholder-glow my-auto">
        ${product.price ? '$' + product.price : `<span class="placeholder col-5 rounded-4"></span>`}
      </p>
    </div>

  </div>
</div>
`;

/** @param {IProduct[]} [products] */
export const Products = products => `
<div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 gy-4">
  ${products.map(product => Product(product)).join('\n')}
</div>
`;

/**
 * @param {string} [category] 
 * @param {IProduct[]} [products]
 */
export const ProductsPerCategory = (category, products) => `
<div class="container-fluid px-5"> 
  <h1 category-index="-1" class="fw-semibold text-center my-4 my-md-5 placeholder-glow">
    ${
      category[0].toUpperCase() + category.slice(1) ??
      `<span class="placeholder col-3 rounded-4"></span>`
    }
  </h1>

  ${Products(products)}
</div>
`;

export default {
  Product,
  Products,
  ProductsPerCategory
}
