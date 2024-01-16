"""
Realice un algoritmo para determinar el area de un rectangulo.
"""

try:
  base = float(input("Ingrese la base del rectangulo: "))
  altura = float(input("Ingrese la altura del rectangulo: "))
except ValueError:
  print("Error: Solo se aceptan numeros.")
  exit(1)

area = base * altura
print("El area del rectangulo es:", round(area, 5))