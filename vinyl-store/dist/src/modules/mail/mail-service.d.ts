import { ConfigService } from '@nestjs/config';
export declare class MailService {
    configService: ConfigService<Record<string, unknown>, false>;
    private sender;
    private pass;
    sendMail(message: string, rec?: string): Promise<void>;
}
