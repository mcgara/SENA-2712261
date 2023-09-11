from typing import Any, NoReturn
from settings import ERROR_MSG

_ExitCode = str | int | None

def err_msg(err: str = "ERR", name: str = "") -> str:
  msg = f"{name}Error: "
  iskey = lambda k: k in ERROR_MSG.keys()
  if not iskey(err) and err: msg = err if not name else msg + err + "."
  if not err: err = "ERR"
  if iskey(err): msg += ERROR_MSG[err] + "."
  return msg
  
  
def error_to_exit(
  __err: str = "ERR",
  __name_err: str = "",
  __exit: _ExitCode = 1
) -> NoReturn:
	print("\n" + err_msg(__err, __name_err))
	exit(__exit)


def conditions_error(
  *conditions: Any,
  err: str = "ERR",
  name: str = "",
  code: _ExitCode = 1
) -> NoReturn | None:
  conditions = [not condition for condition in conditions]
  if len(conditions) == 0 or all(conditions): return
  error_to_exit(err, name, code)

