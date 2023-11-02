from typing import TypedDict
import services.db.mysql_common as common

class Programa(TypedDict):
  id: int
  nombre: str

def findby_id(connection: common.Connection, id: int | str):
  callable = common.findby_id(connection, 'programa')
  result: list[Programa] = callable(id)
  programa = None
  if len(result) == 1: programa = result[0]
  return programa

def create(connection: common.Connection):
  class ProgramaDB:
    @staticmethod
    def findy_id(id: int | str):
      return findby_id(connection, id)
    
  return ProgramaDB
