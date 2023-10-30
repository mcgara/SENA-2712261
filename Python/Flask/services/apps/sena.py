from typing import TypedDict
from services.common import find
from apps.sena import use_mysqldb
from utils import once_callable

class Aprendiz(TypedDict):
  id: int
  nombres: str
  apellidos: str
  genero: str
  correo: str
  id_programa: int

class Programa(TypedDict):
  id: int
  nombre: str

def use_db_aprendiz(db: find.Connections):
  use_aprendiz_findby_id = lambda: find.findby_id(db, 'aprendiz')

  def aprendiz_findby_id(id: int | str):
    callable = use_aprendiz_findby_id()
    result: list[Aprendiz] = callable(id)
    aprendiz = None
    if len(result) == 1: aprendiz = result[0]
    return aprendiz

