try:
    sueldo_base = float(input("Ingrese sueldo: "))
    numero_hijos = int(input("Ingrese el numero de hijos: "))
except ValueError:
    print("Error: haz ingresado un dato que es invaludo debe ser numerico")

bonificacion = 25000 * numero_hijos
pago = sueldo_base + bonificacion
print("El pago total al empleado es:", pago)

