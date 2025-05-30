export class Name {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(name: string): Name {
    if (!name || name.length === 0) {
      throw new Error('El nombre no puede estar vacío');
    }
    if (name.length > 50) {
      throw new Error('El nombre no puede tener más de 50 caracteres');
    }
    return new Name(name);
  }

  public getValue(): string {
    return this.value;
  }
} 