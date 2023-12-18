import { Module } from '@nestjs/common';
import { AuthenticationService } from './services/auth.service';
import { UsersModule } from '../user';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt-access.strategy';
import { AuthenticationController } from './controllers/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationEntity } from './entities/auth.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtRefreshTokenStrategy } from './strategies/jwt-refresh.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthenticationEntity]),
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get("JWT_SECRET"),
        signOptions: { expiresIn: '1m' },
      }),
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, LocalStrategy, JwtStrategy, JwtRefreshTokenStrategy],
  exports: [AuthenticationService],
})
export class AuthModule { }
