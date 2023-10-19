export const PageSignIn = () => `
<div class="container d-flex justify-content-center align-items-center vh-100">
  
  <div class="card border-4 border-primary rounded-4 w-50 h-50 px-2">
    <h1 class="card-title fw-semibold text-center my-3 mt-4">Api Ecommerce Sign In</h1>

    <form class="card-body h-100 d-flex flex-column justify-content-between">
      <div>
        <div class="mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Username or Email"
            arial-label="Username or Email"
          >
        </div>
        <div class="my-3">
          <input type="password" class="form-control" placeholder="Password" arial-label="Password">
        </div>
        <label class="form-check-label">
          I already not have an account
          <a index-page page-name="SignUp" class="text-decoration-none">sign up</a>
        </label>
      </div>

      <div>
        <button type="submit" class="btn btn-primary btn-lg w-100">Sign in</button>
      </div>
    </form>

  </div>

</div>
`

export default PageSignIn;
