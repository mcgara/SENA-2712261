from typing import overload, Generic, Callable, ParamSpec, TypeVar
from functools import wraps
from . import _design as Design, _struct as DS

__all__ = ["design", "Design", "DS"]

T = TypeVar("T")
P = ParamSpec("P")
R = TypeVar("R")

class Wrapper(Generic[P, R], Callable[P, R]): pass

@overload
def design(__object: T, /, *structs: Design.STRUCT) -> T: ...
@overload
def design(func: Callable[[], T], /, *structs: Design.STRUCT, wrap: bool = False) -> T: ...
@overload
def design(__func: Callable[P, T], /, *structs: Design.STRUCT) -> Wrapper[[Callable[P, T], Design.STRUCT], T]: ...
@overload
def design(*structs: Design.STRUCT) -> Wrapper[[Callable[P, T]], Wrapper[[Callable[P, T], Design.STRUCT], T]]: ...
def design(__obj: T, *structs: Design.STRUCT, wrap = True):
  if Design.is_struct(__obj):
    return lambda func: design(func, __obj, *structs)
    
  if callable(__obj):
    @wraps(__obj)
    def wrapper(*args, **kwargs) -> T:
      result: T = __obj(*args, **kwargs)
      return design(result, *structs)
    
    if wrap: return wrapper
    else: return wrapper()

  return Design.apply(__obj, *structs)

