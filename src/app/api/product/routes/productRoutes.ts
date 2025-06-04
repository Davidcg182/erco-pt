import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';

const router = Router();
const productController = new ProductController();

router.post('/', (req, res) => productController.create(req, res));
router.get('/available/:userId', (req, res) => productController.getAvailableProducts(req, res));
router.get('/user/:userId', (req, res) => productController.getUserProducts(req, res));
router.get('/purchased/:userId', (req, res) => productController.getPurchasedProducts(req, res));

export default router; 
