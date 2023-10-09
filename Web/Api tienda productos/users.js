function eliminarUsuario(id) {
  document.getElementById(id).remove()
}

fetch('https://fakestoreapi.com/users')
    .then(res=>res.json())
    .then(json=> {
        if (!json) return;
        let cadena = ""
        for (const usuario of json) {
          cadena = cadena + `
            <tr id="usuario-${usuario.id}">
              <th scope="row">${usuario.id}</th>
              <td>${usuario.username}</td>
              <td>${usuario.name.firstname}</td>
              <td>${usuario.name.lastname}</td>
              <td>${usuario.email}</td>
              <td>${usuario.address.city}</td>
              <td>${usuario.phone}</td>
              <td><button class="btn btn-danger" onclick="eliminarUsuario('usuario-${usuario.id}')">Eliminar</button></td>
            </tr>
          `
        }

        document.getElementById("usuarios").innerHTML = cadena;
    })
