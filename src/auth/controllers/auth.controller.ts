import { Controller, Request, Post, UseGuards, Body, Get, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthenticationService } from '../services/auth.service';
import { RegistrationDto } from '../dtos';
import { ITokens } from '../interfaces/ITokens';
import { JwtRefreshAuthGuard } from '../guards/jwt-refresh-auth.guard';
import { JwtAccessAuthGuard } from '../guards/jwt-access-auth.guard';
import { GetUserId } from '../../common/decorators/get-user-id.decorator';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { IJwtPayload } from '../interfaces/IJwtPayload';

@Controller("auth")
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
  ) { }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() registrationDto: RegistrationDto
  ): Promise<ITokens> {
    return this.authService.register(registrationDto)
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req): Promise<ITokens> {
    return this.authService.login(req.user)
  }


  @UseGuards(JwtAccessAuthGuard)
  @Get('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@GetUserId() userId: string): Promise<boolean> {
    return this.authService.logout(userId);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Get('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@GetUser() user: IJwtPayload): Promise<ITokens> {
    const userId = user['sub'];
    const refreshToken = user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }

}
