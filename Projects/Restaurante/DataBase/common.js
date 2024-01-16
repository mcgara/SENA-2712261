/**
 * @typedef {import('mysql2/promise').Connection} Connection
 * @typedef {import('mysql2').ConnectionConfig} ConnectionConfig
 * @typedef {Awaited<ReturnType<Connection['query']>>} QueryResults
 * @typedef {string | number} FieldType
 */

/**
 * @typedef {{ [x: string]: FieldType }} FieldsParam
 * @param {FieldsParam} fields
 * @return {[string[], FieldType[]]}
 */
export function normalizeFields(fields) {
  return [Object.keys(fields), Object.values(fields)]
}

/**
 * @param {string[]} fields
 * @param {(field: string, index: number, array: string[]) => string} callback
 * @param {string} [sep]
 */
export function formatQueryFields(fields, callback, sep) {
  return fields.map(callback).join(sep);
}

/**
 * @param {Connection} connection
 * @param {string} tableName
 * @param {Partial<FieldsParam>} [fields]
 * @return {Promise<QueryResults['0']>}
 */
export async function find(connection, tableName, fields) {
  const [arrayFields, arrayValues] = normalizeFields(fields);
  const queryFields = formatQueryFields(arrayFields, field => `\`${field}\` = ?`, ' AND ');
  const query = `SELECT * FROM \`${tableName}\`` + (queryFields ? ' WHERE ' + queryFields : '');
  const [result] = await connection.query(query, arrayValues);
  return result;
}

/**
 * @param {Connection} connection
 * @param {string} tableName
 * @param {string} pkName
 * @param {FieldType} pkValue
 */
export async function findByPk(connection, tableName, pkName, pkValue) {
  return await find(connection, tableName, { [pkName]: pkValue });
}

/**
 * @param {Connection} connection
 * @param {string} tableName
 * @param {FieldType} id
 */
export async function findById(connection, tableName, id) {
  return await findByPk(connection, tableName, 'id', id);
}

/**
 * @param {Connection} connection
 * @param {string} tableName
 * @param {FieldsParam | FieldsParam[]} fields
 * @return {Promise<QueryResults>}
 */
export async function create(connection, tableName, fields) {
  if (!Array.isArray(fields)) fields = [fields];
  const firstFields = fields[0];
  let msgErr = 'param fields must be type a object or array and not empy.';
  if (!firstFields || typeof firstFields !== 'object') throw TypeError(msgErr);
  
  const [arrayFields, arrayValues] = normalizeFields(firstFields);
  const [queryFields, queryValues] = [
    formatQueryFields(arrayFields, firstFields => `\`${firstFields}\``, ','),
    formatQueryFields(arrayValues, () => '?', ',')
  ];

  let queryAllValues = '';
  let arrayAllValues = [];
  msgErr = 'some value of fields not coincide with length self fields query'
  for (const _fields of fields) {
    const values_fields = Object.values(_fields);
    if (arrayValues.length !== values_fields.length) throw TypeError(msgErr);
    arrayAllValues = arrayAllValues.concat(...values_fields);
    queryAllValues += `(${queryValues}),`;
  }
  queryAllValues = queryAllValues.slice(0, -1);

  const query = `INSERT INTO \`${tableName}\`(${queryFields}) VALUES ${queryAllValues}`;
  return await connection.query(query, arrayAllValues);
}

/**
 * @param {Connection} connection
 * @param {string} tableName
 */
export function Common(connection, tableName) {
  return {
    /** @param {Parameters<find>['2']} fields */
    find: fields => find(connection, tableName, fields),
    /**
     * @param {Parameters<findByPk>['2']} pkName
     * @param {Parameters<findByPk>['3']} pkValue
    */
    findByPk: (pkName, pkValue) => findByPk(connection, tableName, pkName, pkValue),
    /** @param {Parameters<findById>['2']} id */
    findById: id => findById(connection, tableName, id),
    /** @param {Parameters<create>['2']} fields */
    create: fields => create(connection, tableName, fields),
  }
}

export default Common;
