from typing import Callable, ParamSpec, Any
import math
from data import get_lines
from utils import evaluate
from settings import DATA_RE_EQUATION

P = ParamSpec('P', )

def get_equation(__lineno: int) -> Callable[P, tuple[Any, ...] | None]:
  line_equation = "lambda " + get_lines("equations", __lineno)
  equation = evaluate(DATA_RE_EQUATION, line_equation, globals())
  def wrapper_equation(*args: Any) -> tuple[Any, ...] | None:
    if type(equation) is None: return
    try: data = equation(*args)
    except Exception: return
    return data if type(data) is tuple else tuple([data])

  return wrapper_equation

