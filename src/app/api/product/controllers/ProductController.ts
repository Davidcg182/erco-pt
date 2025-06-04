import { Request, Response } from 'express';
import { CreateProductService } from '../../../../core/product/application/services/CreateProductService';
import { GetProductsService } from '../../../../core/product/application/services/GetProductsService';
import { ProductRepository } from '../../../../core/product/infrastructure/persistence/ProductRepository';
import knexInstance from '../../../../database/services/connection';

export class ProductController {
  private readonly createProductService: CreateProductService
  private readonly getProductsService: GetProductsService

  constructor() {
    const productRepository = new ProductRepository(knexInstance);
    this.createProductService = new CreateProductService(productRepository)
    this.getProductsService = new GetProductsService(productRepository)
  }

  async create(req: Request, res: Response): Promise<void> {

    try {
      const { price, totalKwh, initOfferDate, endOfferDate, createdBy } = req.body;

      if (!createdBy) {
        res.status(401).json({ error: 'Usuario no autenticado' });
        return;
      }

      const product = await this.createProductService.execute(
        price,
        totalKwh,
        new Date(initOfferDate),
        new Date(endOfferDate),
        createdBy
      );

      res.status(201).json({
        id: product.getId(),
        price: product.getPrice(),
        totalKwh: product.getTotalKwh(),
        initOfferDate: product.getInitOfferDate(),
        endOfferDate: product.getEndOfferDate(),
        createdBy: product.getCreatedBy(),
        isAvailable: product.isProductAvailable(),
        createdAt: product.getCreatedAt()
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
  }

  async getAvailableProducts(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const products = await this.getProductsService.getAvailableProducts(userId);

      res.status(200).json(products.map(product => ({
        id: product.getId(),
        price: product.getPrice(),
        totalKwh: product.getTotalKwh(),
        initOfferDate: product.getInitOfferDate(),
        endOfferDate: product.getEndOfferDate(),
        createdBy: product.getCreatedBy(),
        isAvailable: product.isProductAvailable(),
        createdAt: product.getCreatedAt()
      })));
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
  }

  async getUserProducts(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const products = await this.getProductsService.getUserProducts(userId);

      res.status(200).json(products.map(product => ({
        id: product.getId(),
        price: product.getPrice(),
        totalKwh: product.getTotalKwh(),
        initOfferDate: product.getInitOfferDate(),
        endOfferDate: product.getEndOfferDate(),
        createdBy: product.getCreatedBy(),
        isAvailable: product.isProductAvailable(),
        createdAt: product.getCreatedAt()
      })));
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
  }

  async getPurchasedProducts(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const products = await this.getProductsService.getPurchasedProducts(userId);

      res.status(200).json(products.map(product => ({
        id: product.getId(),
        price: product.getPrice(),
        totalKwh: product.getTotalKwh(),
        initOfferDate: product.getInitOfferDate(),
        endOfferDate: product.getEndOfferDate(),
        createdBy: product.getCreatedBy(),
        isAvailable: product.isProductAvailable(),
        createdAt: product.getCreatedAt()
      })));
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
  }
} 