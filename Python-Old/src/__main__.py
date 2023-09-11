from utils import input_is, conditions_error
from prompts import get_data
from equations import get_equation
from data import get_lines, eval_line
from desing import fill, statement

print("\n" + fill(" Ejercicios "))

short_state = statement("".join(get_lines("short_statements")))
print("\n" + short_state)

# TODO: add commands like "??" for show complet statements and more commands "--", "1?"
lineno: int = input_is("el numero del ejercicio", "integer")
select_state = get_lines("short_statements", lineno).replace("\"", "")
print("\n" + fill(f" {lineno}. {select_state} ") + "\n")
data = get_data(lineno)
equation = get_equation(lineno)
result = equation(*data)
msg = eval_line("prints", lineno)

conditions_error(
  data is None,
  result is None,
  msg is None,
  err="Los datos o la operacion de ecucaciones estan mal",
  name="RunMain"
)

print("\n" + msg.format(*result))
print("\n" + fill(f" Fin del Ejercicio {lineno} "))

# TODO: add doc strings to all functions.
