try:
    costo_parcela = float(input("Ingrese el costo e la parcela: "))
    pago_inicial = float(input("Ingrese el pago inicial del cliente: "))
except ValueError:
    print("Error: Se ha ingresado un valor invalido, solo se aceptan numeros.")
    exit(1)

cuotas = 24
impuesto = 0.20
restante = costo_parcela - pago_inicial
costo_total = restante + restante * impuesto
costo_cuota = costo_total / cuotas
print(f"El costo total de la parcela sin el pago inicial es de: {round(costo_total, 2)} a {cuotas} cuotas cada una es de: {round(costo_cuota, 2)}")
    
