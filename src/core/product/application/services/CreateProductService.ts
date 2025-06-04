import { Product } from '../../domain/entities/Product';
import { IProductRepository } from '../../domain/repositories/IProductRepository';

export class CreateProductService {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(
    price: number,
    totalKwh: number,
    initOfferDate: Date,
    endOfferDate: Date,
    createdBy: string
  ): Promise<Product> {
    // Crear el producto
    const product = await Product.create(
      price,
      totalKwh,
      initOfferDate,
      endOfferDate,
      createdBy
    );

    // Guardar el producto
    await this.productRepository.save(product);

    return product;
  }
} 