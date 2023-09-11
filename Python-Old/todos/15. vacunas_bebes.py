try:
    peso = float(input("Ingrese el peso del bebe: "))
    meses = int(input("Ingrese los meses del bebe: "))
except ValueError:
    print("Error: haz ingresado un dato que no es valido, solo se ingresan numeros")
    exit(1)

dosis = (peso + 10) / (10 * meses) + 8
print(f"La dosis de vacuna para el bebe de un peso de {round(peso)} kg con {meses} meses es: {round(dosis, 2)} ml")

