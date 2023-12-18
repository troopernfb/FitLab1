import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), PassportModule,],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})

export class UsersModule { }
