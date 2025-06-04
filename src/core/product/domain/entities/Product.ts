import { v4 as uuidv4 } from 'uuid';
import { Price } from '../value-objects/Price';
import { TotalKwh } from '../value-objects/TotalKwh';
import { OfferDate } from '../value-objects/OfferDate';

export class Product {
  private readonly id: string;
  private readonly price: Price;
  private readonly totalKwh: TotalKwh;
  private readonly initOfferDate: OfferDate;
  private readonly endOfferDate: OfferDate;
  private readonly createdBy: string;
  private buyBy: string | null;
  private isAvailable: boolean;
  private readonly createdAt: Date;

  private constructor(
    id: string,
    price: Price,
    totalKwh: TotalKwh,
    initOfferDate: OfferDate,
    endOfferDate: OfferDate,
    createdBy: string,
    buyBy: string | null,
    isAvailable: boolean,
    createdAt: Date
  ) {
    this.id = id;
    this.price = price;
    this.totalKwh = totalKwh;
    this.initOfferDate = initOfferDate;
    this.endOfferDate = endOfferDate;
    this.createdBy = createdBy;
    this.buyBy = buyBy;
    this.isAvailable = isAvailable;
    this.createdAt = createdAt;
  }

  public static async create(
    price: number,
    totalKwh: number,
    initOfferDate: Date,
    endOfferDate: Date,
    createdBy: string
  ): Promise<Product> {
    if (initOfferDate >= endOfferDate) {
      throw new Error('La fecha de inicio debe ser anterior a la fecha de fin');
    }

    return new Product(
      uuidv4(),
      Price.create(price),
      TotalKwh.create(totalKwh),
      OfferDate.create(initOfferDate),
      OfferDate.create(endOfferDate),
      createdBy,
      null,
      true,
      new Date()
    );
  }

  public static fromPersistence(
    id: string,
    price: number,
    totalKwh: number,
    initOfferDate: Date,
    endOfferDate: Date,
    createdBy: string,
    buyBy: string | null,
    isAvailable: boolean,
    createdAt: Date
  ): Product {
    return new Product(
      id,
      Price.create(price),
      TotalKwh.create(totalKwh),
      OfferDate.create(initOfferDate),
      OfferDate.create(endOfferDate),
      createdBy,
      buyBy,
      isAvailable,
      createdAt
    );
  }

  public getId(): string {
    return this.id;
  }

  public getPrice(): number {
    return this.price.getValue();
  }

  public getTotalKwh(): number {
    return this.totalKwh.getValue();
  }

  public getInitOfferDate(): Date {
    return this.initOfferDate.getValue();
  }

  public getEndOfferDate(): Date {
    return this.endOfferDate.getValue();
  }

  public getCreatedBy(): string {
    return this.createdBy;
  }

  public getBuyBy(): string | null {
    return this.buyBy;
  }

  public isProductAvailable(): boolean {
    return this.isAvailable && !this.endOfferDate.isExpired();
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public buy(buyerId: string): void {
    if (!this.isProductAvailable()) {
      throw new Error('El producto no está disponible para compra');
    }
    if (this.buyBy) {
      throw new Error('El producto ya ha sido comprado');
    }
    this.buyBy = buyerId;
    this.isAvailable = false;
  }

  public cancel(): void {
    if (this.buyBy) {
      throw new Error('No se puede cancelar un producto ya comprado');
    }
    this.isAvailable = false;
  }
} 