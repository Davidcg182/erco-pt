export class Login {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(login: string): Login {
    if (!login || login.length === 0) {
      throw new Error('El login no puede estar vacío');
    }
    if (login.length > 100) {
      throw new Error('El login no puede tener más de 100 caracteres');
    }
    return new Login(login);
  }

  public getValue(): string {
    return this.value;
  }
} 