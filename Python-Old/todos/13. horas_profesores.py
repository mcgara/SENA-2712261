precio_hora = 20000
descuento = 0.05

try:
    horas = int(input("Ingrese el numero de horas: "))
except ValueError:
    print("Haz ingresado un valor que no es valido; ingrese numeros que representan las horas")
    exit(1)

monto = precio_hora * horas
descuento_total = monto * descuento
monto_total = monto - descuento_total
print("El descuento es:", descuento_total)
print("El monto total a pagar es:", monto_total)

