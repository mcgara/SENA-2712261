"""Realize un programa que solicite el valor unitario de un producto y la cantidad de este, si lleva mas de 10 articulos se le aplica un descuento del 5%, sino no aplica dicho descuento."""

try:
    valor_unitario = float(input("Ingrese el valor unitario del producto: "))
    cantidad = int(input("Ingrese la cantidad de productos: "))
except ValueError:
    print("Error: Se ha ingresado un valor que no es valido, solo se aceptan numeros.")
    exit(1)

costo = valor_unitario * cantidad

if cantidad >= 10:
    descuento = costo * 0.05
else:
    descuento = 0

print(f"El costo total es: {round(costo - descuento, 2)} y con un descuento del {round(descuento, 2)}")

