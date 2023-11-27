from typing import TypedDict
import services.db.mysql_common as common
from utils import once_callable

class Programa(TypedDict):
  id: int
  nombre: str
  ficha: int

def find(connection: common.Connection, fields: Programa):
  callable = common.find(connection, 'programa')
  result: list[Programa] = callable(**fields)
  return result

def findby_id(connection: common.Connection, id: int | str):
  callable = common.findby_id(connection, 'programa')
  result: Programa | None = callable(id)
  return result

def create(connection: common.Connection, fields: Programa):
  callable = common.create(connection, 'programa')
  callable(**fields)

@once_callable
def use_find(connection: common.Connection):
  def _find(fields: Programa): return find(connection, fields)
  return _find

@once_callable
def use_findby_id(connection: common.Connection):
  def _findby_id(id: int | str): return findby_id(connection, id)
  return _findby_id

@once_callable
def use_create(connection: common.Connection):
  def _create(fields: Programa): return create(connection, fields)
  return _create

class ProgramaDB:
  @staticmethod
  def find(fields: Programa) -> list[Programa]: ...
  @staticmethod
  def findby_id(id: int | str) -> Programa | None: ...
  @staticmethod
  def create(fields: Programa) -> None: ...

def create_programa(connection: common.Connection) -> ProgramaDB:
  class ProgramaDB:
    find = use_find(connection)
    findby_id = use_findby_id(connection)
    create = use_create(connection)
  
  return ProgramaDB

