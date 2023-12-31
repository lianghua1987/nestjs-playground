import { MiddlewareConsumer, Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { ReportsModule } from "./reports/reports.module";
import { User } from "./users/user.entity";
import { Report } from "./reports/report.entity";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CurrentUserMiddleware } from "./users/middlewares/current-user.middleware";
const cookieSession = require("cookie-session");

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRoot(require("../ormconfig.js")),
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => {
    //     return {
    //       type: "sqlite",
    //       database: config.get<string>("DB_NAME"),
    //       entities: [User, Report],
    //       synchronize: true
    //     };
    //   }
    // }),
    // TypeOrmModule.forRoot({
    //     type: "sqlite",
    //     database: "db.sqlite",
    //     entities: [User, Report],
    //     synchronize: true
    //   }
    // ),

    UsersModule,
    ReportsModule
  ],
  providers: [AppService],
  controllers: [AppController]
})
export class AppModule {
  constructor(private configService: ConfigService) {
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(
      cookieSession({
        keys: [this.configService.get("COOKIE_KEY")]
      })
    ).forRoutes("*");
  }
}
