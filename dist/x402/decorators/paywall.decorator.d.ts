export declare const PAYWALL_METADATA = "paywall_metadata";
export type SupportedNetwork = 'base' | 'base-sepolia' | 'solana' | 'solana-devnet' | 'polygon' | 'polygon-amoy';
export interface PaywallConfig {
    amount?: number;
    description?: string;
    network?: SupportedNetwork;
}
export declare const Paywall: (config: PaywallConfig) => import("@nestjs/common").CustomDecorator<string>;
