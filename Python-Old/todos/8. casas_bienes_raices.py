"""Una empresa de bienes y raices ofrece casas de interes social bajo las siguientes condiciones:

si los ingresos del comprador son menores o iguales a $800.000 la cuota inicial sera de 15 % del costo
de la casa y el resto se distribuira en pagos mensuales, a pagar en diez años.

Si los ingresos del comprador son de mas $800.000 la cuota inicial sera del 30 % del costo de la casa y 
el resto de distribuira en pagos mensuales en 7 años.

La empresa quiere obtener cuanto debe pagar un comprador por concepto de cuota inicial y 
cuanto por cada pago inicial.
"""

try:
    costo_casa = float(input("Ingrese el costo de la casa: "))
    ingreso_comprador = float(input("Ingrese el ingreso del comprador: "))
except ValueError:
    print("Error: Se ha ingresado un valor invalido, solo se aceptan numeros.")
    exit(1)

if ingreso_comprador <= 800000:
    cuota_inicial = costo_casa * 0.15
    pago_años = 10
else:
    cuota_inicial = costo_casa * 0.3
    pago_años = 7

pago_parcial = (costo_casa - cuota_inicial) / (12 * pago_años)

print(f"El precio de la cuota inicial es: ${round(cuota_inicial, 2)}, y el pago por cuota es de: ${round(pago_parcial, 2)}")

