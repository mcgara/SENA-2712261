import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const pathDB = path.join(__dirname, 'SENA-2712261.json');

export default JSON.parse(readFileSync(pathDB, { encoding: 'utf-8' }));
