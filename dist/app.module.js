"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const app_controller_1 = require("./app.controller");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("./users/users.module");
const reports_module_1 = require("./reports/reports.module");
const config_1 = require("@nestjs/config");
const cookieSession = require("cookie-session");
let AppModule = class AppModule {
    constructor(configService) {
        this.configService = configService;
    }
    configure(consumer) {
        consumer.apply(cookieSession({
            keys: [this.configService.get("COOKIE_KEY")]
        })).forRoutes("*");
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: `.env.${process.env.NODE_ENV}`
            }),
            typeorm_1.TypeOrmModule.forRoot(require("../ormconfig.js")),
            users_module_1.UsersModule,
            reports_module_1.ReportsModule
        ],
        providers: [app_service_1.AppService],
        controllers: [app_controller_1.AppController]
    }),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AppModule);
//# sourceMappingURL=app.module.js.map