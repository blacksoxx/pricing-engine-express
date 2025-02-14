import { Router } from 'express';
import { 
  getProduct, 
  createProduct, 
  calculateQuote 
} from '../controllers/product.controller';
import { 
  productExists, 
  validateProductCreate 
} from '../middlewares/product.middleware';

const router = Router();

router.get('/:productId', productExists, getProduct);
router.post('/', validateProductCreate, createProduct);
router.post('/:productId/calculate', productExists, calculateQuote);

export default router;