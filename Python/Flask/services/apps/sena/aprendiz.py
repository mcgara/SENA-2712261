from typing import TypedDict
import services.db.mysql_common as common

class Aprendiz(TypedDict):
  id: int
  nombres: str
  apellidos: str
  genero: str
  correo: str
  id_programa: int

def aprendiz_findby_id(connection: common.Connection, id: int | str):
  callable = common.findby_id(connection, 'aprendiz')
  result: list[Aprendiz] = callable(id)
  aprendiz = None
  if len(result) == 1: aprendiz = result[0]
  return aprendiz


def create(connection: common.Connection):
  class AprendizDB:
    @staticmethod
    def findy_id(id: int | str):
      return aprendiz_findby_id(connection, id)
    
  return AprendizDB
