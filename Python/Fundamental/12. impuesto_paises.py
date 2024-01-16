"""
Imprimir el impuesto a pagar y el precio de venta incluido el impuesto, si el origen en Alemania el impuesto
es de 33%, si en Japon el impuesto es de 40%, si en Italia es de 23% y si en USA el impuesto es 15%.
"""

try:
    precio = float(input("Ingrese el precio del producto: "))
    pais = int(input(
"""--- Nro. |    Pais   | Impuesto ---
    1    |  Alemania |   33%
    2    |   Japon   |   40%
    3    |   Italia  |   23%
    4    |    USA    |   15%
    
Ingrese el numero (Nro.) del pais para aplicar impuesto: """))
except ValueError:
    print("Error: Se ha ingresado un valor invalido, solo se aceptan numeros.")
    exit(1)

if not pais in range(1, 5):
    print("Error: solo se puede seleccionar de 1 a 4 cada uno corresponde a su pais.")
    exit(1)

impuestos = [0.33, 0.4, 0.23, 0.15]
impuesto = precio * impuestos[pais - 1]
pago = precio + impuesto

print(f"El impuesto a pagar es: ${impuesto:,.2f} y el precio de venta es: ${pago:,.2f}")

