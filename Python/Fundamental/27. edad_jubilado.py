"""
Pida al usuario la edad y el género, para que la computadora diga si se puede jubilar,
para hombres se jubilan a los 60 años y mujeres 54 años.
"""

try:
    edad = int(input("Ingrese la edad: "))
    genero = input("Ingrese el genero (F, M): ").upper()
    if not genero in ["F", "M"]:
        print("Error: solo se puede colocar F de genero femenino y M de genero masculino.")
        exit(1)
except ValueError:
    print("Error: Se ha ingresado un valor invalido.")
    exit(1)

edad_jubilado = 54 if genero == "F" else 60
print("Usted", "SI" if edad >= edad_jubilado else "NO", "puede jubilarse")
