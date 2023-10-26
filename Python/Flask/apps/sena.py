from flask import Flask, Config
from utils import use_env, once_callable

__all__ = ["use_config", "use_env", "APP_NAME", "use_app"]

APP_NAME = "sena"
use_env = use_env("APP_" + APP_NAME.upper())

def use_config(root_path: str):
  env = use_env()
  
  config_default = {
    **env
  }
  
  config = Config(root_path, defaults=config_default)
  return config

use_config = once_callable(use_config)

def use_app():
  app = Flask(__name__)
  config = use_config(app.root_path)
  app.config.update(config)
  return app
  
use_app = once_callable(use_app)
