import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/database';
import { Product } from '../entities/product.entity';

const productRepository = AppDataSource.getRepository(Product);

export const validateProductCreate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { basePrice, rules } = req.body;
  if (typeof basePrice !== 'number' || !Array.isArray(rules)) {
    return res.status(400).json({ error: 'Invalid data format' });
  }
  next();
};

export const productExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const product = await productRepository.findOneBy({ id: req.params.productId });
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.locals.product = product;
  next();
};