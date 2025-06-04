import { Request, Response } from 'express';
import { AuthenticateUserService } from '../../../../core/user/application/services/AuthenticateUserService';
import { UserRepository } from '../../../../core/user/infrastructure/persistence/UserRepository';
import knexInstance from '../../../../database/services/connection';

export class AuthController {
  private authenticateUserService: AuthenticateUserService;

  constructor() {
    const userRepository = new UserRepository(knexInstance);
    this.authenticateUserService = new AuthenticateUserService(userRepository);
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { login, password } = req.body;

      if (!login || !password) {
        return res.status(400).json({
          status: 'error',
          message: 'Login y contraseña son requeridos'
        });
      }

      const user = await this.authenticateUserService.execute(login, password);

      return res.status(200).json({
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
        if (error.message === 'Usuario no encontrado') {
          return res.status(404).json({
            status: 'error',
            message: error.message
          });
        }
        if (error.message === 'Credenciales inválidas') {
          return res.status(401).json({
            status: 'error',
            message: error.message
          });
        }
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