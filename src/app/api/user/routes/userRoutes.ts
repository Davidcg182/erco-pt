import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();
const userController = new UserController();

router.post('/', async (req: Request, res: Response) => {
  await userController.create(req, res);
});

export default router; 