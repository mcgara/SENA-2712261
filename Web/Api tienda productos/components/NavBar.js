export const NavBar = () => `
<nav class="navbar navbar-dark bg-dark">
  <div class="container-fluid d-flex justify-content-between px-3">
    <div>
      <button
        class="navbar-toggler btn btn-outline-secondary me-3"
        data-bs-toggle="collapse"
        data-bs-target="#navbarToggleExternalContent"
        aria-controls="navbarToggleExternalContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <button data-bs-toggle="button" class="btn text-white btn-outline-danger" disabled>Home</button>
      <button index-page page-name="Products" data-bs-toggle="button" class="btn text-white">Products</button>
      <button index-page page-name="Users" data-bs-toggle="button" class="btn text-white">Users</button>
    </div>
    <div class="d-flex">
      <div>
        <button
          class="btn btn-primary icon-link position-relative"
          data-bs-toggle="collapse"
          data-bs-target="#product-collapse-cart"
        >
          <span class="material-symbols-outlined">shopping_cart</span>
          Cart

          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger visually-hidden">
            0
          </span>
        </button>
      </div>
      <form class="d-flex mx-5" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
      <div>
        <button index-page page-name="SignIn" class="btn btn-outline-secondary text-white">Sign In</button>
        <button index-page page-name="SignUp" class="btn btn-outline-info">Sign Up</button>
      </div>
    </div>
  </div>
</nav>
`;

export default NavBar;
