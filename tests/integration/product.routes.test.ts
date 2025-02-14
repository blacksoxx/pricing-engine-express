import request from 'supertest';
import { AppDataSource } from '../../src/config/data-source';
import { app } from '../../src/app';
import { Product } from '../../src/entities/product.entity';
import { v4 as uuidv4 } from 'uuid';


describe('Product Routes', () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  afterEach(async () => {
    await AppDataSource.getRepository(Product).clear();
  });

  describe('POST /products', () => {
    it('should create a new product', async () => {
      const response = await request(app)
        .post('/products')
        .send({
          basePrice: 100,
          rules: [
            {
              conditions: [
                { field: 'age', operator: '>', value: 25 },
                { field: 'income', operator: '>', value: 40000, type: 'AND' },
              ],
              operation: { field: 'quote', operator: '+', value: 50 },
            },
          ],
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.basePrice).toBe(100);
      expect(response.body.rules.length).toBe(1);
    });

    it('should return 400 for invalid data', async () => {
      const response = await request(app)
        .post('/products')
        .send({
          basePrice: 'invalid', // Invalid basePrice
          rules: [],
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /products/:productId', () => {
    it('should return product details', async () => {
      const createResponse = await request(app)
        .post('/products')
        .send({
          basePrice: 100,
          rules: [],
        });

      const productId = createResponse.body.id;
      const response = await request(app).get(`/products/${productId}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(productId);
      expect(response.body.basePrice).toBe(100);
    });

    it('should return 404 if product is not found', async () => {
      const response = await request(app).get('/products/invalid-id');
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('POST /products/:productId/calculate', () => {
    it('should calculate the final quote', async () => {
      const createResponse = await request(app)
        .post('/products')
        .send({
          basePrice: 100,
          rules: [
            {
              conditions: [
                { field: 'age', operator: '>', value: 25 },
                { field: 'income', operator: '>', value: 40000, type: 'AND' },
              ],
              operation: { field: 'quote', operator: '+', value: 50 },
            },
          ],
        });

      const productId = createResponse.body.id;
      const response = await request(app)
        .post(`/products/${productId}/calculate`)
        .send({
          customerData: { age: 30, income: 50000 },
        });

      expect(response.status).toBe(200);
      expect(response.body.finalQuote).toBe(150);
    });

    it('should return 404 if product is not found', async () => {
        const nonExistentId = uuidv4(); 
        const response = await request(app)
  .post(`/products/${uuidv4()}/calculate`)
  .send({ customerData: { age: 30, income: 50000 } });
      });
  });
});