print("----- Programa para hallar el area de un triangulo rectangulo -----\n")

while True:
    try:
        base = int(input("Ingrese la base del triangulo: "))
        altura = int(input("Ingrese la altura del triangulo: "))
        area = base * altura / 2
        print("El area de el triangulo es:", area, "\n")
    except ValueError:
        print("\n!!!Usted a ingresado un dato que no es un numero, por lo que no es valido!!!\n")
