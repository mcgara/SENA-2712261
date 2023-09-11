from typing import Literal

ERROR_MSG = {
  "ERR": "Ha ocurrido un problema",
  "NAN": "Solo se aceptan numeros",
  "NAN:INT": " y solo enteros",
  "NAN:FLOAT": " y solo reales",
  "NSN": "No se aceptan numeros con signo negativo",
  "EVA": "No se podido evaluar el codigo",
  "EVA:VF": "No se podido verificar el codigo como confiable",
  "EVA:SOURCE": "No se podido evaluar el codigo Python",
  "EVA:EQ": "No se podido evaluar la ecuacion",
}

INPUT_PROMPT_PREFIX = "Ingrese "
INPUT_PROMPT_POSFIX = ": "
INPUT_IS_DEFAULT = "number"

DATA_PATH = "./data/"
DATA_NAMES = {"statements", "short_statements", "prints", "prompts", "equations"}
TYPE_DATA_NAMES = Literal["statements", "short_statements", "prints", "promtps", "equations"]

DATA_EVAL_TYPES = "integer|float|number|string"
DATA_GET_LINE_RE = "^\\d+\\.\\s*(.+)\\s*$"
DATA_RE = "^\\s*({})\\s*$"
DATA_RE_STR = "\"[^\"\\]\\)]*\""
DATA_RE_LIST = f"\\[\\s*({DATA_RE_STR})?(,\\s*{DATA_RE_STR})*\\s*\\]"
DATA_RE_TUPLE = f"\\(\\s*({DATA_RE_STR}),\\s*\"({DATA_EVAL_TYPES})\"\\s*\\)"
DATA_RE_LIST_TUPLE = "\\[\\s*({0}|{1}|{2})?(,\\s*({0}|{1}|{2}))*\\s*\\]".format(DATA_RE_STR, DATA_RE_LIST, DATA_RE_TUPLE)
DATA_RE_LIST_TUPLE = DATA_RE.format(DATA_RE_LIST_TUPLE)
DATA_RE_TUPLE = DATA_RE.format(DATA_RE_TUPLE)
DATA_RE_LIST = DATA_RE.format(DATA_RE_LIST)
DATA_RE_STR = DATA_RE.format(DATA_RE_STR)
DATA_RE = f"{DATA_RE_STR}|{DATA_RE_LIST}|{DATA_RE_TUPLE}|{DATA_RE_LIST_TUPLE}"

DATA_RE_EQUATION = "^(\\s*lambda(\\s+(\\w+)?(,\\s*\\w+)*)?\\s*:\\s*(.+)\\s*)$"

# TODO: add on DATA_RE_TUPLE a regular expression the pattern for PREFIX and POSFIX... args of utils.input_IS()
