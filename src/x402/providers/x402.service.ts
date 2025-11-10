/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { paymentMiddleware } from 'x402-express';
import {
  Transaction,
  VersionedTransaction,
  PublicKey,
  Connection,
  Keypair,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import { PaywallConfig } from '../decorators/paywall.decorator';
import bs58 from 'bs58';
import {
  getAssociatedTokenAddress,
  createTransferInstruction,
  createAssociatedTokenAccountInstruction,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from '@solana/spl-token';

@Injectable()
export class X402Service {
  private NETWORK = process.env.NETWORK || 'solana-devnet';
  private PRIVATEKEY = process.env.PRIVATE_KEY;

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

    let verified = false;

    const middleware = paymentMiddleware(
      WALLET_ADDRESS,
      {
        [req.route.path]: {
          price: `$${(config.amount || 10000) / 1_000_000}`, // USDC base units -> human-readable
          network: this.NETWORK,
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
      middleware(req, res, async () => {
        const header = req.headers['x-payment'];
        console.log(req);
        if (!header) throw new Error('No X-PAYMENT header');
        const payerAddress = this.extractActualPayer(header);
        req.x402 = { payerAddress };
        verified = true;
        resolve();
      });
    });
    return verified;
  }

  private extractActualPayer(header: string): string {
    try {
      const decoded = Buffer.from(header, 'base64').toString('utf-8');
      const json = JSON.parse(decoded);

      const txBase64 = json?.payload?.transaction;
      if (!txBase64) throw new Error('No transaction in payload');

      const txBuffer = Buffer.from(txBase64, 'base64');

      let payer: PublicKey;
      try {
        const vtx = VersionedTransaction.deserialize(txBuffer);
        payer = vtx.message.staticAccountKeys[1];
      } catch (err) {
        const legacyTx = Transaction.from(txBuffer);
        payer = legacyTx.feePayer!;
      }

      return payer.toBase58();
    } catch (e) {
      return 'unknown';
    }
  }

  async transferUSDC(
    recipientAddress: string,
    amount: number,
  ): Promise<{ signature: string }> {
    try {
      const rpcURL =
        this.NETWORK === 'solana-devnet'
          ? 'https://api.devnet.solana.com'
          : 'https://api.mainnet-beta.solana.com';
      const connection = new Connection(rpcURL, 'confirmed');
      const sender = Keypair.fromSecretKey(bs58.decode(this.PRIVATEKEY));
      const recipient = new PublicKey(recipientAddress);

      // USDC Mint addresses
      const USDC_MINT = new PublicKey(
        // devnet or mainnet depending on env
        rpcURL.includes('devnet')
          ? '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU'
          : 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
      );

      const senderATA = await getAssociatedTokenAddress(
        USDC_MINT,
        sender.publicKey,
      );
      const recipientATA = await getAssociatedTokenAddress(
        USDC_MINT,
        recipient,
      );

      // instructions array
      const instructions = [];

      // create recipient ATA if it doesn't exist
      const recipientATAInfo = await connection.getAccountInfo(recipientATA);
      if (!recipientATAInfo) {
        instructions.push(
          createAssociatedTokenAccountInstruction(
            sender.publicKey, // payer
            recipientATA, // ATA
            recipient, // owner
            USDC_MINT, // mint
            TOKEN_PROGRAM_ID, // token program
            ASSOCIATED_TOKEN_PROGRAM_ID, // associated token program
          ),
        );
      }

      // transfer USDC
      instructions.push(
        createTransferInstruction(
          senderATA,
          recipientATA,
          sender.publicKey,
          Math.round(amount * 1_000_000), // USDC has 6 decimals
          [],
          TOKEN_PROGRAM_ID,
        ),
      );

      const transaction = new Transaction().add(...instructions);

      const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [sender],
      );

      return { signature };
    } catch (error: any) {
      throw new Error(`USDC transfer failed: ${error.message}`);
    }
  }
}
