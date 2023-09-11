from typing import Generic, TypeVar, Callable
from typing_extensions import Buffer
import ast

ReadableBuffer = Buffer
T = TypeVar("T", str | ReadableBuffer)
R = TypeVar("R")
ast.mod

class _AST(Generic[T]):
  _self: T
  _module: ast.Module | None
  
  def __init__(self, __self: T, *, filename: str | ReadableBuffer = "<unknown>", **kwargs):
    self._self = __self
    try: self._module = ast.parse(__self, filename, **kwargs)
    except: self._module = None
    
  def is_parsed(self) -> bool:
    return self._module is not None
    
  def update(self) -> bool:
    try: self._module = ast.parse(self._self)
    except: self._module = None
    return self.is_parsed()
  
  def map(self, func: Callable[[ast.stmt], R]) -> list[R]:
    if self._module is None: return []
    return list(map(func, self._module.body))


class Get:
  _self: _AST
  

