"""
1. Realizar un programa para mostrar si un numero ingresado es positivo o negativo.
2. Realizar un programa para mostrar si un numero es par o impar.
"""

try:
    numero = int(input("Ingrese numero a evaluar: "))
    programa = int(input("Ingrese \"1\" si quire saber si el numero es positivo/negativo o ingrese \"2\" si quiere saber si es par/impar: "))
except ValueError:
    print("Error: Se ha ingresado un valor invalido, solo se aceptan numeros.")
    exit(1)

msg = "El numero ingresado es: "

if programa == 1: msg += "POSITIVO" if numero >= 0 else "NEGATIVO"
elif programa == 2: msg += "PAR" if numero % 2 == 0 else "IMPAR"
else: msg = "Error: no se ha seleccionado un programa, dijite \"1\" o \"2\""

print(msg)

