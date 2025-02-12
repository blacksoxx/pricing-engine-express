import "reflect-metadata";
import { DataSource } from "typeorm";
import { Product } from "../entities/product";
import dotenv from "dotenv";
dotenv.config();
export const AppDataSource = new DataSource({
  type: "postgres", //PostgeSQL Database
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true, 
  logging: false,
  entities: [Product]
});