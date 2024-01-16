"""
Realice un algoritmo para determinar el area de un cuadrado.
"""

medida_lado = input("Ingrese la base del cuadrado: ")
if not medida_lado.isnumeric():
  print("Error: Solo se aceptan numeros.")
  exit(1)

area = medida_lado ** 2
print("El area del cuadrado es:", round(area, 2))
