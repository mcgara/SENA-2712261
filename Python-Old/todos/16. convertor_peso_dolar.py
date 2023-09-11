try:
    tasa = float(input("Ingrese tasa de cambio de pesos colombianos a dolares: "))
    pesos = float(input("Ingrese la cantidad de pesos colombianos a dolares: "))
except ValueError:
    print("Haz ingresado un dato que no es valido, solo se aceptan numeros")

dolar = pesos / tasa
print(round(pesos, 2), "pesos colombianos a dolares son:", round(dolar, 2))

