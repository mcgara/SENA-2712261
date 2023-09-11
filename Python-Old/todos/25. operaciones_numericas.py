"""
Pedir al usuario un número, si el número es positivo, pedir otro y calcular
las operaciones básicas: suma, resta, multiplicacion, división. 12
"""

try:
    numero1 = int(input("Ingrese un numero: "))
    if not numero1 >= 0:
        print("Error: El numero debe ser positivo")
        exit(1)
    numero2 = int(input("Ingrese otro numero: "))
except ValueError:
    print("Error: Se ha ingresado un valor invalido, solo se aceptan numeros.")
    exit(1)

print(f"""
La suma es igual a {numero1 + numero2}
La resta es igual a {numero1 - numero2}
La multiplicacion es igual a {numero1 * numero2}
La division es igual a {numero1 // numero2}
""")
