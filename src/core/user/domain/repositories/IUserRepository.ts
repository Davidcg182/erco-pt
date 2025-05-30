import { User } from '../entities/User';

export interface IUserRepository {
  save(user: User): Promise<void>;
  findByLogin(login: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
} 