"""
Realizar un programa que solicite la categoria del producto (puede ser A, B, C),
la cantidad de unidades y el precio unitario, si la categoria es A o la cantidad
es mayor a 100 recibe un descuento del 12% en caso contrario solo un 3%.
"""

try:
    categoria = input("Ingrese la categoria (A, B, C) del producto: ").upper()
    if not categoria in ["A", "B", "C"]:
        print("Error: Solo se aceptan las categorias (A, B, C)")
        exit(1)
    cantidad = int(input("Ingrese la cantidad del producto: "))
    precio_unitario = float(input("Ingrese el precio unitario del producto: "))
except ValueError:
    print("Error: Se ha ingresado un valor invalido")
    exit(1)

descuento = 0.12 if categoria == "A" or cantidad >= 100 else 0.03
costo = precio_unitario * cantidad
costo_total = costo - costo * descuento

print(f"El descuento es de {round(descuento * 100)}% y con un costo total de {costo_total:,.2f}")

