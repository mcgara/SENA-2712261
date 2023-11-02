from flask import Flask, jsonify
from services.apps.sena import AppDB

def programa_findby_id(app: Flask, appDB: AppDB):
  db = appDB.use_programa()
  
  @app.route("/programa/<id:int>")
  def findby_id(id: int | str):
    programa = db.findy_id(id)
    response = { "error": "programa not found" }
    if not programa == None: response = programa
    return jsonify(response)
  

def create(app: Flask, appDB: AppDB):
  class ProgramaRoute:
    @staticmethod
    def findby_id():
      programa_findby_id(app, appDB)

    @staticmethod
    def setAllRoutes():
      ProgramaRoute.findby_id()
  
  return ProgramaRoute
