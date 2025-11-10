import { SetMetadata } from '@nestjs/common';

export const PAYWALL_METADATA = 'paywall_metadata';

export interface PaywallConfig {
  amount: number;
  resource: string;
  description?: string;
}

export const Paywall = (config: PaywallConfig) =>
  SetMetadata(PAYWALL_METADATA, config);
