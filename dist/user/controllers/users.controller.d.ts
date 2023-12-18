import { UsersService } from '../services/users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(req: any): Promise<import("../entities").UserEntity>;
}
