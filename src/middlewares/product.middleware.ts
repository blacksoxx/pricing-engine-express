import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/data-source';
import { Product } from '../entities/product.entity';

const productRepository = AppDataSource.getRepository(Product);

export const validateProductCreate = (
  req: Request,
  res: Response,
  next: NextFunction
):void => {
  const { basePrice, rules } = req.body;
  if (typeof basePrice !== 'number' || !Array.isArray(rules)) {
    res.status(400).json({ error: 'Invalid data format' });
    return;
  }
  next();
};

export const productExists = async (
  req: Request,
  res: Response,
  next: NextFunction
):Promise<void> => {
  const product = await productRepository.findOneBy({ id: req.params.productId });
  if (!product) {
    res.status(404).json({ error: 'Product not found' });
    return;
  }
  res.locals.product = product;
  next();
};