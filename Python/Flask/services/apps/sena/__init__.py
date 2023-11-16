from services.db.mysql_common import Connection
from utils import once_callable

from .aprendiz import create_aprendiz, AprendizDB
from .programa import create_programa, ProgramaDB

class AppDB:
  def use_aprendiz() -> AprendizDB: ...
  def use_programa() -> ProgramaDB: ...

def create_app_db(connection: Connection) -> AppDB:
  global AppDB
  
  class AppDB(AppDB):
    use_aprendiz = once_callable(lambda: create_aprendiz(connection))
    use_programa = once_callable(lambda: create_programa(connection))
  
  return AppDB
