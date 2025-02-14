import { AppDataSource } from './data-source';

export const connectDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log('PostgreSQL Connected');
  } catch (error) {
    console.error('PostgreSQL Connection Error:', error);
    process.exit(1);
  }
};