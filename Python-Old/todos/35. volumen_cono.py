"""
Calcular el volumen de un cono.
"""

import math
try:
  radio = float(input("Ingrese el radio del cono: "))
  altura = float(input("Ingrese la altura del cono: "))
except ValueError:
  print("Error: Solo se aceptan numeros.")
  exit(1)

radio = float(radio)
area = radio ** 2 * 1 / 3 * math.pi * altura
print("El area del cono es:", round(area, 5))

