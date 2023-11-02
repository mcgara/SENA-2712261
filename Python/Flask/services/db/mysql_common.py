from flask_mysqldb import MySQLdb

Connection = MySQLdb.Connection

def findby_id(db: MySQLdb.Connection, table_name: str):
  query = f"SELECT * FROM `{table_name}` WHERE `id` = ?"
  cursor: MySQLdb.cursors.Cursor = db.cursor()
  
  def find(id: int | str) -> list:
    cursor.execute(query, [id])
    results = list(cursor.fetchall())
    return results
  
  return find
