import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Paywall } from './x402/decorators/paywall.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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
  getHelloPremium(): string {
    return this.appService.getHello();
  }
}
