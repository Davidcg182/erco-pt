export class OfferDate {
  private readonly value: Date;

  private constructor(value: Date) {
    this.value = value;
  }

  public static create(date: Date): OfferDate {
    if (!date || !(date instanceof Date)) {
      throw new Error('La fecha debe ser una instancia válida de Date');
    }

    return new OfferDate(date);
  }

  public getValue(): Date {
    return this.value;
  }

  public isExpired(): boolean {
    return this.value < new Date();
  }
} 