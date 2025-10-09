import * as dotenv from "dotenv";

import { AppModule } from "./app.module";
import { NestFactory } from "@nestjs/core";

dotenv.config({ path: "../../.env" });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(`/api/${process.env.KEY}/`);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
