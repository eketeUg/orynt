"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.X402Service = void 0;
const common_1 = require("@nestjs/common");
const x402_express_1 = require("x402-express");
const web3_js_1 = require("@solana/web3.js");
const bs58_1 = __importDefault(require("bs58"));
const spl_token_1 = require("@solana/spl-token");
let X402Service = class X402Service {
    constructor() {
        this.PRIVATEKEY = process.env.PRIVATE_KEY;
    }
    async verifyPayment(req, res, config) {
        this.NETWORK = config.network || 'solana-devnet';
        const FACILITATOR_URL = process.env.FACILITATOR_URL || 'https://facilitator.payai.network';
        const WALLET_ADDRESS = this.getWalletAddress(this.NETWORK);
        let verified = false;
        const middleware = (0, x402_express_1.paymentMiddleware)(WALLET_ADDRESS, {
            [req.route.path]: {
                price: `$${(config.amount || 10000) / 1_000_000}`,
                network: this.NETWORK,
                config: {
                    description: config.description || 'Premium API access',
                },
            },
        }, {
            url: FACILITATOR_URL,
        });
        await new Promise((resolve) => {
            middleware(req, res, async () => {
                const header = req.headers['x-payment'];
                if (!header)
                    throw new Error('No X-PAYMENT header');
                const payerAddress = this.extractActualPayer(header);
                req.x402 = { payerAddress };
                verified = true;
                resolve();
            });
        });
        return verified;
    }
    extractActualPayer(header) {
        try {
            const decoded = Buffer.from(header, 'base64').toString('utf-8');
            const json = JSON.parse(decoded);
            const txBase64 = json?.payload?.transaction;
            console.log(txBase64);
            if (!txBase64)
                throw new Error('No transaction in payload');
            const txBuffer = Buffer.from(txBase64, 'base64');
            let payer;
            try {
                const vtx = web3_js_1.VersionedTransaction.deserialize(txBuffer);
                payer = vtx.message.staticAccountKeys[1];
            }
            catch (err) {
                const legacyTx = web3_js_1.Transaction.from(txBuffer);
                payer = legacyTx.feePayer;
            }
            return payer.toBase58();
        }
        catch (e) {
            return 'unknown';
        }
    }
    async transferUSDC(recipientAddress, amount) {
        try {
            const rpcURL = this.NETWORK === 'solana-devnet'
                ? 'https://api.devnet.solana.com'
                : 'https://api.mainnet-beta.solana.com';
            const connection = new web3_js_1.Connection(rpcURL, 'confirmed');
            const sender = web3_js_1.Keypair.fromSecretKey(bs58_1.default.decode(this.PRIVATEKEY));
            const recipient = new web3_js_1.PublicKey(recipientAddress);
            const USDC_MINT = new web3_js_1.PublicKey(rpcURL.includes('devnet')
                ? '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU'
                : 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');
            const senderATA = await (0, spl_token_1.getAssociatedTokenAddress)(USDC_MINT, sender.publicKey);
            const recipientATA = await (0, spl_token_1.getAssociatedTokenAddress)(USDC_MINT, recipient);
            const instructions = [];
            const recipientATAInfo = await connection.getAccountInfo(recipientATA);
            if (!recipientATAInfo) {
                instructions.push((0, spl_token_1.createAssociatedTokenAccountInstruction)(sender.publicKey, recipientATA, recipient, USDC_MINT, spl_token_1.TOKEN_PROGRAM_ID, spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID));
            }
            instructions.push((0, spl_token_1.createTransferInstruction)(senderATA, recipientATA, sender.publicKey, Math.round(amount * 1_000_000), [], spl_token_1.TOKEN_PROGRAM_ID));
            const transaction = new web3_js_1.Transaction().add(...instructions);
            const signature = await (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [sender]);
            return { signature };
        }
        catch (error) {
            throw new Error(`USDC transfer failed: ${error.message}`);
        }
    }
    getWalletAddress(network) {
        const SOLANA_WALLET = process.env.SOLANA_WALLET_ADDRESS ||
            'CEBAqJoQXomRdMubgTWL1fa99d2zr2rFTMPukk62fSUw';
        const EVM_WALLET = process.env.EVM_WALLET_ADDRESS ||
            '0x2189878C4963B84Fd737640db71D7650214c4A18';
        if (network.toLowerCase().includes('solana')) {
            return SOLANA_WALLET;
        }
        return EVM_WALLET;
    }
};
exports.X402Service = X402Service;
exports.X402Service = X402Service = __decorate([
    (0, common_1.Injectable)()
], X402Service);
//# sourceMappingURL=x402.service.js.map