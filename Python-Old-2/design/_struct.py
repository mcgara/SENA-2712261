from typing import NamedTuple as __NT, Literal as _Literal

__all__ = list(locals())

class Fill(__NT):
  width: int
  fillchar: str = " "
  justify: _Literal["start", "center", "end"] | int = "center"

class Strip(__NT):
  chars: str | None = None
  

__all__ = [cls for cls in locals() if cls not in __all__]
__all__.pop(__all__.index("__all__"))
