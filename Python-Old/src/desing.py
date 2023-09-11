from typing import Literal
from handle_errors import error_to_exit


def fill(
    __str: str = "",
    __msg_justify: Literal["start", "center", "end"] | int = "center",
    __width: int = 100,
    __fillchar: str = "-"
) -> str:
  justify_index = lambda w, fc: (s := "".ljust(w, fc))[:__msg_justify] + __str + s[__msg_justify:]
  justify_dict = {
    "start": __str.ljust,
    "center": __str.center,
    "end": __str.rjust
  }
  
  err_msg = ""
  if (isindex := type(__msg_justify) is int) and (__msg_justify > __width and __str):
    err_msg = "El tamaño debe ser mayor que el justificado del mensaje."
  elif not isindex and not __msg_justify in justify_dict.keys(): 
    err_msg = "El justificado no coincide con un numero o 'start' o 'center' o 'end'."
  if err_msg: error_to_exit(err_msg, "DesingFill")

  justify = justify_index if isindex else justify_dict[__msg_justify]
  return justify(__width, __fillchar)


def statement(value: str, space: int = 3) -> str:
  return (s := " " * space) + value.replace("\"", "").replace("\n", "\n" + s)
