fetch('https://fakestoreapi.com/products')
    .then(res=>res.json())
    .then(json=> {
        if (!json) return;
        let cadena = ""
        for (const producto of json) {
          cadena = cadena + `
          <div class="card p-0">
            <img class="card-img-top object-fit-contain" height="250vh" src="${producto.image}" />
            <div class="card-body">
              <h4 class="card-title text-center">${producto.title}</h4>
              <p class="card-text">${producto.description}</p>
            </div>
            <div class="card-footer w-100 border-0">
              <p class="my-auto fs-5 fw-semibold">$${producto.price}</p>
            </div>
          </div>
          `
        }
        document.getElementById("productos").innerHTML = cadena
    })