from flask import Flask, jsonify
from services.apps.sena import ProgramaDB
from utils import once_callable

def findby_id(app: Flask, db: ProgramaDB):
  @app.route("/programa/<int:id>")
  def programa_findby_id(id: int):
    programa = db.findy_id(id)
    response = { "error": "programa not found" }
    if not programa == None: response = programa
    return jsonify(response)
  
  # IDEA: return router cleaner handle


def setAllRoutes(app: Flask, db: ProgramaDB):
  findby_id(app, db)
  

class ProgramaRouter:
  def findby_id(): ...
  def setAllRoutes(): ...
  
def create_programa(app: Flask, db: ProgramaDB) -> ProgramaRouter:
  global ProgramaRouter
  
  class ProgramaRouter(ProgramaRouter):
    findby_id = once_callable(lambda: findby_id(app, db))
    setAllRoutes = once_callable(lambda: setAllRoutes(app, db))
    
  return ProgramaRouter
