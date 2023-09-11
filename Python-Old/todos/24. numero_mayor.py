"""
Calcular el mayor de dos números enteros introducidos por teclado.
"""

try:
    numero1 = int(input("Ingrese el primer numero: "))
    numero2 = int(input("Ingrese el segundo numero: "))
except ValueError:
    print("Error: Se ha ingresado un valor invalido, solo se aceptan numeros.")
    exit(1)

msg = "El numero mayor es: "
msg += f"{numero1}" if numero1 > numero2 else f"{numero2}"
print(msg)
