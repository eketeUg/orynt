import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PAYWALL_METADATA } from '../decorators/paywall.decorator';
import { X402Service } from '../providers/x402.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class X402Guard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private x402Service: X402Service,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const config = this.reflector.get(PAYWALL_METADATA, context.getHandler());
    config.amount = 50000;
    if (!config) return true;

    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    return await this.x402Service.verifyPayment(req, res, config);
  }
}
