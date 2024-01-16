"""
Una empresa de prestamo decidio cambiar su sistema de cobro de la siguiente manera:
si el prestamo es mas de 5000 euros se cobra en 3 cuotas,
si el prestamo es menor de 2000 euros se cobra a 1 cuota,
si el prestamo esta entre 2000 y 4999 se cobra en 2 cuotas,
si tiene 1 cuota se cobra el 3% a 2 se cobra 6% y 3 son 9%
"""

try:
    prestamo = float(input("Ingrese la cantidad del prestamo: "))
except ValueError:
    print("Error: Se ha ingresado un valor invalido, Solo se aceptan numeros.")
    exit(1)

cuotas = 1 if prestamo < 2000 and prestamo >= 1 else 2 if prestamo >= 2000 and prestamo < 5000 else 3 if prestamo >= 5000 else 0
if cuotas == 0:
    print("Error: Se ha ingresado un valor invalido")
    exit(1)

impuestos = { "1": 0.03, "2": 0.06, "3": 0.09 }
impuesto = impuestos[str(cuotas)]
total = prestamo + prestamo * impuesto
print(f"El prestamo se hace en {cuotas} cuotas con un impuesto del {round(impuesto * 100)}% para un total de ${total:,.2f}")
