from services.db.mysql_common import Connection
from utils import once_callable

import aprendiz
import programa

class AppDB:
  connection: Connection

  def __init__(self, connection: Connection):
    self.connection = connection
  
  @once_callable
  def use_aprendiz(self):
    return aprendiz.create(self.connection)

  @once_callable
  def use_programa(self):
    return programa.create(self.connection)

