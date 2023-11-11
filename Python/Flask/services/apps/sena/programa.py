from typing import TypedDict
import services.db.mysql_common as common
from utils import once_callable

class Programa(TypedDict):
  id: int
  nombre: str
  ficha: int

def findby_id(connection: common.Connection, id: int | str):
  callable = common.findby_id(connection, 'programa')
  result: list[Programa] = callable(id)
  programa = None
  if len(result) == 1: programa = result[0]
  return programa

@once_callable
def use_findby_id(connection: common.Connection):
  def _findby_id(id: int | str): return findby_id(connection, id)
  return _findby_id

class ProgramaDB:
  def findby_id(id: int | str) -> Programa | None: ...

def create_programa(connection: common.Connection) -> ProgramaDB:
  global ProgramaDB
  
  class ProgramaDB(ProgramaDB):
    findby_id = use_findby_id(connection)
  
  return ProgramaDB

