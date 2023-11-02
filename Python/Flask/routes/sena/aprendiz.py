from flask import Flask, jsonify
from services.apps.sena import AppDB

def aprendiz_findby_id(app: Flask, appDB: AppDB):
  db = appDB.use_aprendiz()
  
  @app.route("/aprendiz/<id:int>")
  def findby_id(id: int | str):
    aprendiz = db.findy_id(id)
    response = { "error": "aprendiz not found" }
    if not aprendiz == None: response = aprendiz
    return jsonify(response)
  

def create(app: Flask, appDB: AppDB):
  class AprendizRoute:
    @staticmethod
    def findby_id():
      aprendiz_findby_id(app, appDB)

    @staticmethod
    def setAllRoutes():
      AprendizRoute.findby_id()
  
  return AprendizRoute
