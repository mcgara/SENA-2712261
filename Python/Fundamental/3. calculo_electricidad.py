try:
    costo_kw = float(input("Ingrese el costo del KM: "))
    lectura_anterior = float(input("Ingrese la lectura de KW anterior: "))
    lectura_actual = float(input("Ingrese la lectra de KW actual: "))
except ValueError:
    print("Error: Se ha ingresado un valor invalido, solo se aceptan numeros.")
    exit(1)

consumo = lectura_actual - lectura_anterior
precio_consumo = consumo * costo_kw
print("El precio del consumo es:", round(precio_consumo, 2))

