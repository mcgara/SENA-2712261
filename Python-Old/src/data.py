from linecache import getline, getlines
import re
from utils import evaluate
from settings import (
  DATA_PATH,
  DATA_NAMES,
  TYPE_DATA_NAMES,
  DATA_GET_LINE_RE,
  DATA_RE
)


def get_lines(
  __file: TYPE_DATA_NAMES,
  __lineno: int | None = None
) -> str | list[str] | None:
  if not __file in DATA_NAMES: return
  
  get = getlines if (isnone := __lineno is None) else getline
  lines = get(DATA_PATH + f"{__file}.txt", __lineno)

  if not isnone:
    find = re.findall(DATA_GET_LINE_RE, lines)
    if not len(find) > 0: return
    lines = str(find[0])
  return lines


def eval_line(
  __file: TYPE_DATA_NAMES,
  __lineno: int
) -> str | list[str | tuple[str, int]] | None:
  __source = get_lines(__file, __lineno)
  if __source is None: return
  return evaluate(DATA_RE, __source)
  
