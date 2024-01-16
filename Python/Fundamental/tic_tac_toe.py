import random

tic_tac = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]



def play_or_exit(data: str):
    if data.lower() in ["exit", "quit", "e"]:
        print("Fin del juego".ljust(10, "-").rjust(10, "-"))
        exit(0)
    isdigit = data.isdigit() 
    if not isdigit :
        print("Error: Solo se aceptan numeros.")
        exit(1)
    if isdigit and ((n := int(data)) < 1 and n > 10):
        print("Error: El numero debe ser del 1 al 9.")
        print(1)
    return n
    

while True:
    usuario = input("Ingrese el numero de la casilla (1-9) o ingrese (exit) para salir: ")
    play_or_exit(usuario)

