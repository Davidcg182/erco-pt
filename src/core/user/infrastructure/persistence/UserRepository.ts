import { Knex } from 'knex';
import { User } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

export class UserRepository implements IUserRepository {
  constructor(private readonly knex: Knex) {}

  async save(user: User): Promise<void> {
    await this.knex('users').insert({
      id: user.getId(),
      name: user.getName(),
      balance: user.getBalance(),
      login: user.getLogin(),
      password: user.getPassword(),
      created_at: user.getCreatedAt()
    });
  }

  async findByLogin(login: string): Promise<User | null> {
    const userData = await this.knex('users')
      .where({ login })
      .first();

    if (!userData) return null;

    return User.create(
      userData.name,
      userData.balance,
      userData.login,
      userData.password
    );
  }

  async findById(id: string): Promise<User | null> {
    const userData = await this.knex('users')
      .where({ id })
      .first();

    if (!userData) return null;

    return User.create(
      userData.name,
      userData.balance,
      userData.login,
      userData.password
    );
  }
} 