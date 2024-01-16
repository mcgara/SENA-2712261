/** @typedef {import('./common').ConnectionConfig} ConnectionConfig */

/** @type {ConnectionConfig} */
export const defaultConnectionConfig = {
  database: 'restaurant_database',
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  debug: false
}

export function createConnectionConfig() {
  /** @type {ConnectionConfig} */
  let connectionConfigEnv = {
    database: process.env['DB_NAME'],
    host: process.env['DB_HOST'],
    port: process.env['DB_PORT'],
    user: process.env['DB_USER'],
    password: process.env['DB_PASSWORD'],
    debug: process.env['DB_DEBUG']
  }
  
  connectionConfigEnv = Object.fromEntries(
    Object.entries(connectionConfigEnv)
      .reduce((p, c) => c[1] ? [...p, c] : p, [])
  );
  
  const connectionConfig = {
    ...defaultConnectionConfig,
    ...connectionConfigEnv
  }

  return connectionConfig;
}

export default createConnectionConfig;
