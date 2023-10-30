from flask import Flask
from apps.sena import use_app, use_mysqldb
from services.apps.sena import use_aprendiz_findby_id

def use_route_aprendiz():
  app = use_app()
  db = use_mysqldb()

  
  @app.route("/aprendiz/<id:int>")
  def findby_id()
