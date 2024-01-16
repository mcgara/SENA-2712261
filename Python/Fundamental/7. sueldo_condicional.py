"""Realice un programa que solicite el sueldo, si este supera los 2 millones de pesos, muestra un mensaje de que debe pagar impuestos sino no debe pagar."""

try:
    sueldo = float(input("Ingrese el sueldo: "))
except ValueError:
    print("Error: Se ha ingresado un valor invalido, solo se aceptan numeros.")
    exit(1)


if sueldo > 2000000:
    print("Usted debe pagar impuestos :)")
else:
    print("Usted se salva de los impuestos")

