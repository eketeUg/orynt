import { PaywallConfig } from '../decorators/paywall.decorator';
export declare class X402Service {
    private NETWORK;
    private PRIVATEKEY;
    verifyPayment(req: any, res: any, config: PaywallConfig): Promise<boolean>;
    private extractActualPayer;
    transferUSDC(recipientAddress: string, amount: number): Promise<{
        signature: string;
    }>;
    private getWalletAddress;
}
