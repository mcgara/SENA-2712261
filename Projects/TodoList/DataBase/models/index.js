import models from './models.js';
import UserModel from './User.js';
import TaskModel from './Task.js';

export const modelsFile = models.file;
export const modelsFilePath = models.filePath;
export const createModelsConnection = models.createConnection;
export const useModelsConnection = models.useConnection;

export const useUserModel = UserModel;
export const useTaskModel = TaskModel;

export default {
  modelsFile,
  modelsFilePath,
  createConnection: models.createConnection,
  useConnection: models.useConnection,
  useUser: useUserModel,
  useTask: useTaskModel
}
