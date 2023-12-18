import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { JwtAccessAuthGuard } from '../../auth/guards/jwt-access-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(JwtAccessAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return this.usersService.getMe(req.user.userId)
  }
}
