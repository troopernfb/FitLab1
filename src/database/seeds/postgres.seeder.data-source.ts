import { ConfigModule, ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";
import { DataSourceOptions } from "typeorm";
import { SeederOptions } from 'typeorm-extension';
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { SnakeNamingStrategy } from "../strategies";
import { NODE_ENV } from "../../app/constants";

ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: ['.env.development.local', '.env']
});

const dataSourceOptionsFactory = (configService: ConfigService):
  DataSourceOptions & TypeOrmModuleOptions & SeederOptions => ({
    type: "postgres",
    host: configService.get("POSTGRES_HOST"),
    port: configService.get("POSTGRES_PORT"),
    username: configService.get("POSTGRES_USER"),
    password: configService.get("POSTGRES_PASSWORD"),
    database: configService.get("POSTGRES_DB"),
    seeds: ["src/database/seeds/**/*.seeder{.ts,.js}"],
    entities: ["src/../**/*.entity{.ts,.js}"],
    namingStrategy: new SnakeNamingStrategy(),
    logging: configService.get("NODE_ENV") === NODE_ENV.DEVELOPMENT,
    extra: { charset: "utf8mb4_unicode_ci" },
  });

export default new DataSource(dataSourceOptionsFactory(new ConfigService()));