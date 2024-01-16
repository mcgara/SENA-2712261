"""
Realizar un programa que permita almacenar valores de una matriz F X C.
"""

def crear_matriz(
  filas: int = 3,
  columnas: int = 3,
  matriz: list[list[int]] = []
) -> list[list[int]]:
  if len(matriz) >= filas: return matriz
  vector = [input("Ingrese valor a agregar a la matriz: ") for _ in range(columnas)]
  matriz.append(vector)
  return crear_matriz(filas, columnas, matriz)


print()
matriz = crear_matriz()
print("\nResultado de la matriz:\n[\n" + \
  ",\n".join(["   [" + ", ".join(columna) + "]" for columna in matriz]) + \
  "\n]\n"
)
