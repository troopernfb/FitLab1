import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { NODE_ENV } from "../app/constants";
import { SnakeNamingStrategy } from "./strategies";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("POSTGRES_HOST"),
        port: configService.get("POSTGRES_PORT"),
        username: configService.get("POSTGRES_USER"),
        password: configService.get("POSTGRES_PASSWORD"),
        database: configService.get("POSTGRES_DB"),
        entities: [__dirname + "/../**/*.entity{.ts,.js}"],
        namingStrategy: new SnakeNamingStrategy(),
        synchronize: configService.get("NODE_ENV") === NODE_ENV.DEVELOPMENT,
        logging: configService.get("NODE_ENV") === NODE_ENV.DEVELOPMENT,
        extra: { charset: "utf8mb4_unicode_ci" },
      }),
    })
  ],
})
export class DatabaseModule { }