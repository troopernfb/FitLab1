import { Injectable, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthenticationEntity } from '../../auth/entities/auth.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) { }

  create(
    createUserDto: CreateUserDto,
    authentication: AuthenticationEntity,
  ): Promise<UserEntity> {
    const user = this.usersRepository.create({
      ...createUserDto,
      authentication,
    });

    return this.usersRepository.save(user);
  }

  findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  async findOneByEmail(email: string): Promise<UserEntity | undefined> {
    return this.usersRepository.findOneBy({ authentication: { email } });
  }

  async findOneByUserId(uuid: string): Promise<UserEntity> {
    return this.usersRepository.findOneBy({ uuid });
  }


  async getMe(userId: string) {
    const user = await this.findOneByUserId(userId);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
