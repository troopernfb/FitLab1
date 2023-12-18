import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthenticationService } from '../services';
declare const JwtRefreshTokenStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtRefreshTokenStrategy extends JwtRefreshTokenStrategy_base {
    private authService;
    constructor(configService: ConfigService, authService: AuthenticationService);
    validate(req: Request, payload: any): Promise<any>;
}
export {};
