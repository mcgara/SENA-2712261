from flask import Flask, jsonify, request
from services.apps.sena import AprendizDB
from utils import once_callable

def find(app: Flask, db: AprendizDB):
  @app.route("/aprendiz")
  def aprendiz_find():
    fields = request.args.to_dict()
    aprendiz = db.find(fields)
    response = { "error": "aprendiz not found" }
    if not aprendiz == None: response = aprendiz
    return jsonify(response)
  
def findby_id(app: Flask, db: AprendizDB):
  @app.route("/aprendiz/<int:id>")
  def aprendiz_findby_id(id: int):
    aprendiz = db.findby_id(id)
    response = { "error": "aprendiz not found per id" }
    if not aprendiz == None: response = aprendiz
    return jsonify(response)
  
  # IDEA: return router cleaner handle

def create(app: Flask, db: AprendizDB):
  @app.route("/aprendiz")
  def aprendiz_create():
    fields = request.args.to_dict()
    db.create(fields)
    response = { "create": "aprendiz create" }
    return jsonify(response)

def setAllRoutes(app: Flask, db: AprendizDB):
  find(app, db)
  findby_id(app, db)
  create(app, db)

class AprendizRouter:
  @staticmethod
  def find(): ...
  @staticmethod
  def create(): ...
  @staticmethod
  def findby_id(): ...
  @staticmethod
  def setAllRoutes(): ...
  
def create_aprendiz(app: Flask, db: AprendizDB) -> AprendizRouter:
  global AprendizRouter
  
  class AprendizRouter(AprendizRouter):
    find = once_callable(lambda: find(app, db))
    findby_id = once_callable(lambda: findby_id(app, db))
    create = once_callable(lambda: create(app, db))
    setAllRoutes = once_callable(lambda: setAllRoutes(app, db))
    
  return AprendizRouter
