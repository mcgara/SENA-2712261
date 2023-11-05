from flask import Flask, Config
from utils import use_env, once_callable
from services.db.mysql import create_connection
from services.apps.sena import create_app_db
from routes.sena import create_routes
from run import run_app

APP_NAME = "SENA"
use_env = use_env("APP_" + APP_NAME)

@once_callable
def use_config(root_path: str):
  env = use_env()
  config_default = {
    **env
  }
  
  config = Config(root_path, defaults=config_default)
  return config

@once_callable
def use_app():
  app = Flask(__name__)
  config = use_config(app.root_path)
  app.config.update(config)
  app.name = APP_NAME
  return app

@once_callable
def use_mysqldb():
  app = use_app()
  mysql_connection = create_connection(app)
  return mysql_connection

@once_callable
def use_app_db():
  connection = use_mysqldb()
  appDB = create_app_db(connection)
  return appDB

@once_callable
def use_app_routes():
  app = use_app()
  appDB = use_app_db()
  appRoutes = create_routes(app, appDB)
  return appRoutes

@once_callable
def use_app_route_aprendiz():
  aprendiz = use_app_routes().use_aprendiz()
  aprendiz.setAllRoutes()
  return aprendiz

@once_callable
def use_app_route_programa():
  programa = use_app_routes().use_programa()
  programa.setAllRoutes()
  return programa

@once_callable
def use_run_app():
  app = use_app()
  use_app_db()
  use_app_routes()
  
  use_app_route_aprendiz()
  use_app_route_programa()
  
  run_app(app)
  return app

if __name__ == '__main__':
  use_run_app()

