import * as common from '../common.js'
import { logger } from '../utils.js';

/**
 * @typedef {import('./connection.js').ModelConnection} ModelConnection
 * @typedef {import('./types.js').ITableModel} ITableModel
 * @typedef {import('./types.js').ITableModelID} ITableModelID
 * @typedef {import('./types.js').TableModelNames} TableModelNames
 */

/**
 * @template T
 * @template [U=undefined]
 * @param {() => Promise<T>} callback
 * @param {U} [defaultValue]
 * @return {Promise<T | U>}
 */
export async function Execute(callback, defaultValue) {
  let value = defaultValue;
  
  try {
    value = await callback();
  } catch (err) {
    logger.log.error('DATABASE: ', err.message ?? '\ntraceback: ' + err);
    throw err;
  }
  return value;
}

/**
 * @template {TableModelNames} T
 * @param {ModelConnection} connection
 * @param {T} tableName
 * @param {Partial<ITableModel[T]>} [fields]
 * @return {Promise<ITableModel[T][]>}
 */
export function find(connection, tableName, fields) {
  return Execute(async () => await common.find
    (await connection, tableName, fields), []
  );
}

/**
 * @template {TableModelNames} T
 * @param {ModelConnection} connection
 * @param {T} tableName
 * @param {string} pkName
 * @param {ITableModelID[T]} pkValue
 * @return {Promise<ITableModel[T][]>}
 */
export function findByPk(connection, tableName, pkName, pkValue) {
  return Execute(async () => await common.findByPk
    (await connection, tableName, pkName, pkValue), []
  );
}

/**
 * @template {TableModelNames} T
 * @param {ModelConnection} connection
 * @param {T} tableName
 * @param {ITableModelID[T]} id
 * @return {Promise<ITableModel[T][]>}
 */
export function findById(connection, tableName, id) {
  return Execute(async () => await common.findById
    (await connection, tableName, id), []
  );
}

/**
 * @template {TableModelNames} T
 * @param {ModelConnection} connection
 * @param {T} tableName
 * @param {ITableModel[T] | ITableModel[T][]} fields
 */
export function create(connection, tableName, fields) {
  return Execute(async () => await common.create
    (await connection, tableName, fields), [[], Object()]
  );
}

/** @template {TableModelNames} T */
export class CommonModel {
  /**
   * @param {ModelConnection} connection
   * @param {T} tableName
   */
  constructor(connection, tableName) {
    this.connection = connection;
    this.tableName = tableName;
  }

  /** @param {Partial<ITableModel[T]>} [fields] */
  find(fields) {
    return find(this.connection, this.tableName, fields);
  }
  /**
   * @param {Parameters<typeof findByPk>['2']} pkName
   * @param {Parameters<typeof findByPk>['3']} pkValue
  */
  findByPk(pkName, pkValue) {
    return findByPk(this.connection, this.tableName, pkName, pkValue);
  }
  /** @param {ITableModelID[T]} id */
  findById(id) {
    return findById(this.connection, this.tableName, id);
  }
  /** @param {ITableModel[T]} fields */
  create(fields) {
    return create(this.connection, this.tableName, fields);
  }
}

export default CommonModel;
