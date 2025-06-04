import { User } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

export class AuthenticateUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(login: string, password: string): Promise<User> {
    const user = await this.userRepository.findByLogin(login);
    
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      throw new Error('Credenciales inválidas');
    }

    return user;
  }
} 