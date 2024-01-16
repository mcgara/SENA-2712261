import { defaultDataBase } from './database.js';
import { useBackEnd } from './default.js';

await defaultDataBase.useDataBase();
useBackEnd();
