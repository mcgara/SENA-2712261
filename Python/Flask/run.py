from flask import Flask
from utils import once_callable

def run_app(app: Flask) -> Flask:
  if not isinstance(app, Flask):
    raise TypeError("argument is not type Flask App")
  host = None
  port = None
  if "HOST" in app.config: host = str(app.config["HOST"])
  if "PORT" in app.config: port = int(app.config["PORT"])
  app.run(host, port)
  return app


def use_run_app(app: Flask):
  return once_callable(lambda: run_app(app))