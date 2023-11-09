from flask_mysqldb import MySQLdb

Connection = MySQLdb.Connection
Cursor = MySQLdb.cursors.Cursor

def findby_id(db: Connection, table_name: str):
  query = f"SELECT * FROM `{table_name}` WHERE `id` = %s"
  cursor: Cursor = db.cursor()
  
  def find(id: int | str) -> list:
    cursor.execute(query, [id])
    results = list(cursor.fetchall())
    db.commit()
    return results
  
  return find
