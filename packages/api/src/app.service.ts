import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class AppService {
  public readonly database: PrismaClient;

  constructor() {
    this.database = new PrismaClient();
  }

  getHello(): string {
    this.main()
      .then(async () => {
        await this.database.$connect();
      })
      .catch(async (error) => {
        await this.database.$disconnect();
        console.log(error);
      });

    return "Database is running!";
  }

  async main(): Promise<string> {
    await this.database.$connect();
    return "Database is running!";
  }
}
