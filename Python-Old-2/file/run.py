from typing import Any
from ._file import SelfFile

RUN_DEFAULT_GLOBALS = { "argv": [] }

class Run:
  _file = SelfFile
  _globals: dict[str, Any] = RUN_DEFAULT_GLOBALS
  _locals: dict[str, Any] = {}
  _output: str | None
  
  def __init__(self, __file: SelfFile, *argv, **globals):
    self._file = __file
    self._globals = globals
    self._globals["argv"] = argv
    self._locals = {}
    self._output = None
    
  def exec_attr(self, attr: str) -> bool:
    if not hasattr(self, attr): return False
    success = True
    attr = getattr(self, attr)
    if not callable(attr): return success
    try: attr()
    except: success = False
    return success
    
  def __getitem__(self, __key: str) -> bool:
    return self.exec_attr(__key)
      
