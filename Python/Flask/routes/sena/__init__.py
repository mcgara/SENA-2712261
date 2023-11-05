from flask import Flask
from services.apps.sena import AppDB
from utils import once_callable

from .aprendiz import create_aprendiz, AprendizRouter
from .programa import create_programa, ProgramaRouter

def aprendiz_router(app: Flask, appDB: AppDB):
  db = appDB.use_aprendiz()
  return create_aprendiz(app, db)

def programa_router(app: Flask, appDB: AppDB):
  db = appDB.use_programa()
  return create_programa(app, db)

class AppRoutes:
  def use_aprendiz() -> AprendizRouter: ...
  def use_programa() -> ProgramaRouter: ...
  
def create_routes(app: Flask, appDB: AppDB) -> AppRoutes:
  global AppRoutes
  
  class AppRoutes(AppRoutes):
    use_aprendiz = once_callable(lambda: aprendiz_router(app, appDB))
    use_programa = once_callable(lambda: programa_router(app, appDB))

  return AppRoutes

