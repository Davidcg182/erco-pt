import { Request, Response } from 'express';
import { CreateUserService } from '../../../../core/user/application/services/CreateUserService';
import { UserRepository } from '../../../../core/user/infrastructure/persistence/UserRepository';
import knexInstance from '../../../../infrastructure/database/connection';

export class UserController {
  private createUserService: CreateUserService;

  constructor() {
    const userRepository = new UserRepository(knexInstance);
    this.createUserService = new CreateUserService(userRepository);
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, balance, login, password } = req.body;

      const user = await this.createUserService.execute(
        name,
        balance,
        login,
        password
      );

      return res.status(201).json({
        status: 'success',
        data: {
          id: user.getId(),
          name: user.getName(),
          balance: user.getBalance(),
          login: user.getLogin(),
          createdAt: user.getCreatedAt()
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          status: 'error',
          message: error.message
        });
      }
      return res.status(500).json({
        status: 'error',
        message: 'Error interno del servidor'
      });
    }
  }
} 