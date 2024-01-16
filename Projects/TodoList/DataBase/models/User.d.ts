import { ModelsConnection } from './models.js';

export interface User {
  id: number
  name: string
  lastname: string
  username: string
  email: string
  password: string
  create_time: string
}

export function UserFindById(connection: ModelsConnection, id: number): Promise<User | null>

export function UserModel(connection: ModelsConnection): {
  findById: (id: number) => ReturnType<typeof UserFindById>
}

export default UserModel
