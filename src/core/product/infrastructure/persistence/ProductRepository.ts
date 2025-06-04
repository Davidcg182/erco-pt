import { Product } from '../../domain/entities/Product';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { Knex } from 'knex';

export class ProductRepository implements IProductRepository {
  constructor(private readonly knex: Knex) {}

  async save(product: Product): Promise<void> {
    await this.knex('products').insert({
      id: product.getId(),
      price: product.getPrice(),
      total_kwh: product.getTotalKwh(),
      init_offer_date: product.getInitOfferDate(),
      end_offer_date: product.getEndOfferDate(),
      created_by: product.getCreatedBy(),
      buy_by: product.getBuyBy(),
      is_available: product.isProductAvailable(),
      created_at: product.getCreatedAt()
    });
  }

  async findById(id: string): Promise<Product | null> {
    const product = await this.knex('products')
      .where({ id })
      .first();

    if (!product) {
      return null;
    }

    return Product.fromPersistence(
      product.id,
      product.price,
      product.total_kwh,
      product.init_offer_date,
      product.end_offer_date,
      product.created_by,
      product.buy_by,
      product.is_available,
      product.created_at
    );
  }

  async findByCreatorId(creatorId: string): Promise<Product[]> {
    const products = await this.knex('products')
      .where({ created_by: creatorId });

    return products.map(product =>
      Product.fromPersistence(
        product.id,
        product.price,
        product.total_kwh,
        product.init_offer_date,
        product.end_offer_date,
        product.created_by,
        product.buy_by,
        product.is_available,
        product.created_at
      )
    );
  }

  async findAvailable(): Promise<Product[]> {
    const products = await this.knex('products')
      .where({ is_available: true })
      .where('end_offer_date', '>', new Date());

    return products.map(product =>
      Product.fromPersistence(
        product.id,
        product.price,
        product.total_kwh,
        product.init_offer_date,
        product.end_offer_date,
        product.created_by,
        product.buy_by,
        product.is_available,
        product.created_at
      )
    );
  }

  async update(product: Product): Promise<void> {
    await this.knex('products')
      .where({ id: product.getId() })
      .update({
        price: product.getPrice(),
        total_kwh: product.getTotalKwh(),
        init_offer_date: product.getInitOfferDate(),
        end_offer_date: product.getEndOfferDate(),
        created_by: product.getCreatedBy(),
        buy_by: product.getBuyBy(),
        is_available: product.isProductAvailable(),
        created_at: product.getCreatedAt()
      });
  }

  async findAvailableProducts(userId: string): Promise<Product[]> {
    const products = await this.knex('products')
      .where('created_by', '!=', userId)
      .where('end_offer_date', '>', new Date())
      .whereNotExists(function() {
        this.select('*')
          .from('purchases')
          .whereRaw('purchases.product_id = products.id');
      });

    return products.map(product =>
      Product.fromPersistence(
        product.id,
        product.price,
        product.total_kwh,
        product.init_offer_date,
        product.end_offer_date,
        product.created_by,
        product.buy_by,
        product.is_available,
        product.created_at
      )
    );
  }

  async findByUserId(userId: string): Promise<Product[]> {
    const products = await this.knex('products')
      .where('created_by', userId);

    return products.map(product =>
      Product.fromPersistence(
        product.id,
        product.price,
        product.total_kwh,
        product.init_offer_date,
        product.end_offer_date,
        product.created_by,
        product.buy_by,
        product.is_available,
        product.created_at
      )
    );
  }

  async findPurchasedProducts(userId: string): Promise<Product[]> {
    const products = await this.knex('products')
      .join('purchases', 'products.id', 'purchases.product_id')
      .where('purchases.user_id', userId)
      .select('products.*');

    return products.map(product =>
      Product.fromPersistence(
        product.id,
        product.price,
        product.total_kwh,
        product.init_offer_date,
        product.end_offer_date,
        product.created_by,
        product.buy_by,
        product.is_available,
        product.created_at
      )
    );
  }
} 