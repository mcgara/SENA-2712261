from typing import SupportsIndex, TypeVar
from pathlib import Path

NameFile = str

class File:
  path: Path
  name: NameFile
  text: str
  
  def __init__(self, path: str | Path, name: NameFile | None = None):
    if type(path) is str: path = Path(path)

    err_msg = ""
    if not path.exists(): err_msg = f"File not found: {path:!r}"
    elif not path.is_file(): err_msg = f"File not is a file: '{path:!r}'"
    if err_msg: raise FileNotFoundError(err_msg)

    self.path = path
    self.name = name if name and type(name) is str else None
    if self.name is None and type(self.path.name) is str:
      self.name = self.path.name
      self.name = self.name.replace(self.path.suffix, "")
    else: self.name = "<unknown>"
      
    self.__text = ""

  @property
  def text(self) -> str:
    if not self.__text: self.__text = self.path.read_text()
    return self.__text
  
  def __str__(self) -> str:
    return self.text
  
  def __getitem__(self, __key: SupportsIndex | slice) -> str | None:
    if type(__key) is int or (type(__key) is slice and type(__key.start) is int):
      try: return self.text[__key]
      except: pass


SelfFile = TypeVar("SelfFile", bound=File)

