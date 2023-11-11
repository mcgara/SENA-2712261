from flask_mysqldb import MySQLdb

Connection = MySQLdb.Connection
Cursor = MySQLdb.cursors.Cursor

def normalize_fields(*fields: tuple[str, str | int]):
  list_fields: list[str] = []
  list_values: list[str | int] = []
  
  for field, value in fields:
    list_fields.append(field)
    list_values.append(value)
  
  return tuple(list_fields), tuple(list_values)

def find(db: Connection, table_name: str):
  cursor: Cursor = db.cursor()

  def _find(*fields: tuple[str, str | int]):
    fields_name, values_fields = normalize_fields(*fields)
    query_fiedls = [f"`{field}` = %s" for field in fields_name]
    query = f"SELECT * FROM `{table_name}` WHERE " + " AND ".join(query_fiedls)
    cursor.execute(query, values_fields)
    results = list(cursor.fetchall())
    db.commit()
    return results

  return _find

def findby_pk(db: Connection, table_name: str, pk_name: str):
  _find = find(db, table_name)
  def _find_pk(pk: int | str):
    results = _find((pk_name, pk))
    result = None
    if len(results) > 0: result = results[0]
    return result
  return _find_pk

def findby_id(db: Connection, table_name: str):
  _findby_pk = findby_pk(db, table_name, 'id')
  def _findby_id(id: int | str): return _findby_pk(id)
  return _findby_id

def parser_fields_query(*fields_name: str):
  query_fiedls = ""
  query_values = ""
  for field in fields_name:
    query_fiedls += f'`{field}`,'
    query_values += r'%s,'
  query_fiedls = query_fiedls[0, -1]
  query_values = query_values[0, -1]

  return query_fiedls, query_values

def create(db: Connection, table_name: str):
  cursor: Cursor = db.cursor()

  def _create(*fields: tuple[str, str | int]):
    fields_name, values_fields = normalize_fields(*fields)
    query_fields, query_values = parser_fields_query(*fields_name)
    query = f"INSERT INTO `{table_name}`({query_fields}) VALUES (${query_values})"
    cursor.execute(query, values_fields)
    db.commit()
    # return ??? resolve or exception
  return _create    
