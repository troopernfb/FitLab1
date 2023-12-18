import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../user/services/users.service';
import { Repository } from 'typeorm';
import { AuthenticationEntity } from '../entities/auth.entity';
import { CreateAuthenticationDto, RegistrationDto } from '../dtos';
import { UserAlreadyExistException } from '../exceptions/user-already-exist.exception';
import { PostgresErrorCode } from '../../database/constraints/error.constraint';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { ITokens } from '../interfaces/ITokens';
import { IJwtPayload } from '../interfaces/IJwtPayload';
import { UpdateAuthDto } from '../dtos/update-auth.dto';
import { UserEntity } from '../../user/entities';
import { UserNotFoundException } from '../exceptions/user-not-found.exception';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(AuthenticationEntity)
    private authRepository: Repository<AuthenticationEntity>,
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) { }

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException("Email or password are incorrect");
    }

    if (!user.authentication) {
      throw new ForbiddenException();
    }

    if (!await user.authentication.validatePassword(password)) {
      throw new UnauthorizedException("Email or password are incorrect");
    }

    return user;
  }

  async register(registration: RegistrationDto): Promise<ITokens> {
    try {
      const authentication = await this.createAuthentication(registration);

      const user = await this.usersService.create(
        registration,
        authentication
      );

      const tokens = await this.makeNewTokens(user);

      await this.persistRefreshToken(user.authentication, tokens.refresh_token);

      return tokens;

    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new UserAlreadyExistException(error);
      }
      throw new InternalServerErrorException();
    }
  }

  async login(user: UserEntity): Promise<ITokens> {
    const tokens = await this.makeNewTokens(user);
    await this.persistRefreshToken(user.authentication, tokens.refresh_token)
    return tokens;
  }

  async logout(userId: string): Promise<boolean> {
    const updatedAuth: UpdateAuthDto = { refreshToken: null }
    const user = await this.usersService.findOneByUserId(userId);

    if (!user) {
      throw new UserNotFoundException();
    }

    const authUid = user.authentication.uuid;
    const authentication = await this.authRepository.update({ uuid: authUid }, updatedAuth);

    if (!authentication) {
      throw new InternalServerErrorException();
    }

    return !!authentication;
  }

  async refreshTokens(userId: string, refreshToken: string): Promise<ITokens> {
    const user = await this.usersService.findOneByUserId(userId);

    if (!user) {
      throw new UserNotFoundException("User not found");
    }

    if (!user.authentication || !user.authentication.refreshToken) {
      throw new ForbiddenException("Access denied");
    }

    if (!await user.authentication.validateRefreshToken(refreshToken)) {
      throw new UnauthorizedException("Invalid token");
    }

    const newTokens = await this.makeNewTokens(user);

    await this.persistRefreshToken(user.authentication, newTokens.refresh_token);

    return newTokens;
  }

  private async createAuthentication(
    createAuthentication: CreateAuthenticationDto
  ): Promise<AuthenticationEntity> {
    const authentication = this.authRepository.create(createAuthentication);
    return this.authRepository.save(authentication);
  }

  private async persistRefreshToken(
    authentication: AuthenticationEntity,
    refreshToken: string,
  ) {
    authentication.refreshToken = refreshToken;
    await this.authRepository.save(authentication);
  }

  private async makeNewTokens(userEntity: UserEntity): Promise<ITokens> {

    const payload: IJwtPayload = {
      sub: userEntity.uuid,
      email: userEntity.authentication.email,
    }

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        payload,
        {
          secret: this.configService.get<string>("JWT_ACCESS_SECRET"),
          expiresIn: '5d'
        }
      ),
      this.jwtService.signAsync(
        payload,
        {
          secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
          expiresIn: '15m'
        }
      )
    ])

    return {
      access_token: accessToken,
      refresh_token: refreshToken
    };
  }

}
