"""
---------------- Ejercicios de algoritmos PDF - nivel PRO :) ----------------

    1. Realice un algoritmo para determinar el area de un cuadrado.
    2. Calcular el area de un ciruculo = PI * r ** 2.
    3. Calcular el volumen de una esfera = 4/3 * PI * r ** 3.
    4. Calcular el volumen de un cono = 1/3 * PI * r ** 2 * h.
    5. Calcular el volumen de un cubo = C ** 3.
    6. Realice un algoritmo para determinar el area de un rectangulo.
    7. Convertir de minutos a segundos.
    8. Convertir de temperatura Celsius a temperatura Fahrenheit (Temp. Fahrenheit = (9 / 5 * tempCels) + 32).
    9. Convertir de temperatura Fahrenheit a temperatura Celsius (Temp. Celsius = (tempFah - 32) * 5 / 9).
    10. Calcular el interes Compuesto de un deposito realiazado en varios años (Interes Compuesto = deposito * (1 + %) ** años.
    11. Realice un algoritmo para determinar el monto a pagar por un corte de tela.
    12. Una empresa paga a sus empleados ademas del sueldo base mas una bonificacion especial de $80.000 col. por cada hijo.
        Realice un algoritmo que determine el monto de la bonificacion y el monto total a pagar al trabajor.
    13. Un banco da a sus ahorristas un interes del 1.5% sobre el monto ahorrado. Teniendo como dato de entrada
        el saldo inicial del ahorrista determine el saldo final.
    14. Una Institucion educativa le paga a sus profesores $20.000 col. la hora y le hace un descuento del 5% por concepto de caja de ahorro.
        Determine el monto del descuento y el monto total a pagar a el profesor.
    15. Una inmobiliaria vende terrenos a $80.000 col. el metro cuadrado. El cliente debe dar una inicial y el resto lo paga en 12 cuotas.
        Determine el monto de cada cuota.
    16. Teniendo como dato de entrada un monto en peso colombiano, realice un algoritmo que muestre el equivalente en dolares (dolar = $4.350 col)
    17. En un centro de comunicaciones alquilan tarjetas para realizar llamadas y cobran el monto consumido de la tarjeta mas un cargo del 20%.
        Teniendo como dato de entrada el monto inicial y el monto final de la tarjeta, determine el costo de la llamada.
    18. En una fototienda cobran por el revelado de un rollo a $1.500 col. por cada foto. Realice un algoritmo que determine
        el monto a pagar por un revelado sabiendo que adicionalmente cobran el IVA (12%).
    19. Un taxi cobra por una carrera $5.000 col. por kilometro recorrido y $2.000. por minuto. Determine el monto a pagar por una carrera.
    20. Una empresa le hace los siguientes descuentos sobre el sueldo base a sus trabajadores: 1% por ley de politica habitacional,
        4% por Seguro Social, 0.5% por seguro pero forzoso y 5% por caja de ahorro. Realice un algoritmo que determine el monto
        de cada descuento y el monto total a pagar al trabajador.
    21. Jardines la Paz vende parcelas a credito, donde el cliente da una inicial y el resto lo paga en 24 cuotas,
        pero con un incremento del 20% sobre lo que quedo debiendo. Teniendo como dato de entrada el precio de la parcela,
        determine el monto de cada cuota y el precio final de la parcela.

"""

"""
------------------------------ Declaraciones ------------------------------
"""

from typing import Literal, Any, NoReturn
import math

ejercicios = [
    "Determinar area de un cuadrado",
    "Calcular area de un circulo",
    "Calcular el volumen de una esfera",
    "Calcular el volumen de un cono",
    "Calcular el volumen de un cubo",
    "Determinar el area de un rectangulo",
    "Convertir de minutos a segundos",
    "Convertir temperatura de Celsius a Fahrenheit",
    "Convertir temperatura de Fahrenheit a Celsius",
    "Calcular interes compuesto de un deposito",

    "Calcular corte de tela segun su costo",
    "Calcular el salario total y bonificacion de un trabajador segun la cantidad de hijos",
    "Calcaular el saldo final de un ahorrista de un banco con un interes del 1.5%",
    "Determinar el monto de descuento y total al profesor segun las horas de trabajo",
    "Determinar el monto de cada cuota segun el precio de los terrenos de una mobiliaria",
    "Convertir de pesos colombianos a dolares",
    "Determinar el costo de llamada segun el monto inicial y final de la tarjeta",
    "Determinar el monto a pagar por el revelado de una foto con un IVA del 12%",
    "Determinar el monto a pagar a un taxista por los kilomtros y los minutos",
    "Calcular sueldo total y cada descuento a un trabajador",
    "Determinar el monto de cada cuota y el total de las parcelas"
]

lista_peticiones = [
    "la medida de un lado del cuadrado",
    "el radio del circulo",
    "el radio de la esfera",
    [
        "el radio del cono",
        "la altura del cono"
    ],
    "la medida de un lado del cubo",
    [
        "la base del rectangulo",
        "la altura del rectangulo"
    ],
    "los minutos a convertir",
    "los grados Celsius de la temperatura",
    "los grados Fahrenheit de la temperatura",
    [
        "el monto a depositar $",
        "la tasa de interes anual % (0 - 100)",
        "la cantidad de años de inversion"
    ],
    [
        "el costo por metro del corte",
        "la medida del corte de tela en metros"
    ],
    [
        "el salario a pagar al trabajador",
        "la cantidad de hijos del trabajador"
    ],
    "el saldo inicial del ahorrista",
    "la cantidad de horas de trabajo del profesor",
    [
        "la cantidad de metros cuadrados",
        "el monto de la cuota inicial"
    ],
    "el monto en pesos colombianos",
    [
        "El monto inicial de la tarjeta",
        "El monto final de la tarjeta"
    ],
    "la cantidad de fotos tomadas",
    [
        "la cantidad de kilometros recorridos",
        "la cantidad de minutos transcurridos"
    ],
    "el sueldo base del trabajador",
    [
        "el precio de la parcela",
        "la cuota inicial del pago de la parcela"
    ]
]

lista_mensajes = [
    "El area del cuadrado es {:.2f} metros cuadrados",
    "El area del circulo es {:.2f} metros cuadrados",
    "El volumen de la esfera es {:.2f} metros cubicos",
    "El volumen del cono es {:.2f} metros cubicos",
    "El volumen del cubo es {:.2f} metros cubicos",
    "El area del rectangulo es {:.2f} metros cuadrados",
    "La cantidad de {:.0f} minutos a segundos son {:.0f}",
    "La cantidad de grados {:.0f}° Celsius a Fahrenheit son {:.0f}°",
    "La cantidad de grados {:.0f}° Fahrenheit a Celsius son {:.0f}°",
    "La cantidad recibida al final del periodo del interes compuesto es de ${:,.2f}",
    "El precio total de un corte de {:.1f} metros es ${:,.2f}",
    "La bonificacion es de ${:,.2f} para un salario total de ${:,.2f}",
    "El saldo final de ahorrista con un interes del 1.5% es de ${:,.2f}",
    "El descuento es de ${:,.2f} y el pago al profesor es de ${:,.2f}",
    "El monto por cada cuota del terreno son ${:,.2f}",
    "El monto de pesos colombianos a dolares son ${:,.2f} US",
    "El costo de la llamada es de ${:,.2f}",
    "El monto a pagar por el revelado de las fotos es ${:,.2f}",
    "El precio de la carrera en el taxi es ${:,.2f}",
    "Estos son los descuentos:\
    \n  1% ley de politica habitacional: ${:,.2f}\
    \n  4% Seguro Social: ${:,.2f}\
    \n  0.5% seguro pero forzado: ${:,.2f}\
    \n  5% caja de ahorro: ${:,.2f}\
    \nPara un sueldo total de ${:,.2f}",
    "El monto de cada cuota son ${:,.2f} para un precio final de ${:,.2f}"
]

"""
------------------------------ Manejo de Errores ------------------------------
"""

msg_errs = [
    "Se ocurrido un problema.",
    "Solo se aceptan numeros.",
    "No se ha seleccionado un ejercicio."
]

def error_to_exit(
    __msg: str | int = 0,
    __exit: int = 1
) -> NoReturn:
    """Esta funcion se encarga de ejecutar un mensaje de error si se ha producido alguno
        y sale del programa.

    Args:
        __msg (str | int, optional): Este parametro puede recibir un indice de la lista
            de mensajes de errores o una cadena que contenga dicho mensaje. Default: 0
        
        __exit (bool | int, optional): Este parametro recibe entero para salir del
            programa con un codigo de de salida. Default: 1
    """
    
    if type(__msg) is int and __msg <= len(msg_errs) - 1: __msg = f"Error: {msg_errs[__msg]}"
    if __msg == "": __msg == f"Error: {msg_errs[0]}"
    print("\n" + __msg)
    exit(__exit)

"""
------------------------------ Proceso logico ------------------------------
"""

def ecuaciones(__opcion: int, *d: list[Any]) -> list[Any]:
    """Esta funcion tiene almacenado todas las ecuaciones y mantene el orden
    de cada ecuacion con su indice al correspondiente a cada enunciado
    del los ejercicios.

    Args:
        __opcion (int): Este parametro es el indice del listado de ecuaciones por
            lo que selecciona la ecuacion correspondiente.
        
        *d (list[Any]): Este parametro contiene todos los datos que se van a usar en
            las ecuaciones el orden es importante.

    Returns:
        list[Any]: Esta funcion retorna una lista con todos los resultados.
    """
    
    listado_ecuaciones = [
        lambda: d[0] ** 2,
        lambda: d[0] ** 2 * math.pi,
        lambda: d[0] ** 3 * 4 / 3 * math.pi,
        lambda: d[0] ** 2 * d[1] * 1 / 3 * math.pi,
        lambda: d[0] ** 3,
        lambda: d[0] * d[1],
        lambda: [d[0], d[0] * 60],
        lambda: [d[0], 9 / 5 * d[0] + 32],
        lambda: [d[0], (d[0] - 32) * 5 / 9],
        lambda: d[0] * (1 + d[1] / 100) ** d[2],
        lambda: [d[1], d[0] * d[1]],
        lambda: [(b := d[1] * 80000), d[0] + b],
        lambda: d[0] + d[0] * 0.015,
        lambda: [(des := (p := 20000 * d[0]) * 0.05), p - des],
        lambda: (80000 * d[0] - d[1]) / 12,
        lambda: d[0] * 4350,
        lambda: (m := d[1] - d[0]) + m * 0.2,
        lambda: (m := 1500 * d[0]) + m * 0.12,
        lambda: 5000 * d[0] + 2000 * d[1],
        lambda: [
            (d1 := d[0] * 0.01),
            (d2 := d[0] * 0.04),
            (d3 := d[0] * 0.005),
            (d4 := d[0] * 0.05),
            d[0] - (d1 + d2 + d3 + d4)
        ],
        lambda: [(m := (d[0] - d[1]) * 0.2) / 24, d[0] + m]
    ]
    
    ecuacion = listado_ecuaciones[__opcion - 1]
    resultados = ecuacion()
    return resultados if type(resultados) is list else [resultados]


def input_num(
    __prompt: object = "", __msg_err: str | None = None
) -> int | float:
    """Esta funcion es el la entrada de los numeros, convierte el texto directamente
    a un numero tanto entero como flotante, sino es numerico produce el error.

    Args:
        __prompt (object, optional): mensaje que aparece en el prompt. Defaults to "".
        
        __msg_err (str | None, optional): mensaje de error que aparece si se produce.
            Defaults to "Error: Solo se aceptan numeros".

    Returns:
        int | float: retorna un entero o un flotante.
    """
    
    value = input(__prompt)
    isreal = value.count(".", 1, -1) == 1 and value.replace(".", "").isdigit()
    if value.isdigit() or isreal: return float(value) if isreal else int(value)
    err = 1 if __msg_err is None else __msg_err
    error_to_exit(err)


def peticiones(__opcion: int) -> tuple[Any, ...]:
    """Esta funcion se encarga de ejecutar las entradas por teclado y guardarlos
    en una tupla segun el listado de peticiones.

    Args:
        __opcion (int): Es el indice con el que se estrae la peticion de la lista de peticiones.
        
    Returns:
        typle[Any, ...]: Retorna una tupla con todos los datos de las entradas.
    """
    
    peticion = lista_peticiones[__opcion - 1]
    if not type(peticion) is list: peticion = [peticion]
    ig = "Ingrese "
    
    return [
        input(f"{ig}{item[0]}: ") if item[1] == str else input_num(f"{ig}{item[0]}: ") \
            if type(item) is list else input_num(f"{ig}{item}: ") \
                for item in peticion
    ]

"""
------------------------------ Diseño en el Prompt (Terminal) ------------------------------
"""

REPEAT_DESING_LINE = 100

def design_line(
    __fillchar: str = "-",
    __msg: str = "",
    __fill_repeat: int = REPEAT_DESING_LINE,
    __msg_justify: Literal["start", "center", "end"] | int = "center"
) -> str:
    """La funcion permite diseñar una linea como si fuera un "horizontal rule"
    donde se puede colocar caracteres repetidos de relleno y un mensaje como titulo.

    Args:
        __fillchar (str, optional): Este parametro es donde se coloca los caracteres
            que rellenan el espacio. Default: "-"
        
        __msg (str, optional): Este parametro sirve para asignar un mensaje a la linea.
            Default: ""

        __fill_repeat (int, optional): Este parametro asigna cuantas veces se va a repetir
            "__fillchar". Default: REPEAT_DESING_LINE
        
        __msg_justify (Literal["start", "center", "end"], int, optional): Este parametro
            permite justificar el mensaje en "__msg". Default: "center"
        
    Returns:
        str: Esta funcion retorna la cadena completa de la linea diseñada segun los parametros.
    """
    
    repeat = 0 if (msg_len := len(__msg)) >= __fill_repeat else (__fill_repeat - msg_len) // len(__fillchar)
    if repeat % 2 != 0: repeat += 1
    fill = __fillchar * repeat
    if fill == "": return __msg
    j = __msg_justify
    if j == "start": __msg = __msg + fill
    if j == "end": __msg = fill + __msg
    if j == "center": j = r if (r := repeat // 2) % 2 == 0 else r - 1
    if type(j) is int: __msg = f"{fill[:j]}{__msg}{fill[- (repeat - j):]}"
    return __msg


"""
------------------------------ Ejecucion del programa ------------------------------
"""

print("\n" + design_line("-", " Ejercicios "))
print("\n   " + "\n   ".join([f"{i + 1}. {ejercicios[i]}." for i in range(len(ejercicios))]))

opcion = int(input_num("\nIngrese el numero del ejercicio para seleccionarlo: "))
if not opcion in range(1, len(ejercicios) + 1): error_to_exit(2)

print("\n" + design_line("-", f" {opcion}. {ejercicios[opcion - 1]} ") + "\n")

datos = peticiones(opcion)
resultados = ecuaciones(opcion, *datos)
print("\n" + lista_mensajes[opcion - 1].format(*resultados))
print("\n" + design_line("-", f" Fin del ejercicio {opcion} "))
