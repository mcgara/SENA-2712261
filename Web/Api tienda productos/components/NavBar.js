export const NavBar = () => `
<nav class="navbar navbar-dark bg-dark">
  <div class="container-fluid d-flex justify-content-between">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div>
      <button type="button" class="btn btn-info text-white" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Carrito
      </button>
      <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#modal-login">
        Login
      </button>
      <a type="button" href="./registro.html" class="btn btn-success">Registro</a>
    </div>
  </div>
</nav>
`;

export default NavBar;
