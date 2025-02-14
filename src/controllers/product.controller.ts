import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Product } from '../entities/product.entity';
import { evaluateConditions, applyOperation } from '../services/pricing-engine.service';

const productRepository = AppDataSource.getRepository(Product);

export const getProduct = async (req: Request, res: Response) => {
  res.json(res.locals.product);
};

export const createProduct = async (req: Request, res: Response) => {
  const product = productRepository.create(req.body);
  await productRepository.save(product);
  res.status(201).json(product);
};

export const calculateQuote = async (req: Request, res: Response) => {
  const { product } = res.locals;
  const customerData = req.body.customerData;
  let quote = product.basePrice;

  for (const rule of product.rules) {
    if (evaluateConditions(rule.conditions, customerData)) {
      quote = applyOperation(quote, rule.operation);
    }
  }

  res.json({ finalQuote: quote });
};