import { AppService } from "src/app.service";
import { ItemController } from "./item.controller";
import { ItemService } from "./item.service";
import { Module } from "@nestjs/common";

@Module({
  controllers: [ItemController],
  providers: [ItemService, AppService],
})
export class ItemModule {}
