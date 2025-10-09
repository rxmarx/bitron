import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BankModule } from "./bank/bank.module";
import { CompanyModule } from "./company/company.module";
import { ConfigModule } from "@nestjs/config";
import { GuildModule } from "./guild/guild.module";
import { ItemModule } from "./item/item.module";
import { Module } from "@nestjs/common";
import { PowerUpModule } from "./powerup/powerup.module";
import { SharesModule } from "./shares/shares.module";
import { TokenModule } from "./token/token.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    UserModule,
    CompanyModule,
    SharesModule,
    BankModule,
    TokenModule,
    ItemModule,
    PowerUpModule,
    GuildModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ["../../.env"] }),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
