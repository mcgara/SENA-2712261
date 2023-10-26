from typing import Callable, overload
from flask import Flask

UseApp = Callable[[], Flask]

@overload
def run_app(app: Flask) -> None: ...
@overload
def run_app(use_app: UseApp) -> None: ...
def run_app(app: Flask | UseApp):
  if callable(app): app = app()
  host = None
  port = None
  if "HOST" in app.config: host = str(app.config["HOST"])
  if "PORT" in app.config: port = int(app.config["PORT"])
  app.run(host, port)

