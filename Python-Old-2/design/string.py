from typing import Literal

def fill_just_index(
  string: str,
  width: int,
  fillchar: str,
  justify: int
) -> str:
  string_fill = "".ljust(width, fillchar)
  return string_fill[:justify] + string + string_fill[justify:]

def fill(
  string: str,
  width: int,
  fillchar: str = " ",
  justify: Literal["start", "center", "end"] | int = "center",
) -> str:
  justify_dict = {
    "start": string.ljust,
    "center": string.center,
    "end": string.rjust
  }
  if type(justify) is int: string = fill_just_index(string, width, fillchar, justify)
  elif justify in justify_dict: string = justify_dict[justify](width, fillchar)
  return string

def strip(string: str, __chars: str | None = None) -> str:
  return string.strip(__chars)
  
