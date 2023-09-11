try:
    cantidad_personas = int(input("Ingrese la cantidad de personas: "))
    dias = int(input("Ingrese la cantidad de dias de viaje: "))
except ValueError:
    print("Error: Se ha ingresado un valor que no es valido, solo se ingresa numeros.")
    exit(1)

costo_persona = 125000
monto = costo_persona * cantidad_personas * dias
monto_total = monto + monto * 0.12
print(f"El monto total a pagar por el viaje por {dias} dias con {cantidad_personas} personas y un IVA del 12% es: {round(monto_total, 2)}")

