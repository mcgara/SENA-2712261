from .file import FileExerciseSection
from ..design import design
from ..settings import EXERCISE_DESIGN

class ExerciseSection(FileExerciseSection):
  @property
  @design(*EXERCISE_DESIGN["STATEMENT"])
  def statement(self) -> str | None:
    return super().statement

  @property
  @design(*EXERCISE_DESIGN["SHORT STATEMENT"])
  def short_statement(self) -> str | None:
    return super().short_statement

  @property
  @design(*EXERCISE_DESIGN["OUTPUT MESSAGE"])
  def output_menssage(self) -> str | None:
    return super().output_menssage
  