export class TotalKwh {
  private readonly value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static create(totalKwh: number): TotalKwh {
    if (totalKwh <= 0) {
      throw new Error('El total de kWh debe ser mayor a 0');
    }
    return new TotalKwh(totalKwh);
  }

  public getValue(): number {
    return this.value;
  }
} 