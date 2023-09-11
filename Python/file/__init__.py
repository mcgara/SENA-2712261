from pathlib import Path
from io import FileIO
from . import section

NameFile = str

class File:
  name: NameFile
  path: Path
  IO: FileIO
  text: str
  
  def __init__(self, path: Path | str, name: NameFile = None):
    self.__path = path if isinstance(path, Path) else Path(path)
    self.__name = name or self.path.name.replace(self.path.suffix, "")
    self.__IO = FileIO(self.path)
    self.__text = ""
    
  @property
  def name(self) -> NameFile:
    return self.__name
  
  @name.setter
  def name(self, NewName: NameFile) -> None:
    if NewName: self.__name = NewName

  @property
  def path(self) -> Path:
    return self.__path
  
  @property
  def IO(self) -> FileIO:
    return self.__IO

  @property
  def text(self) -> str:
    if not self.__text: self.__text = self.IO.readall().decode()
    return self.__text
  
  @text.deleter
  def text(self) -> None:
    self.__text = ""
    
  def section(self) -> str:
    section.get(self.text, )


f = File('./test.txt') 
print(f.text)

  