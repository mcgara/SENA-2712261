from typing import overload
from pathlib import Path
from .exercise import Exercise, NameExercise
from .db import DataExercise
from .design import design, DS
from .utils.input import input_type
from .settings import PATHS

def run_exercise(
  path: str | Path,
  name: NameExercise | None = None,
  num: int | None = None
) -> None:
  exercise = Exercise(path, name, num)
  print(exercise.section.statement)
  print(exercise.section.short_statement)
  print(exercise.run.exercise())


# TODO: structure this function conceptually the execution parts through the DB class
@overload
def run_exercises(*excercise: Exercise) -> None: ...
@overload
def run_exercises(*paths: Path | str) -> None: ...
def run_exercises(*args: Path | str | Exercise) -> None:
  db = DataExercise(*args)
  if not len(db): return
  
  short_statements = db.map(lambda e: str(e.num) + ". " + e.section.short_statement)
  short_statements = "    " + "\n    ".join(short_statements)
  design_fill = DS.Fill(80, "-")

  print("\n" + design(" Ejercicios Python ", design_fill) + "\n")
  print(short_statements)
  while True:
    num = input_type("\nIngrese el nro. de un ejercicio para seleccionarlo: ", int)
    print()
    exercise = db.get(num)
    title_exercise = f" {str(num)}. {exercise.section.short_statement} "
    print(design(title_exercise, design_fill) + "\n")
    output = exercise.run.exercise(True)
    print("\n" + output + "\n")
    print(design(f" Fin del Ejercicio nro. {num} ", design_fill) + "\n")

    op = input_type("Continuar con otro ejercicio (por defecto: SI | NO)?: ")
    print("\n" + design("", design_fill))
    if op.lower() in ["n", "no"]: break


def run(*argv, **settings) -> None:
  argv = [*argv]
  if len(argv) == 0: argv.append(PATHS["DATA"])
  run_exercises(*argv)
  

if __name__ == "__main__":
  run()

  