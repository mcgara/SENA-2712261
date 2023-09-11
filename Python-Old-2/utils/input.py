from typing import TypeVar, Type

T = TypeVar("T")

def input_type(
  __prompt: object = "",
  __type: Type[T] = str,
  err_msg: str | None = ""
) -> T:
  value = input(__prompt)
  if err_msg == "": err_msg = "Could not convert value to type spec."

  try: return __type(value)
  except: assert err_msg, "InputError: " + err_msg
  
  return value

