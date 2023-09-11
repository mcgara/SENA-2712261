from typing import Literal, NoReturn, Any, LiteralString, Mapping
import re
from handle_errors import conditions_error, error_to_exit
from settings import (
  ERROR_MSG,
  INPUT_IS_DEFAULT,
  INPUT_PROMPT_PREFIX,
  INPUT_PROMPT_POSFIX
)

def __is_type(
  value: str,
  __is: Literal["integer", "float", "number", "string"] = "string"
) -> str | float | int:
  if __is == "string": return value
  if __is == "number": __is = "float"
  number = float if __is == "float" else int
  return number(value)

def input_is(
  __prompt: object = "",
  __is: Literal["integer", "float", "number", "string"] = INPUT_IS_DEFAULT,
  __prefix: str = INPUT_PROMPT_PREFIX,
  __posfix: str = INPUT_PROMPT_POSFIX,
  __err_msg: str = ""
) -> str | int | float | NoReturn:
  
  value = input(f"{__prefix}{__prompt}{__posfix}")
  isnegative = value.count("-") == 1
  # value = value if not isnegative else value.replace("-", "")
  isdigit = value.isdigit()
  isreal = value.count(".", 1, -1) == 1 and value.replace(".", "").isdigit()
  
  expressions = not (
    (__is == "integer" and isdigit) or \
    (__is == "float" and isreal) or \
    (__is == "number" and (isdigit or isreal)) or \
    __is == "string"
  )
  if not expressions: return __is_type(value, __is)
  if isnegative: __err_msg = ERROR_MSG["NSN"]
  if not __err_msg:
    __err_msg = ERROR_MSG["NAN"]
    if __is == "integer": __err_msg += ERROR_MSG["NAN:INT"]
    if __is == "float": __err_msg += ERROR_MSG["NAN:FLOAT"]
  conditions_error(expressions, err=__err_msg, name="InputIs" + __is.capitalize())


def evaluate(
  pattern: str | re.Pattern[str],
  __source: str | LiteralString,
  __globals: dict[str, Any] | None = None,
  __locals: Mapping[str, object] | None = None,
) -> Any:
  if re.search(pattern, __source) is None: error_to_exit("EVA:VF", "Evaluate")
  value = None
  try: value = eval(__source, __globals, __locals)
  except Exception: error_to_exit("EVA:SOURCE", "Evaluate")

  return value

