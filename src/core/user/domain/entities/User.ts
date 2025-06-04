import { v4 as uuidv4 } from 'uuid';
import { Name } from '../value-objects/Name';
import { Login } from '../value-objects/Login';
import { Password } from '../value-objects/Password';

export class User {
  private readonly id: string;
  private readonly name: Name;
  private balance: number;
  private readonly login: Login;
  private readonly password: Password;
  private readonly createdAt: Date;

  private constructor(
    id: string,
    name: Name,
    balance: number,
    login: Login,
    password: Password,
    createdAt: Date
  ) {
    this.id = id;
    this.name = name;
    this.balance = balance;
    this.login = login;
    this.password = password;
    this.createdAt = createdAt;
  }

  public static async create(
    name: string,
    balance: number,
    login: string,
    password: string
  ): Promise<User> {
    return new User(
      uuidv4(),
      Name.create(name),
      balance,
      Login.create(login),
      await Password.create(password),
      new Date()
    );
  }

  public static fromPersistence(
    id: string,
    name: string,
    balance: number,
    login: string,
    hashedPassword: string,
    createdAt: Date
  ): User {
    return new User(
      id,
      Name.create(name),
      balance,
      Login.create(login),
      Password.fromHashed(hashedPassword),
      createdAt
    );
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name.getValue();
  }

  public getBalance(): number {
    return this.balance;
  }

  public getLogin(): string {
    return this.login.getValue();
  }

  public getPassword(): string {
    return this.password.getValue();
  }

  public async validatePassword(password: string): Promise<boolean> {
    return this.password.compare(password);
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public updateBalance(newBalance: number): void {
    this.balance = newBalance;
  }
} 