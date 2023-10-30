from run import run_app
from apps.sena import use_app
from services.apps.sena import aprendiz_findby_id

def run_test():
  run_app(use_app)
  print('hello world')
  aprendiz_findby_id(0)
