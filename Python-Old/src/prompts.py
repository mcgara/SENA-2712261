from typing import Any
from data import eval_line
from utils import input_is

def get_data(__lineno: int) -> tuple[Any, ...] | None:
  prompts = eval_line("prompts", __lineno)
  if prompts is None: return
  if not type(prompts) is list: prompts = [prompts]

  return tuple([
    input_is(prompt) if not type(prompt) is tuple else input_is(*prompt) \
      for prompt in prompts
  ])

