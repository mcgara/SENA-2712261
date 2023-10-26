from flask import Flask
from flask_mysqldb import MySQL, MySQLdb
from utils import once_callable

def create_connection(app: Flask) -> MySQLdb.Connection:
  mysql = MySQL(app)
  return mysql.connection

