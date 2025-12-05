import { SetMetadata } from '@nestjs/common';

export const PAYWALL_METADATA = 'paywall_metadata';

export type SupportedNetwork =
  | 'avalanche'
  | 'avalanche-fuji'
  | 'base'
  | 'base-sepolia'
  | 'solana'
  | 'solana-devnet'
  | 'polygon'
  | 'polygon-amoy';

export interface PaywallConfig {
  amount?: number;
  //   resource: string;
  description?: string;
  network?: SupportedNetwork;
}

export const Paywall = (config: PaywallConfig) =>
  SetMetadata(PAYWALL_METADATA, config);
