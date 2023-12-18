import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { AuthenticationEntity } from '../../auth/entities/auth.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<UserEntity>);
    create(createUserDto: CreateUserDto, authentication: AuthenticationEntity): Promise<UserEntity>;
    findAll(): Promise<UserEntity[]>;
    findOneByEmail(email: string): Promise<UserEntity | undefined>;
    findOneByUserId(uuid: string): Promise<UserEntity>;
    getMe(userId: string): Promise<UserEntity>;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): Promise<void>;
}
