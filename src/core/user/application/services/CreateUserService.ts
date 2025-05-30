import { User } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

export class CreateUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(
    name: string,
    balance: number,
    login: string,
    password: string
  ): Promise<User> {
    // Verificar si ya existe un usuario con ese login
    const existingUser = await this.userRepository.findByLogin(login);
    if (existingUser) {
      throw new Error('Ya existe un usuario con ese login');
    }

    // Crear el usuario
    const user = await User.create(name, balance, login, password);

    // Guardar el usuario
    await this.userRepository.save(user);

    return user;
  }
} 