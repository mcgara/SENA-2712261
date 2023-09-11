from pathlib import Path
from re import findall as re_findall
from .file import FileExercise, NameFileExercise
from .section import ExerciseSection
from .run import ExerciseRun

__all__ = ["ExerciseSection", "ExerciseRun", "NameExercise", "Exercise"]

NameExercise = NameFileExercise  

class Exercise(FileExercise):
  name: NameExercise
  num: int | None
  section: ExerciseSection
  run: ExerciseRun

  @classmethod
  def get_num(cls, name: NameExercise) -> int | None:
    find = re_findall(r"^(\d+)[\. -_\t].*$", name)
    if len(find) > 0: return int(find[0])
    
  def __init__(
    self,
    path: str | Path,
    name: NameExercise | None = None,
    num: int | None = None
  ):
    super().__init__(path, name)
    if num is None: num = self.get_num(self.name)
    self.num = num
    self.section = ExerciseSection(self)
    self.run = ExerciseRun(self)
