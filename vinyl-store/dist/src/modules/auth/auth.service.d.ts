import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/schemas/User.schema';
export declare class AuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    googleLogin(req: {
        user: UserDocument;
    }): Promise<"No user from google" | {
        message: string;
        jwt: string;
    }>;
    logout(res: any): Promise<void>;
}
