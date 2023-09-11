try:
    edad1 = int(input("Ingrese la 1ra edad: "))
    edad2 = int(input("Ingrese la 2da edad: "))
    edad3 = int(input("Ingrese la 3ra edad: "))
except ValueError:
    print("Error: Se ha ingresado un dato invalido, solo se aceptan numeros.")
    exit(1)

promedio_edad = (edad1 + edad2 + edad3) // 3
print("La edad promedio es:", promedio_edad)

