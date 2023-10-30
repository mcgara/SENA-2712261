from flask import Flask, Config
from utils import use_env, once_callable
from services.db.mysql import create_connection

__all__ = ["use_config", "use_env", "APP_NAME", "use_app"]

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
  mysql = create_connection(app)
  return mysql
