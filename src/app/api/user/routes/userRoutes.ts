import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/UserController';
import { AuthController } from '../controllers/AuthController';

const router = Router();
const userController = new UserController();
const authController = new AuthController();

router.post('/', async (req: Request, res: Response) => {
  await userController.create(req, res);
});

router.post('/auth', async (req: Request, res: Response) => {
  await authController.login(req, res);
});

export default router; 