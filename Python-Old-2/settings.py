from typing import Literal
from pathlib import Path
from .design import DS, Design

SECTION_MATCHS = Literal["prefix", "title", "sufix"]

FILE_EXERCISE_SECTION_START: dict[SECTION_MATCHS, str] = {
  "prefix": r"(^(?:PY|PYTHON)[\t ]+)?",
  "title": r"[A-Z]+[A-Z\t ]+",
  "sufix": r""
}

FILE_EXERCISE_SECTION_STOP: dict[SECTION_MATCHS, str] = {
  "prefix": r"(^(?:PY|PYTHON)[\t ]+)?",
  "title": r"[A-Z]+[A-Z\t ]+",
  "sufix": r""
}

EXERCISE_SECTIONS = Literal[
  "STATEMENT",
  "SHORT STATEMENT",
  "INPUT PROMPTS",
  "PROCESS",
  "OUTPUT MESSAGE"
]

FILE_EXERCISE_SECTIONS: dict[EXERCISE_SECTIONS, str] = {
  "STATEMENT": "ENUNCIADO",
  "SHORT STATEMENT": "ENUNCIADO CORTO",
  "INPUT PROMPTS": "MENSAJES DE ENTRADA",
  "PROCESS": "PROCESO",
  "OUTPUT MESSAGE": "MENSAJE DE SALIDA"
}

EXERCISE_DESIGN: dict[EXERCISE_SECTIONS, tuple[Design.STRUCT]] = {
  "STATEMENT": (DS.Strip(),),
  "SHORT STATEMENT": (DS.Strip(),),
  "OUTPUT MESSAGE": (DS.Strip(),)
}

PATH_ROOT = Path(__file__, "..", "..").resolve()
PATHS = {
  "DATA": Path(PATH_ROOT, "data"),
  "SQL": Path(PATH_ROOT, "SQL")
}
