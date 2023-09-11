function menuClick ({ message, nro }) {
  if (!message) message = "Hizo click en el menu"
  if (nro) message += ` ${nro}`
  window.alert(message)
}

function asignarEventos () {
  document.getElementById("menu1").addEventListener("click", () => menuClick({ nro: 1 }))
  document.getElementById("menu2").addEventListener("click", () => menuClick({ nro: 2 }))
  document.getElementById("menu3").addEventListener("click", () => menuClick({ nro: 3 }))
}

window.addEventListener("load", asignarEventos)
