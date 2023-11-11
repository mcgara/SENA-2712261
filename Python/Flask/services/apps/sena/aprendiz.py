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

def find(connection: common.Connection, fields: Aprendiz):
  callable = common.find(connection, 'aprendiz')
  result: list[Aprendiz] = callable(*fields.items())
  return result

def findby_id(connection: common.Connection, id: int | str):
  callable = common.findby_id(connection, 'aprendiz')
  result: Aprendiz | None = callable(id)
  return result

def create(connection: common.Connection, fields: Aprendiz):
  callable = common.create(connection, 'aprendiz')
  callable(*fields.items())

@once_callable
def use_find(connection: common.Connection):
  def _find(fields: Aprendiz): return find(connection, fields)
  return _find

@once_callable
def use_findby_id(connection: common.Connection):
  def _findby_id(id: int | str): return findby_id(connection, id)
  return _findby_id

@once_callable
def use_create(connection: common.Connection):
  def _create(fields: Aprendiz): return create(connection, fields)
  return _create

class AprendizDB:
  @staticmethod
  def find(fields: Aprendiz) -> list[Aprendiz]: ...
  @staticmethod
  def findby_id(id: int | str) -> Aprendiz | None: ...
  @staticmethod
  def create(fields: Aprendiz) -> None: ...

def create_aprendiz(connection: common.Connection) -> AprendizDB:
  class AprendizDB:
    find = use_find(connection)
    findby_id = use_findby_id(connection)
    createe = use_create(connection)
  
  return AprendizDB

