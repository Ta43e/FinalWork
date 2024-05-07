import { UserService } from './users.service';
import { UpdateUserDto } from './dto/update-profile.dto';
import { QueryLogerDto } from '../loger/dto/query-loger.dto';
export declare class UserController {
    private UserService;
    constructor(UserService: UserService);
    showProfile(req: Request, res: any): Promise<void>;
    updateUser(req: Request, res: any, updateUserDto: UpdateUserDto): Promise<void>;
    deleteUser(req: Request, res: any): Promise<void>;
    addReview(res: any, queryLogerDto: QueryLogerDto): Promise<any>;
    buyVinyl(req: Request, res: any, id: string): Promise<void>;
    localLogin(req: Request, res: any, email: string): Promise<void>;
}
