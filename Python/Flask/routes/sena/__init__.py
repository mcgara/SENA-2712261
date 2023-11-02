from flask import Flask
from services.apps.sena import AppDB
from utils import once_callable

import aprendiz
import programa

class AppRoutes:
  app: Flask
  appDB: AppDB

  def __init__(self, app: Flask, appDB: AppDB):
    self.app = app
    self.appDB = appDB
  
  @once_callable
  def use_aprendiz(self):
    return aprendiz.create(self.app, self.appDB)

  @once_callable
  def use_programa(self):
    return programa.create(self.app, self.appDB)

