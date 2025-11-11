[![npm version](https://img.shields.io/npm/v/@orynt/ai-x402.svg)](https://www.npmjs.com/package/@orynt/ai-x402)
[![API Status](https://img.shields.io/website?url=https%3A%2F%2Fapi.oryntai.xyz/api/v1/docs&label=api.oryntai.xyz/api/v1/docs)](https://api.oryntai.xyz/api/v1/docs)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

# 🧠 ORYNT — Unified AI API with x402 Payments

Pay-as-you-use AI model wrapper — ORYNT connects developers to multiple AI models (chat, image, code, and more) through a single API, powered by the x402 micropayment protocol.

## 🚀 Overview

ORYNT is an open AI infrastructure layer that simplifies how you access and pay for AI services.

- 🌐 Unified API for major AI providers (OpenAI, Gradient Network, etc.)
- 💸 x402 Pay-as-you-use billing — no subscriptions or API key management
- 🧩 Lightweight SDK (@orynt/ai-x402) for instant integration
- 🔒 Secure endpoints with transparent usage tracking

## 🧩 Architecture

```
Client (Frontend / SDK)
        ↓
    ORYNT API Gateway
        ↓
  AI Provider (OpenAI, Gradient Network etc.)
        ↓
   x402 Payment Layer
```

## ORYNT acts as a universal AI gateway — developers send a request once, ORYNT handles:

- Provider selection,
- Model routing,
- Payment verification (via x402),
- And response delivery.

## 💳 Pay-as-you-Use with x402

ORYNT integrates x402, a decentralized payment standard for API metering.
Instead of monthly subscriptions, users pay per request, in real-time.

### 🔁 Flow

1. Your SDK or client attaches an x402 payment signature.
2. ORYNT validates it before forwarding to the AI model.
3. The request is executed and the response is returned instantly.

### Supported Models

| Model                                     | Provider         | features                                                                 |
| ----------------------------------------- | ---------------- | ------------------------------------------------------------------------ |
| `gpt-4.1`                                 | Openai           | `chat`,`embeddings`,`image generation`,`speech-to-text`,`text-to-speech` |
| `gpt-4o-mini`                             | Openai           | `chat`,`embeddings`,`image generation`,`speech-to-text`,`text-to-speech` |
| `gpt-3.5-turbo`                           | Openai           | `chat`                                                                   |
| `o1-mini`                                 | Openai           | `chat`                                                                   |
| `text-embedding-3-small`                  | Openai           | `embeddings`                                                             |
| `whisper-1`                               | Openai           | `speech-to-text`                                                         |
| `gpt-4o-mini-tts`                         | Openai           | `text-to-speech`                                                         |
| `dall-e-3`                                | Openai           | `image-generation`                                                       |
| `qwen/qwen3-coder-480b-instruct-fp8`      | Gradient-network | `chat`                                                                   |
| `qwen/qwen3-coder-480b-instruct-fp8-free` | Gradient-network | `chat`                                                                   |
| `openai/gpt-oss-120b-free`                | Gradient-network | `chat`                                                                   |

## Supported Networks

| Network         |
| --------------- |
| `solana`        |
| `solana-devnet` |
| `base`          |
| `base-sepolia`  |
| `polygon`       |
| `polygon-amoy`  |

## 🚀 Installation

```bash
npm add @orynt/ai-x402
```

## Basic Usage

provide a PRIVATE_KEY=...walletPrivate in your .env

```typescript
import { Orynt } from '@orynt/ai-x402';

const ai = new Orynt({
  baseUrl: 'https://api.oryntai.xyz/api/v1',
  network: 'solana-devnet',
});

await ai.generateImage({
  model: 'dall-e-3',
  prompt: 'A futuristic city skyline at sunset',
  n: 1,
  width: 1024,
  height: 1024,
});
```

### 🔗 Useful Links

- 📦 **NPM Package:** [@orynt/ai-x402](https://www.npmjs.com/package/@orynt/ai-x402)
- 🌐 **Public API Endpoint:** [https://api.oryntai.xyz/api/v1/docs](https://api.oryntai.xyz/api/v1/docs)
- 🏠 **Project Homepage:** [https://www.oryntai.xyz/](https://www.oryntai.xyz/)
