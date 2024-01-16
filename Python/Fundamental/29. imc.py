"""
El indice de masa corporal es una formula para medir el nivel de obesidad de una persona
por medio del peso entre la altura al cuadrado.
Crea un programa que muestre al usuario un mensaje segun estos niveles de IMC:
< 18.5 bajo peso, 18.5-24.9 normal, 25-29.9 sobrepeso, 30-34.9 obesidad I,
35-39.9 obesidad II, 40-49.9 obesidad III, > 50 obesidad IV
"""

err_msg = "Error: Se ha ingresado un valor invalido"

try:
    peso = float(input("Ingrese el peso en kilos de la persona: "))
    altura = float(input("Ingrese la altura en metros de la persona : "))
except ValueError:
    print(f"{err_msg}, solo se aceptan numeros.")
    exit(1)

imc = peso / (altura * altura)

imc_msg = ["Bajo Peso", "Normal", "Sobrepeso", "Obesidad I", "Obesidad II", "Obesidad III", "Obesidad IV"]
expresiones = [
    imc < 18.5 and imc > 0,
    imc >= 18.5 and imc < 25,
    imc >= 25 and imc < 30,
    imc >= 30 and imc < 35,
    imc >= 35 and imc < 40,
    imc >= 40 and imc < 50,
    imc > 50, True
]

index = expresiones.index(True)
if index == 7:
    print(f"{err_msg}, solo se pueden ingresar numeros enteros o reales positivos.")
    exit(1)

print(f"El indice de masa corporal \"IMC\" de la persona es {round(imc, 2)} por lo que se clasifica como: {imc_msg[index]}")
