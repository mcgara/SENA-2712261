"""Una compañia de seguros esta abriendo un departamento de finanzas y establecio un programa
para captar clientes, que consiste en lo siguiente: Si el monto por el que se efectuo la finanza
es menor que $500.000 la cuota a pagar sera por el 3% del monto, y si el monto es mayor que $500.000
la cuota a pagar sera el 2% del monto. La afianzadora desea determinar cual sera la cuota que debe pagar un cliente.
"""

try:
    fianza = float(input("Ingrese la fianza: "))
except ValueError:
    print("Error: Se ha ingresado un valor invalido, solo se aceptan numeros.")
    exit(1)

cuota = fianza * 0.03 if fianza < 500000 else fianza * 0.02

print(f"La cuota a debe pagar el cliente es: ${cuota:,.2f}")

