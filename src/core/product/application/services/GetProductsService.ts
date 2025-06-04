import { ProductRepository } from '../../infrastructure/persistence/ProductRepository';
import { Product } from '../../domain/entities/Product';

export class GetProductsService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getAvailableProducts(userId: string): Promise<Product[]> {
    return this.productRepository.findAvailableProducts(userId);
  }

  async getUserProducts(userId: string): Promise<Product[]> {
    return this.productRepository.findByUserId(userId);
  }

  async getPurchasedProducts(userId: string): Promise<Product[]> {
    return this.productRepository.findPurchasedProducts(userId);
  }
} 