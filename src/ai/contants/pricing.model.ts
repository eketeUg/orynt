export type Feature = 'chat' | 'embeddings' | 'images' | 'stt' | 'tts';

export interface ModelPricing {
  feature: Feature;
  inputTokenUSD?: number; // per 1 token
  outputTokenUSD?: number; // per 1 token
  perMinuteUSD?: number; // Speech-to-text
  perCharacterUSD?: number; // TTS
  perImageUSD?: number; // Image generation
}

export const PricingRegistry: Record<string, ModelPricing> = {
  'gpt-4.1': {
    feature: 'chat',
    inputTokenUSD: 0.0000025,
    outputTokenUSD: 0.000005,
  },
  'gpt-4o-mini': {
    feature: 'chat',
    inputTokenUSD: 0.00000015,
    outputTokenUSD: 0.0000006,
  },
  'gpt-3.5-turbo': {
    feature: 'chat',
    inputTokenUSD: 0.0000015,
    outputTokenUSD: 0.000002,
  },
  'o1-mini': {
    feature: 'chat',
    inputTokenUSD: 0.0000009,
    outputTokenUSD: 0.0000013,
  },

  'claude-3-opus': {
    feature: 'chat',
    inputTokenUSD: 0.000015,
    outputTokenUSD: 0.000075,
  },
  'claude-3-sonnet': {
    feature: 'chat',
    inputTokenUSD: 0.000003,
    outputTokenUSD: 0.000015,
  },

  'grok-1': {
    feature: 'chat',
    inputTokenUSD: 0.00001,
    outputTokenUSD: 0.00003,
  },

  'gradient-stratos': {
    feature: 'chat',
    inputTokenUSD: 0.000002,
    outputTokenUSD: 0.000004,
  },
  'qwen/qwen3-coder-480b-instruct-fp8': {
    feature: 'chat',
    inputTokenUSD: 0.0000015,
    outputTokenUSD: 0.000003,
  },
  'qwen/qwen3-coder-480b-instruct-fp8-free': {
    feature: 'chat',
    inputTokenUSD: 0,
    outputTokenUSD: 0,
  },
  'openai/gpt-oss-120b-free': {
    feature: 'chat',
    inputTokenUSD: 0,
    outputTokenUSD: 0,
  },

  'text-embedding-3-small': {
    feature: 'embeddings',
    inputTokenUSD: 0.00000002,
  },

  'whisper-1': { feature: 'stt', perMinuteUSD: 0.006 },

  'gpt-4o-mini-tts': { feature: 'tts', perCharacterUSD: 0.000015 },

  'dall-e-3': { feature: 'images', perImageUSD: 0.04 },
};
