import re

RE_SCOPE_TEXT = r"^(?P<text>.+(?:\n*\Z|\n+^[\t ]+.+$|$)+)+"
RE_SCOPE_VAR_ASSIGN = r"^(?:(?:(?P<var>[a-zA-Z_]+\d*[a-zA-Z_]*)[\t ]*)?"
RE_SCOPE_VAR_ASSIGN += r"(?::[\t ]*" + RE_SCOPE_VAR_ASSIGN.replace("var", "type")[4:-1] + r")?"
RE_SCOPE_VAR_ASSIGN += r"=[\t ]*)?" + RE_SCOPE_TEXT[1:]

def get_scopes(regex: str, string: str) -> list[str]:
  return re.compile(regex, re.M).findall(string)

def get_scopes_text(string: str) -> list[str]:
  return get_scopes(RE_SCOPE_TEXT, string)

def get_scopes_var_assign(string: str) -> list[tuple[str, str, str]]:
  return get_scopes(RE_SCOPE_VAR_ASSIGN, string)


def lines_to_string(lines: list[str]) -> str:
  if type(lines) is not list: lines = list(lines)
  return "\n".join(lines).strip()

