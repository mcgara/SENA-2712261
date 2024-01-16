"""
Llenar una lista con 10 numeros e imprimir cual es el mayor y cual es el menor.
"""

def mayor_menor(
  cantidad: int = 10,
  lista: list[int | float] = []
) -> tuple[float, float]:
    valor = input("Ingrese numero para agregar: ")
    isdigit = valor.isdigit()
    isreal = valor.count(".", 1, -1) == 1 and valor.replace(".", "").isdigit()
    if not isdigit or isreal: print("\nError: El dato ingresado no es un numero.")
    else: lista.append(float(valor))

    if len(lista) == cantidad: return (max(lista), min(lista))
    return mayor_menor(cantidad, lista)
    
print("\n")
mayor, menor = mayor_menor()
print(f"\nEl numero mayor de la lista es: {mayor} y el menor es {menor}")
