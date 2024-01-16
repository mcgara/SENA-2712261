"""
Calcular el area de un ciruculo = PI * r ** 2
"""

import math

radio = input("Ingrese el radio del circulo: ")
if not radio.isnumeric():
  print("Error: Solo se aceptan numeros.")
  exit(1)

radio = float(radio)
area = radio ** 2 * math.pi
print("El area del circulo es:", round(area, 5))
