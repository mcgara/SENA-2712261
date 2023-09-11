"""
Elabora un programa que permita leer los datos de un automovil: marca, origen y costo.
Imprimir el impuesto a pagar y el precio de venta teniendo en cuenta el origen:
  Alemania aplica un 33%
  Japon aplica un 40%
  Italia aplica un 23%
  USA aplica un 15%
"""

paises_impuestos = {
  "alemania": 0.33,
  "japon": 0.4,
  "italia": 0.23,
  "usa": 0.15
}

err_mensajes = [
  "El origen del vehiculo es desconocido.",
  "El costo solo puede ser numerico."
]

marca = input("Ingrese la marca del vehiculo: ")
origen = input("Ingrese el origen del vehiculo: ").lower()
costo = input("Ingrese el costo del vehiculo: ")

err_expresiones = [
  not origen in paises_impuestos.keys(),
  not costo.isnumeric()
]

if True in err_expresiones:
  print("\nError:", err_mensajes[err_expresiones.index(True)])
  exit(1)

costo = float(costo)
impuesto = paises_impuestos[origen]
precio = costo + costo * impuesto

print(f"\nEl vehiculo de marca {marca} tiene un precio de {precio:,.2f} con un impuesto del {impuesto * 100}%")
