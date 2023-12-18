import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../user/services/users.service';
import { Repository } from 'typeorm';
import { AuthenticationEntity } from '../entities/auth.entity';
import { RegistrationDto } from '../dtos';
import { ConfigService } from '@nestjs/config';
import { ITokens } from '../interfaces/ITokens';
import { UserEntity } from '../../user/entities';
export declare class AuthenticationService {
    private authRepository;
    private usersService;
    private jwtService;
    private configService;
    constructor(authRepository: Repository<AuthenticationEntity>, usersService: UsersService, jwtService: JwtService, configService: ConfigService);
    validateUser(email: string, password: string): Promise<UserEntity>;
    register(registration: RegistrationDto): Promise<ITokens>;
    login(user: UserEntity): Promise<ITokens>;
    logout(userId: string): Promise<boolean>;
    refreshTokens(userId: string, refreshToken: string): Promise<ITokens>;
    private createAuthentication;
    private persistRefreshToken;
    private makeNewTokens;
}
