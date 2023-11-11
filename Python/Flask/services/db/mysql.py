from flask import Flask
from flask_mysqldb import MySQL, MySQLdb

default_config = {
  "MYSQL_DB": "",
  "MYSQL_HOST": "localhost",
  "MYSQL_PORT": 3306,
  "MYSQL_USER": "root",
  "MYSQL_PASSWORD": "root"
}

def create_connection(app: Flask) -> MySQLdb.Connection:
  app.app_context().push()
  temp_config = app.config.copy()
  port = int(app.config.get("MYSQL_PORT") or 3306)
  app.config.update({ **default_config, **temp_config, "MYSQL_PORT": port })
  mysql = MySQL(app)
  return mysql.connection

