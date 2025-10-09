import { AppService } from "src/app.service";
import { Module } from "@nestjs/common";
import { SharesController } from "./shares.controller";
import { SharesService } from "./shares.service";

@Module({
  controllers: [SharesController],
  providers: [SharesService, AppService],
})
export class SharesModule {}
