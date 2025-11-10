export type ImageQuality = 'standard' | 'hd';
export type PricingModelKey =
  | 'gpt-4.1'
  | 'gpt-4o-mini'
  | 'gpt-3.5-turbo'
  | 'o1-mini'
  | 'claude-3-opus'
  | 'claude-3-sonnet'
  | 'grok-1'
  | 'gradient-stratos'
  | 'qwen/qwen3-coder-480b-instruct-fp8'
  | 'qwen/qwen3-coder-480b-instruct-fp8-free'
  | 'openai/gpt-oss-120b-free'
  | 'text-embedding-3-small'
  | 'whisper-1'
  | 'gpt-4o-mini-tts'
  | 'dall-e-3';

interface PricingChat {
  input_per_million: number; // USD per 1M input tokens
  output_per_million: number; // USD per 1M output tokens
  context_limit?: number; // optional model context limit in tokens
}

interface PricingEmbeddings {
  per_million_tokens: number; // USD per 1M tokens
}

interface PricingImages {
  [resolution: string]: {
    [quality in ImageQuality | string]: number; // USD per image
  };
}

interface PricingSTT {
  per_minute: number; // USD per minute
}

interface PricingTTS {
  per_second: number; // USD per second
}

interface ModelPricing {
  chat?: PricingChat;
  embeddings?: PricingEmbeddings;
  images?: PricingImages;
  stt?: PricingSTT;
  tts?: PricingTTS;
}

const PER_TOKEN_DIV = 1_000_000; // convert per-million prices to per-token

export const PriceRegistry: Record<PricingModelKey, ModelPricing> = {
  // OpenAI
  'gpt-4.1': {
    chat: {
      input_per_million: 5.0,
      output_per_million: 15.0,
      context_limit: 128_000,
    },
    embeddings: { per_million_tokens: 0.1 },
    images: {
      '1024x1024': { standard: 0.04, hd: 0.08 },
      '512x512': { standard: 0.02, hd: 0.04 },
      '256x256': { standard: 0.01, hd: 0.02 },
    },
    stt: { per_minute: 0.006 },
    tts: { per_second: 0.0008 },
  },

  'gpt-4o-mini': {
    chat: {
      input_per_million: 0.15,
      output_per_million: 0.6,
      context_limit: 128_000,
    },
    embeddings: { per_million_tokens: 0.05 },
    images: { '1024x1024': { standard: 0.015 } },
    stt: { per_minute: 0.006 },
    tts: { per_second: 0.0008 },
  },

  'gpt-3.5-turbo': {
    chat: {
      input_per_million: 1.5,
      output_per_million: 2.0,
      context_limit: 16_384,
    },
  },

  'o1-mini': {
    chat: {
      input_per_million: 0.25,
      output_per_million: 0.3,
      context_limit: 16_384,
    },
  },

  // Anthropic
  'claude-3-opus': {
    chat: {
      input_per_million: 15.0,
      output_per_million: 75.0,
      context_limit: 200_000,
    },
  },
  'claude-3-sonnet': {
    chat: {
      input_per_million: 3.0,
      output_per_million: 15.0,
      context_limit: 200_000,
    },
  },

  // Grok (xAI)
  'grok-1': {
    chat: {
      input_per_million: 1.8,
      output_per_million: 2.8,
      context_limit: 128_000,
    },
  },

  // Gradient / Qwen
  'gradient-stratos': {
    chat: {
      input_per_million: 0.4,
      output_per_million: 1.2,
      context_limit: 128_000,
    },
  },
  'qwen/qwen3-coder-480b-instruct-fp8': {
    chat: {
      input_per_million: 0.25,
      output_per_million: 0.6,
      context_limit: 128_000,
    },
  },
  'qwen/qwen3-coder-480b-instruct-fp8-free': {
    chat: {
      input_per_million: 0.0,
      output_per_million: 0.0,
      context_limit: 128_000,
    },
  },
  'openai/gpt-oss-120b-free': {
    chat: {
      input_per_million: 0.0,
      output_per_million: 0.0,
      context_limit: 128_000,
    },
  },

  // Embeddings
  'text-embedding-3-small': {
    embeddings: { per_million_tokens: 0.02 },
  },

  // STT
  'whisper-1': {
    stt: { per_minute: 0.006 },
  },

  // TTS
  'gpt-4o-mini-tts': {
    tts: { per_second: 0.0008 },
  },

  // Images
  'dall-e-3': {
    images: {
      '1024x1024': { standard: 0.04, hd: 0.08 },
      '512x512': { standard: 0.02, hd: 0.04 },
      '256x256': { standard: 0.01, hd: 0.02 },
    },
  },
};

/* -------------------------
   Helper functions
   ------------------------- */

function ensureModelPricing(model: PricingModelKey) {
  const cfg = PriceRegistry[model];
  if (!cfg) throw new Error(`No pricing for model: ${model}`);
  return cfg;
}

function roundUsd(value: number) {
  // Keep enough precision for microcharges; round to 8 decimals
  return Number(value.toFixed(8));
}

/* -------- Chat pricing -------- */

/**
 * Estimate pre-authorization cost for chat-like calls.
 * Use inputTokens and desired maxOutputTokens (i.e. your max_tokens param).
 * Returns USD amount (number).
 */
export function estimateChatPreAuthCost(
  model: PricingModelKey,
  inputTokens: number,
  maxOutputTokens: number,
): number {
  const cfg = ensureModelPricing(model);
  const chat = cfg.chat;
  if (!chat) throw new Error(`Model ${model} does not support chat pricing`);

  const inputCost = (chat.input_per_million / PER_TOKEN_DIV) * inputTokens;
  const outputCost =
    (chat.output_per_million / PER_TOKEN_DIV) * maxOutputTokens;
  return roundUsd(inputCost + outputCost);
}

/**
 * Calculate final chat cost after response (actual input & output tokens).
 */
export function calculateChatFinalCost(
  model: PricingModelKey,
  inputTokens: number,
  outputTokens: number,
): number {
  const cfg = ensureModelPricing(model);
  const chat = cfg.chat;
  if (!chat) throw new Error(`Model ${model} does not support chat pricing`);

  const inputCost = (chat.input_per_million / PER_TOKEN_DIV) * inputTokens;
  const outputCost = (chat.output_per_million / PER_TOKEN_DIV) * outputTokens;
  return roundUsd(inputCost + outputCost);
}

/**
 * Get the model's context limit (if set). Useful for deriving max output tokens.
 */
export function getModelContextLimit(
  model: PricingModelKey,
): number | undefined {
  const cfg = ensureModelPricing(model);
  return cfg.chat?.context_limit;
}

/* -------- Embeddings pricing -------- */

/**
 * Estimate embeddings cost (inputTokenCount is number of tokens processed)
 * Returns USD amount for the embeddings call.
 */
export function calculateEmbeddingsCost(
  model: PricingModelKey,
  inputTokenCount: number,
): number {
  const cfg = ensureModelPricing(model);
  const emb = cfg.embeddings;
  if (!emb)
    throw new Error(`Model ${model} does not support embeddings pricing`);

  const cost = (emb.per_million_tokens / PER_TOKEN_DIV) * inputTokenCount;
  return roundUsd(cost);
}

/* -------- Image pricing -------- */

/**
 * Calculate image generation cost.
 * model: 'dall-e-3' or other image-capable entry
 * resolution: '1024x1024' | '512x512' | '256x256'
 * quality: 'standard' | 'hd' (or other quality keys defined in the registry)
 * count: number of images
 */
export function calculateImageCost(
  model: PricingModelKey,
  resolution: string,
  quality: ImageQuality | string = 'standard',
  count = 1,
): number {
  const cfg = ensureModelPricing(model);
  const images = cfg.images;
  if (!images) throw new Error(`Model ${model} does not support image pricing`);

  const resEntry = images[resolution];
  if (!resEntry)
    throw new Error(
      `Resolution ${resolution} not supported for model ${model}`,
    );

  const pricePer = resEntry[quality];
  if (pricePer == null)
    throw new Error(
      `Quality ${quality} not supported for ${model}@${resolution}`,
    );

  return roundUsd(pricePer * Math.max(1, count));
}

/* -------- STT pricing -------- */

/**
 * Calculate speech-to-text cost.
 * Accepts seconds or minutes; prefer passing seconds for precision.
 * If you have seconds: set seconds parameter and pass minutes = undefined.
 * If you have minutes: pass minutes (e.g., audio length).
 */
export function calculateSttCost(
  model: PricingModelKey,
  { seconds, minutes }: { seconds?: number; minutes?: number },
): number {
  const cfg = ensureModelPricing(model);
  const s = cfg.stt;
  if (!s) throw new Error(`Model ${model} does not support STT pricing`);

  const mins = minutes ?? (seconds ? seconds / 60 : 0);
  const cost = s.per_minute * Math.max(0, mins);
  return roundUsd(cost);
}

/* -------- TTS pricing -------- */

/**
 * Calculate text-to-speech cost.
 * Accepts duration in seconds of generated audio.
 */
export function calculateTtsCost(
  model: PricingModelKey,
  seconds: number,
): number {
  const cfg = ensureModelPricing(model);
  const t = cfg.tts;
  if (!t) throw new Error(`Model ${model} does not support TTS pricing`);

  const cost = t.per_second * Math.max(0, seconds);
  return roundUsd(cost);
}

/* -------- Generic helpers / request-level preauth -------- */

export type FeatureType = 'chat' | 'embeddings' | 'images' | 'stt' | 'tts';

/**
 * Generic pre-auth estimator: choose the right estimator by feature.
 * - For chat: supply inputTokens & maxOutputTokens
 * - For embeddings: supply inputTokens (or tokens)
 * - For images: supply resolution, quality, count
 * - For stt: supply seconds or minutes
 * - For tts: supply seconds
 */
export function estimatePreAuthForRequest(params: {
  model: PricingModelKey;
  feature: FeatureType;
  // chat
  inputTokens?: number;
  maxOutputTokens?: number;
  // embeddings
  embeddingInputTokens?: number;
  // images
  resolution?: string;
  quality?: ImageQuality | string;
  imageCount?: number;
  // stt
  sttSeconds?: number;
  sttMinutes?: number;
  // tts
  ttsSeconds?: number;
}): number {
  const { model, feature } = params;

  switch (feature) {
    case 'chat': {
      const inputTokens = params.inputTokens ?? 0;
      const maxOutputTokens =
        params.maxOutputTokens ??
        Math.max(0, (getModelContextLimit(model) ?? 0) - inputTokens);
      return estimateChatPreAuthCost(model, inputTokens, maxOutputTokens);
    }
    case 'embeddings': {
      const tokens = params.embeddingInputTokens ?? 0;
      return calculateEmbeddingsCost(model, tokens);
    }
    case 'images': {
      const resolution = params.resolution ?? '1024x1024';
      const quality = params.quality ?? 'standard';
      const count = params.imageCount ?? 1;
      return calculateImageCost(model, resolution, quality, count);
    }
    case 'stt': {
      const { sttSeconds, sttMinutes } = params;
      return calculateSttCost(model, {
        seconds: sttSeconds,
        minutes: sttMinutes,
      });
    }
    case 'tts': {
      const seconds = params.ttsSeconds ?? 0;
      return calculateTtsCost(model, seconds);
    }
    default:
      throw new Error(`Unsupported feature: ${feature}`);
  }
}

/* -------- Example usage snippets (for dev reference) -------- */

/*
Example: pre-auth chat
const preAuthUsd = estimatePreAuthForRequest({
  model: 'gpt-4.1',
  feature: 'chat',
  inputTokens: 140,
  maxOutputTokens: 500
});

Example: final chat settle
const finalUsd = calculateChatFinalCost('gpt-4.1', 140, 160);

Example: image
const imageUsd = calculateImageCost('dall-e-3', '1024x1024', 'hd', 3);

Example: stt
const sttUsd = calculateSttCost('whisper-1', { seconds: 125 });

Example: tts
const ttsUsd = calculateTtsCost('gpt-4o-mini-tts', 30);
*/

export default {
  PriceRegistry,
  estimateChatPreAuthCost,
  calculateChatFinalCost,
  getModelContextLimit,
  calculateEmbeddingsCost,
  calculateImageCost,
  calculateSttCost,
  calculateTtsCost,
  estimatePreAuthForRequest,
};
