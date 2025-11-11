import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PAYWALL_METADATA } from '../decorators/paywall.decorator';
import { X402Service } from '../providers/x402.service';
import { Reflector } from '@nestjs/core';
import { CostCalculator, getModelFeature } from 'src/ai/cost-calculators';
import { NO_PAYWALL_METADATA } from '../decorators/no-paywall.decorator';

@Injectable()
export class X402Guard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private x402Service: X402Service,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const skip = this.reflector.get<boolean>(
      NO_PAYWALL_METADATA,
      context.getHandler(),
    );
    if (skip) return true;
    const config = this.reflector.get(PAYWALL_METADATA, context.getHandler());

    if (!config) return true;

    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    const network = req.headers['x-network'];

    console.log(network);

    config.network = network;
    console.log(config.network);

    const dto = req.body;

    console.log(dto);

    const feature = getModelFeature(dto.model);

    console.log(feature);
    const metrics = CostCalculator.estimateMetrics(dto, feature);
    const estimatedCost = CostCalculator.estimateCost(
      dto.model,
      feature,
      metrics,
    );

    console.log('estimated cost :', estimatedCost);

    config.amount = Math.floor(estimatedCost * 1_000_000);
    console.log('config amount :', config.amount);

    return await this.x402Service.verifyPayment(req, res, config);
  }
}
