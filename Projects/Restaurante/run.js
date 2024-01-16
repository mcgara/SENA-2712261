import { database, backend, frontend } from './index.js';

export async function runDataBase() {
  return await database.defaultDataBase.useDataBase();
}

export async function runBackEnd() {
  return backend.defaultBackEnd.useBackEnd();
}

export async function runFrontEnd() {
  return frontend.defaultFrontEnd.useFrontEnd();
}

export async function runAppApi() {
  await runDataBase();
  return await runBackEnd();
}

export function runApp() {
  runAppApi();
  runFrontEnd();
}
