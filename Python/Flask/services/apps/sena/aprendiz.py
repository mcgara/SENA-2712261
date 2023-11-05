from typing import TypedDict
import services.db.mysql_common as common
from utils import once_callable

class Aprendiz(TypedDict):
  id: int
  nombres: str
  apellidos: str
  genero: str
  correo: str
  id_programa: int

def findby_id(connection: common.Connection, id: int | str):
  callable = common.findby_id(connection, 'aprendiz')
  result: list[Aprendiz] = callable(id)
  aprendiz = None
  if len(result) == 1: aprendiz = result[0]
  return aprendiz

@once_callable
def use_findby_id(connection: common.Connection):
  def _findby_id(id: int | str): return findby_id(connection, id)
  return _findby_id

class AprendizDB:
  def findby_id(id: int | str) -> Aprendiz | None: ...

def create_aprendiz(connection: common.Connection) -> AprendizDB:
  global AprendizDB
  
  class AprendizDB(AprendizDB):
    findby_id = use_findby_id(connection)
  
  return AprendizDB

