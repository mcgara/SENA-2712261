from typing import TypeGuard, Callable, TypeVar
from ._struct import *
from ._struct import __all__ as structure_names

__all__ = ["is_struct", "get_key", "apply", "structure_names", "STRUCT", "STRUCTS"]

from .string import *

T = TypeVar("T")
STRUCTS = tuple[T, ...]
STRUCT = Fill | Strip

def is_struct(value: object) -> TypeGuard[STRUCT]:
  return isinstance(value, tuple) and (
    hasattr((obj := type(value)), "__name__") and\
      type(obj.__name__) is str and\
        obj.__name__ in structure_names
  )
  
def get_name_struct(struct: STRUCT) -> str | None:
  if not is_struct(struct): return
  return type(struct).__name__

def __apply(value: T, struct: STRUCT) -> T:
  if (key := get_name_struct(struct)):
    function: Callable[[T, STRUCT], T] = globals()[key.lower()]
    try: value = function(value, *struct)
    except: pass
  return value

def apply(value: T, *structs: STRUCT) -> T:
  for struct in structs: value = __apply(value, struct)
  return value

