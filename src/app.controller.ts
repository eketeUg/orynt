import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Paywall } from './x402/decorators/paywall.decorator';
import { X402Service } from './x402/providers/x402.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly x402Service: X402Service
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/premium")
  @Paywall({
    amount: 10000, // $0.01 in USDC base units
    resource: "https://myapi.com",
    description: "Premium API access",
  })
  async getHelloPremium(@Req() req: any): Promise<string> {
    const { payerAddress } = req.x402;
    const { signature } = await this.x402Service.transferUSDC(payerAddress, 0.01);
    return signature;
  }
}
