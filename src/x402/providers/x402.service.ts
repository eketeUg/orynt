import { Injectable } from '@nestjs/common';
import { paymentMiddleware } from 'x402-express';

export interface PaywallConfig {
  amount: number; // kept for compatibility with your decorator
  resource: string;
  description?: string;
}

@Injectable()
export class X402Service {
  async verifyPayment(
    req: any,
    res: any,
    config: PaywallConfig,
  ): Promise<boolean> {
    const FACILITATOR_URL =
      process.env.FACILITATOR_URL || 'https://facilitator.payai.network';
    const WALLET_ADDRESS =
      process.env.WALLET_ADDRESS ||
      'CEBAqJoQXomRdMubgTWL1fa99d2zr2rFTMPukk62fSUw';
    const NETWORK = process.env.NETWORK || 'solana-devnet';

    let verified = false;

    const middleware = paymentMiddleware(
      WALLET_ADDRESS,
      {
        [req.route.path]: {
          price: `$${(config.amount || 10000) / 1_000_000}`, // convert USDC base units to human-readable
          network: NETWORK,
          config: {
            description: config.description || 'Premium API access',
          },
        },
      },
      {
        url: FACILITATOR_URL,
      },
    );

    // Run the middleware inline
    await new Promise<void>((resolve) => {
      middleware(req, res, () => {
        verified = true;
        resolve();
      });
    });

    return verified;
  }
}
