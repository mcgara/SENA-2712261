"""
En una escuela la matricula de los alumnos se determina segun el numero de materias que cursa.
El costo de todas las materias es el mismo.
"""

try:
  numero_materia = input("Ingrese el numero de materias: ")
  costo_por_materia = input("Ingrese el costo por materia: ")
except ValueError:
  print("Error: Se ha ingresado un valor invalido, solo se aceptan numeros.")
  exit(1)

precio = costo_por_materia * numero_materia
print("El precio de la matricula es:", precio)
