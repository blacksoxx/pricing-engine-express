import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Rule } from '../interfaces';
@Entity()
export class Product {
    @PrimaryGeneratedColumn("uuid")
    id!: number;

    @Column("float")
    basePrice!: number;

    @Column("json")
    rules!: Rule[];
}