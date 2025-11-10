import { SetMetadata } from '@nestjs/common';

export const PAYWALL_METADATA = 'paywall_metadata';

export interface PaywallConfig {
<<<<<<< HEAD
  amount: number;
  resource: string;
=======
  amount?: number;
  //   resource: string;
>>>>>>> X402
  description?: string;
}

export const Paywall = (config: PaywallConfig) =>
  SetMetadata(PAYWALL_METADATA, config);
