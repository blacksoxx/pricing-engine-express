import express from 'express';
import { connectDB } from './config/database-connection';
import productRoutes from './routes/product.routes';

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());

// Connect to PostgreSQL
connectDB();

// Routes
app.use('/products', productRoutes);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});