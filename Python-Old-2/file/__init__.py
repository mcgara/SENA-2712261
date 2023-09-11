from typing import SupportsIndex, TypeVar
from pathlib import Path
from ._file import File as _File, NameFile, SelfFile
from .section import (
  Section,
  SectionMatch,
  SectionStruct,
  SECTION_DEFAULT_MATCH
)
from .run import Run, RUN_DEFAULT_GLOBALS

__all__ = [
  "SectionMatch",
  "SectionStruct",
  "SECTION_DEFAULT_MATCH",
  "RUN_DEFAULT_GLOBALS",
  "NameFile",
  "SelfFile",
  "FileSection",
  # "FileAST",
  "FileRun",
  "File"
]

class FileSection(Section):
  def __init__(
    self,
    __file: SelfFile,
    start: SectionMatch | None = None,
    stop: SectionMatch | None = None
  ):
    super().__init__(__file)
    if type(start) is dict: self._start.update(start)
    if type(stop) is dict: self._stop.update(stop)


# class FileAST(Generic[T], AST[T]): pass

class FileRun(Run): pass

class File(_File):
  section: FileSection
  run: FileRun
  
  def __init__(self, path: str | Path, name: NameFile | None = None):
    super().__init__(path, name)
    self.section = FileSection(self)
    self.run = FileRun(self)
  
  def __getitem__(self, __key: SupportsIndex | slice) -> str | None:
    if type(__key) is int or (type(__key) is slice and type(__key.start) is int):
      try: return self.text[__key]
      except: pass
    return self.section[__key]


SelfFile = TypeVar("SelfFile", bound=File)

