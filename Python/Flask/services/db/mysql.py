from flask import Flask
from flask_mysqldb import MySQL, MySQLdb

def create_connection(app: Flask) -> MySQLdb.Connection:
  mysql = MySQL(app)
  return mysql.connection

