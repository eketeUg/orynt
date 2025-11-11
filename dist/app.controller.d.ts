import { AppService } from './app.service';
import { X402Service } from './x402/providers/x402.service';
export declare class AppController {
    private readonly appService;
    private readonly x402Service;
    constructor(appService: AppService, x402Service: X402Service);
    getHello(): string;
    getHelloPremium(req: any): Promise<string>;
}
