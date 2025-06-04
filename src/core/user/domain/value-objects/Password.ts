import * as bcrypt from 'bcryptjs';

export class Password {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static async create(password: string): Promise<Password> {
    if (!password || password.length === 0) {
      throw new Error('La contraseña no puede estar vacía');
    }
    if (password.length > 20) {
      throw new Error('La contraseña no puede tener más de 20 caracteres');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    return new Password(hashedPassword);
  }

  public static fromHashed(hashedPassword: string): Password {
    return new Password(hashedPassword);
  }

  public async compare(plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, this.value);
  }

  public getValue(): string {
    return this.value;
  }
} 