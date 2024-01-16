import math

"""
Realice un programa que pida 3 notas que esten en el rango 1 a 5 sino mande un error.
Controle los erroes de entrada.
"""

from typing import NoReturn

def is_numeric(value: str) -> bool:
  isDigit = value.isdigit()
  isReal = value.count(".", 1, -1) == 1 and value.replace(".", "").isdigit()
  return isDigit or isReal

for x in range(1, 4):
  note = input(f"Ingrese la nota {x}: ")
  err_msg = ""
  if not is_numeric(note): err_msg = "Error: Solo se aceptan numeros."
  elif (note := float(note)) < 1 or note > 5: err_msg = "Error: La nota debe estar en rango 1 a 5."
  if err_msg: 
    print(err_msg)
    break
  if note >= 3: print("APROVADO")
  else: print("REPROBADO")

