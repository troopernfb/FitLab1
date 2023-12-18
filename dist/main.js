"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_1 = require("./app");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_1.AppModule);
    const reflector = app.get(core_1.Reflector);
    const configService = app.get(config_1.ConfigService);
    const PORT = +configService.get("PORT");
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(reflector));
    await app.listen(PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map