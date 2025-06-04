import { Product } from '../entities/Product';

export interface IProductRepository {
  save(product: Product): Promise<void>;
  findById(id: string): Promise<Product | null>;
  update(product: Product): Promise<void>;
  findAvailableProducts(userId: string): Promise<Product[]>;
  findByUserId(userId: string): Promise<Product[]>;
  findPurchasedProducts(userId: string): Promise<Product[]>;
  findAvailable(): Promise<Product[]>;
  findByCreatorId(creatorId: string): Promise<Product[]>;
} 