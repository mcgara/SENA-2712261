"""
Calcular el volumen de una esfera = 4/3 * PI * r ** 3
"""

import math

radio = input("Ingrese el radio de la esfera: ")
if not radio.isnumeric():
  print("Error: Solo se aceptan numeros.")
  exit(1)

radio = float(radio)
volumen = radio ** 3 * 4 / 3 * math.pi
print("El volumen de la esfera es:", round(volumen, 5))
