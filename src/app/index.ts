import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../user';
import { AuthModule } from '../auth';
import { DatabaseModule } from '../database';
import { PassportModule } from '@nestjs/passport';
import { ExerciseModule } from '../exercise';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development.local', '.env']
    }),
    PassportModule,
    AuthModule,
    DatabaseModule,
    UsersModule,
    ExerciseModule
  ],
})
export class AppModule { }
