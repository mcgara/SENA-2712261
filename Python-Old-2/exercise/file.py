from typing import TypeVar, Generic
from pathlib import Path
from ..file import SelfFile, NameFile, SectionMatch, FileSection, FileRun, File
from ..settings import (
  EXERCISE_SECTIONS,
  FILE_EXERCISE_SECTIONS,
  FILE_EXERCISE_SECTION_START,
  FILE_EXERCISE_SECTION_STOP,
)

__all__ = [
  "NameFileExercise",
  "FileExerciseSection",
  "FileExerciseRun",
  "FileExercise"
]

T = TypeVar("T")

class NamesExerciseSection(Generic[T]):
  statement: T
  short_statement: T
  input_prompts: T
  process: T
  output_menssage: T
  

class FileExerciseSection(FileSection, NamesExerciseSection[str | None]):
  _file: SelfFile
  __cache: dict[EXERCISE_SECTIONS, str]
  
  def __init__(self, __file_exercise: SelfFile):
    super().__init__(
      __file_exercise,
      FILE_EXERCISE_SECTION_START,
      FILE_EXERCISE_SECTION_STOP,
    )
    self.__cache = {}


  def get_with_title(
    self,
    start_title: EXERCISE_SECTIONS,
    stop_title: str = FILE_EXERCISE_SECTION_STOP["title"],
  ) -> str | None:
    if start_title not in FILE_EXERCISE_SECTIONS: return
    if start_title not in self.__cache:
      start: SectionMatch = { "title": FILE_EXERCISE_SECTIONS[start_title] }
      stop: SectionMatch = { "title": stop_title }
      data = super().get(start, stop)
      if data: self.__cache[start_title] = data
    if start_title in self.__cache: return self.__cache[start_title]
  
  def update(self) -> None:
    self.__cache.clear()
    
  def __getitem__(self, __key: EXERCISE_SECTIONS | slice) -> str | None:
    data = self.get_with_title(__key)
    if data is None: data = self.get(__key)
    return data
  
  @property
  def statement(self):
    return self.get_with_title("STATEMENT")

  @property
  def short_statement(self):
    return self.get_with_title("SHORT STATEMENT")

  @property
  def input_prompts(self):
    return self.get_with_title("INPUT PROMPTS")

  @property
  def process(self):
    return self.get_with_title("PROCESS")

  @property
  def output_menssage(self):
    return self.get_with_title("OUTPUT MESSAGE")
  
  
# class FileExerciseAST(FileAST, NamesExerciseSection[str | None]):
#   pass

  
class FileExerciseRun(FileRun, NamesExerciseSection[bool]):
  _file: SelfFile

  def update(self) -> None:
    self._output = None
  
  
NameFileExercise = NameFile

class FileExercise(File):
  name: NameFileExercise
  section: FileExerciseSection
  run: FileExerciseRun
  
  def __init__(self,path: str | Path, name: NameFileExercise | None = None):
    super().__init__(path, name)
    self.section = FileExerciseSection(self)
    self.run = FileExerciseRun(self)
    
  def update(self) -> None:
    self.section.update()
    self.run.update()
    

SelfFileExercise = TypeVar("SelfFileExercise", bound=FileExercise)
