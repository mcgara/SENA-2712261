"""
Realizar un programa que permita almacenar N cantidad de frutas el programa finaliza
cuando se dijite 0

Nota: NO se puede repetir la misma fruta.
"""

def frutas(listado: list[str] = []) -> list[str]:
    valor = input("Ingrese la fruta (digite 0 para finalizar): ").capitalize()
    if valor == "0": return listado
    if valor in listado: print("Error: NO se puede repetir la misma fruta.")
    else: listado.append(valor)
    return frutas(listado)

print("\n")
print("\nEstas son todas las frutas agregadas:", ", ".join(frutas()))
