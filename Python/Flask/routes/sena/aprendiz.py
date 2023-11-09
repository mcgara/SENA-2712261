from flask import Flask, jsonify
from services.apps.sena import AprendizDB
from utils import once_callable

def findby_id(app: Flask, db: AprendizDB):
  @app.route("/aprendiz/<int:id>")
  def aprendiz_findby_id(id: int):
    aprendiz = db.findby_id(id)
    response = { "error": "aprendiz not found" }
    if not aprendiz == None: response = aprendiz
    return jsonify(response)
  
  # IDEA: return router cleaner handle


def setAllRoutes(app: Flask, db: AprendizDB):
  findby_id(app, db)
  

class AprendizRouter:
  def findby_id(): ...
  def setAllRoutes(): ...
  
def create_aprendiz(app: Flask, db: AprendizDB) -> AprendizRouter:
  global AprendizRouter
  
  class AprendizRouter(AprendizRouter):
    findby_id = once_callable(lambda: findby_id(app, db))
    setAllRoutes = once_callable(lambda: setAllRoutes(app, db))
    
  return AprendizRouter
