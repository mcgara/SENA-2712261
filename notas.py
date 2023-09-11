import re

s = """
Calcular el area de un ciruculo = PI * r ** 2.

ENUNCIADO

Calcular area de un circulo.

MENSAJES

radio = Ingrese el radio del
  circulo:

PROCESO

import math

lado: str = radio ** 2 * math.pi

MENSAJE DE TEXTO

El area del circulo es
asdfdsaf
asHdf
PY HA HY
asdf


{radio:.2f} metros cuadrados.

"""

# RE_SCOPE_TEXT = r"^(?P<text>.+(?:\n*\Z|\n+^[\t ]+.+$|$)+)+"
# RE_SCOPE_VAR_ASSIGN = r"^(?:(?:(?P<var>[a-zA-Z_]+\d*[a-zA-Z_]*)[\t ]*)?"
# RE_SCOPE_VAR_ASSIGN += r"(?::[\t ]*" + RE_SCOPE_VAR_ASSIGN.replace("var", "type")[4:-1] + r")?"
# RE_SCOPE_VAR_ASSIGN += r"=[\t ]*)?" + RE_SCOPE_TEXT[1:]

# print(re.compile(RE_SCOPE_VAR_ASSIGN, re.M).findall(s))

import ast


path = "./Ejercicios/test.txt"

# with open(path) as f:
#   file_ast = ast.parse("".join(f.readlines()), filename=path)
#   print(ast.dump(file_ast, indent=4))
  # a: list[ast.Assign] = list(filter(lambda x: isinstance(x, ast.Assign), file_ast.body))
  # b = ast.get_docstring(file_ast)
  # print(b)
  
print(ast.parse('330'))
