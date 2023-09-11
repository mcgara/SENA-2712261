try:
    minutos = int(input("Ingrese los minutos a convertir a segundos: "))
except ValueError:
    print("Error: Se ha ingresado un valor invaludo, solo se aceptan numeros.")
    exit(1)

segundos = minutos * 60
print(f"Convertir {minutos} minutos a segundos son: {round(segundos)}")

