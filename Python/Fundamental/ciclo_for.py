# 1. Realice un programa que muestre los numeros del 1 al 10
# 2. Realice un programa que muestre la tabla de multiplicacion x8

print("\n".join([str(x) for x in range(1, 11)]))
print("\n".join([f"8x{x} = {8 * x}" for x in range(1, 11)]))
print("\n".join(["*" * x for x in range(20)]))

"""
Calcular la nota de la cantidad de alumnos, introduciendo su nota teorica
que vale el 60% y su nota practica que vale 40%
"""