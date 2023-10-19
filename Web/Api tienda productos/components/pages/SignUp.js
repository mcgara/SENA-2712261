export const PageSignUp = () => `
<div class="container d-flex justify-content-center align-items-center vh-100">
  
  <div class="card border-4 border-primary rounded-4 text-dark w-50 px-2" style="height: 85%;">
    <h1 class="card-title fw-semibold text-center my-3 mt-4">Api Ecommerce Sign Up</h1>

    <form class="card-body h-100 d-flex flex-column justify-content-between">
      <div>
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Name" arial-label="Name">
          <input type="text" class="form-control" placeholder="LastName" arial-label="LastName">
        </div>
        <div class="my-3">
          <input type="text" class="form-control" placeholder="Username" arial-label="Username">
        </div>
        <div class="my-3">
          <input type="email" class="form-control" placeholder="Email Address" arial-label="Email Address">
        </div>
        <div class="my-3">
          <input type="password" class="form-control" placeholder="Password" arial-label="Password">
          <div class="form-text text-dark">It can only be between 8-20 characters.</div>
        </div>
        <label class="form-check-label">
          I already have an account
          <a index-page page-name="SignIn" class="text-decoration-none">sign in</a>
        </label>
      </div>

      <div>
        <div class="my-3 form-check">
          <input type="checkbox" class="form-check-input shadow-lg" id="terms-conditions">
          <label class="form-check-label" for="terms-conditions">I agreet terms and conditions</label>
        </div>
        <button type="submit" class="btn btn-primary btn-lg w-100">Sign up</button>
      </div>
    </form>

  </div>

</div>
`

export default PageSignUp;
