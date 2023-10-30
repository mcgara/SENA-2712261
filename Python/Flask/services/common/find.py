from flask_mysqldb import MySQLdb

Connections = MySQLdb.Connection

def findby_id(db: Connections, table_name: str):
  query = f"SELECT * FROM `{table_name}` WHERE `id` = ?"
  cursor: MySQLdb.cursors.Cursor = db.cursor()
  
  def find(id: int | str) -> list:
    cursor.execute(query, [id])
    results = list(cursor.fetchall())
    return results
  
  return find
