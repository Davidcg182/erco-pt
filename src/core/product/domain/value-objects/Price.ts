export class Price {
  private readonly value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static create(price: number): Price {
    if (price <= 0) {
      throw new Error('El precio debe ser mayor a 0');
    }
    return new Price(price);
  }

  public getValue(): number {
    return this.value;
  }
} 