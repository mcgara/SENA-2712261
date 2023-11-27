from flask import Flask, jsonify, request
from services.apps.sena import ProgramaDB
from utils import once_callable

def find(app: Flask, db: ProgramaDB):
  @app.route("/programa")
  def programa_find():
    fields = request.args.to_dict()
    list_programa = db.find(fields)
    response = { "error": "programa not found" }
    if not list_programa == None: response = list_programa
    return jsonify(response)
  
def findby_id(app: Flask, db: ProgramaDB):
  @app.route("/programa/<int:id>")
  def programa_findby_id(id: int):
    programa = db.findby_id(id)
    response = { "error": "programa not found per id" }
    if not programa == None: response = programa
    return jsonify(response)
  
  # IDEA: return router cleaner handle

def create(app: Flask, db: ProgramaDB):
  @app.route("/programa", methods=["POST"])
  def programa_create():
    fields = request.args.to_dict()
    db.create(fields)
    response = { "create": "programa create" }
    return jsonify(response)

def setAllRoutes(app: Flask, db: ProgramaDB):
  find(app, db)
  findby_id(app, db)
  create(app, db)

class ProgramaRouter:
  @staticmethod
  def find(): ...
  @staticmethod
  def create(): ...
  @staticmethod
  def findby_id(): ...
  @staticmethod
  def setAllRoutes(): ...
  
def create_programa(app: Flask, db: ProgramaDB) -> ProgramaRouter:
  global ProgramaRouter
  
  class ProgramaRouter(ProgramaRouter):
    find = once_callable(lambda: find(app, db))
    findby_id = once_callable(lambda: findby_id(app, db))
    create = once_callable(lambda: create(app, db))
    setAllRoutes = once_callable(lambda: setAllRoutes(app, db))
    
  return ProgramaRouter
