from typing import overload
from pathlib import Path
from .data import Data
from ..exercise import Exercise, NameExercise

class DataExercise(Data[NameExercise, Exercise]):
  @overload
  def __init__(self, *paths: str | Path): ...
  @overload
  def __init__(self, *exercises: Exercise): ...
  def __init__(self, *args: str | Path | Exercise):
    super().__init__()
    args: list[str | Path | Exercise] = list(args)
    for arg in args:
      if type(arg) is str: arg = Path(arg)
      if isinstance(arg, Path):
        if arg.is_dir(): args.extend(arg.glob("**/*.txt"))
        if arg.is_file() and arg.suffix == ".txt": arg = Exercise(arg)
      if isinstance(arg, Exercise): self.add(arg.name, arg)
  
  
  @overload
  def get(self, name: NameExercise) -> Exercise: ...
  @overload
  def get(self, num: int) -> Exercise: ...
  def get(self, arg: int) -> Exercise:
    if not type(arg) is int: return super().get(arg)
    for exercise in self._data.values():
      if exercise.num == arg: return exercise
    raise KeyError("Num is not found in DataExercises")

  def __getitem__(self, __key: NameExercise | int) -> Exercise: return self.get(__key)
  
  
  