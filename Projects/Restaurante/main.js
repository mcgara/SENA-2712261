import { runApp as app } from './index.js';

const commands = {
  database: process.argv[2]?.toLowerCase() === 'database',
  backend: process.argv[2]?.toLowerCase() === 'backend',
  frontend: process.argv[2]?.toLowerCase() === 'frontend',
  api: process.argv[2]?.toLowerCase() === 'api',
  app: process.argv[2]?.toLowerCase() === 'app',
}

if (Object.values(commands).includes(true)) {
  process.argv.splice(2, 1);
}

if (commands.database) app.runDataBase();
else if (commands.backend) app.runBackEnd();
else if (commands.frontend) app.runFrontEnd();
else if (commands.api) app.runAppApi();
else if (commands.app) app.runApp();
else app.runApp();
