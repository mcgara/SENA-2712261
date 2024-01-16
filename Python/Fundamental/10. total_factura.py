"""Elabora un algoritmo que lea el total a pagar de una factura y determine el total a pagar
segun los siguientes criterios:

factura menor de 20.000 -> sin descuento
factura mayor igual de 20.000 15% de descuento
"""

try:
    total_factura = float(input("Ingrese el total de la factura: "))
except ValueError:
    print("Error: Se ha ingresado un valor invalido, solo se aceptan numeros.")
    exit(1)

total = total_factura - total_factura * 0.15 if total_factura >= 20000 else total_factura
print(f"El total de la factura es: ${total:,.2f}")

