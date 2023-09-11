from typing import Any
from .file import FileExerciseRun, SelfFileExercise
from ..design import design, DS
from ..utils.string import get_scopes_var_assign
from ..utils.input import input_type

def input_prompts(text: str) -> tuple[list[Any], dict[str, Any]]:
  scopes = get_scopes_var_assign(text)
  args = []
  locals = {}
  for var, type, prompt in scopes:
    try: type = eval(type)
    except: type = str

    prompt = design(prompt, DS.Strip("\n"))
    value = input_type(prompt, type)
    if var: locals[var] = value
    else: args.append(value)

  return (args, locals)
  
  
def process(
  __source: str,
  __globals: dict[str, Any],
  __locals: dict[str, Any]
) -> dict[str, Any]:
  exec(__source, __globals, __locals)
  return dict(locals())["__locals"]


class ExerciseRun(FileExerciseRun):
  _file: SelfFileExercise

  @property
  def statement(self) -> bool:
    return self._file.section.statement is not None

  @property
  def short_statement(self) -> bool:
    return self._file.section.short_statement is not None

  @property
  def input_prompts(self) -> bool:
    text = self._file.section.input_prompts
    if text is None: return False
    try: argv, locals = input_prompts(text)
    except: return False
    self._locals.update(locals)
    self._globals["argv"] = argv
    return True

  @property
  def process(self) -> bool:
    source = self._file.section.process
    success = True
    try: self._locals = process(source, self._globals, self._locals)
    except: success = False
    return success

  @property
  def output_menssage(self) -> bool:
    output = self._file.section.output_menssage
    success = True
    try: self._output = output.format(*self._globals["argv"], **self._locals)
    except: success = False
    return success

  def exercise(self, force: bool = False) -> str | None:
    if not self._output or force:
      self.input_prompts,
      properties = (
        self.process,
        self.output_menssage
      )
      if not all(properties): return
    return self._output
