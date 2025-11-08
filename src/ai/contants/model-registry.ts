import { prepareAnthropicRequest } from '../ai-providers/anthropic.provider';
import { prepareGradientRequest } from '../ai-providers/gradient.provider';
import { prepareGrokRequest } from '../ai-providers/grok.provider';
import {
  prepareOpenAiEmbeddingsRequest,
  prepareOpenAiImageRequest,
  prepareOpenAiRequest,
  prepareOpenAiTranscriptionRequest,
  prepareOpenAiTtsRequest,
} from '../ai-providers/openai.provider';

export type Feature =
  | 'chat'
  | 'embeddings'
  | 'images'
  | 'stt'
  | 'tts'
  | 'models';

export interface ModelConfig {
  provider: 'openai' | 'anthropic' | 'grok' | 'gradient';
  endpoints: Partial<Record<Feature, string>>;
  prepare: Partial<Record<Feature, (body: any) => any>>;
}

export const ModelRegistry: Record<string, ModelConfig> = {
  // ========== OpenAI Full Feature Models ==========
  'gpt-4.1': {
    provider: 'openai',
    endpoints: {
      chat: 'https://api.openai.com/v1/responses',
      embeddings: 'https://api.openai.com/v1/embeddings',
      images: 'https://api.openai.com/v1/images/generations',
      stt: 'https://api.openai.com/v1/audio/transcriptions',
      tts: 'https://api.openai.com/v1/audio/speech',
      models: 'https://api.openai.com/v1/models',
    },
    prepare: {
      chat: prepareOpenAiRequest,
      embeddings: prepareOpenAiEmbeddingsRequest,
      images: prepareOpenAiImageRequest,
      stt: prepareOpenAiTranscriptionRequest,
      tts: prepareOpenAiTtsRequest,
    },
  },

  'gpt-4o-mini': {
    provider: 'openai',
    endpoints: {
      chat: 'https://api.openai.com/v1/responses',
      embeddings: 'https://api.openai.com/v1/embeddings',
      images: 'https://api.openai.com/v1/images/generations',
      stt: 'https://api.openai.com/v1/audio/transcriptions',
      tts: 'https://api.openai.com/v1/audio/speech',
      models: 'https://api.openai.com/v1/models',
    },
    prepare: {
      chat: prepareOpenAiRequest,
      embeddings: prepareOpenAiEmbeddingsRequest,
      images: prepareOpenAiImageRequest,
      stt: prepareOpenAiTranscriptionRequest,
      tts: prepareOpenAiTtsRequest,
    },
  },

  // ========== OpenAI Chat-only Models ==========
  'gpt-3.5-turbo': {
    provider: 'openai',
    endpoints: { chat: 'https://api.openai.com/v1/responses' },
    prepare: { chat: prepareOpenAiRequest },
  },

  'o1-mini': {
    provider: 'openai',
    endpoints: { chat: 'https://api.openai.com/v1/responses' },
    prepare: { chat: prepareOpenAiRequest },
  },

  // ========== Anthropic Claude ==========
  'claude-3-opus': {
    provider: 'anthropic',
    endpoints: { chat: 'https://api.anthropic.com/v1/messages' },
    prepare: { chat: prepareAnthropicRequest },
  },
  'claude-3-sonnet': {
    provider: 'anthropic',
    endpoints: { chat: 'https://api.anthropic.com/v1/messages' },
    prepare: { chat: prepareAnthropicRequest },
  },

  // ========== Grok (xAI) ==========
  'grok-1': {
    provider: 'grok',
    endpoints: { chat: 'https://api.x.ai/v1/chat/completions' },
    prepare: { chat: prepareGrokRequest },
  },

  // ========== Gradient (AI21) ==========
  'gradient-stratos': {
    provider: 'gradient',
    endpoints: { chat: 'https://api.gradient.ai/v1/chat/completions' },
    prepare: { chat: prepareGrokRequest },
  },

  // ========== Embeddings ==========
  'text-embedding-3-small': {
    provider: 'openai',
    endpoints: { embeddings: 'https://api.openai.com/v1/embeddings' },
    prepare: { embeddings: prepareOpenAiEmbeddingsRequest },
  },

  // ========== Speech to Text ==========
  'whisper-1': {
    provider: 'openai',
    endpoints: { stt: 'https://api.openai.com/v1/audio/transcriptions' },
    prepare: { stt: prepareOpenAiTranscriptionRequest },
  },

  // ========== Text to Speech ==========
  'gpt-4o-mini-tts': {
    provider: 'openai',
    endpoints: { tts: 'https://api.openai.com/v1/audio/speech' },
    prepare: { tts: prepareOpenAiTtsRequest },
  },

  // ========== Image Generation ==========
  'dall-e-3': {
    provider: 'openai',
    endpoints: { images: 'https://api.openai.com/v1/images/generations' },
    prepare: { images: prepareOpenAiImageRequest },
  },

  // ========== Gradient network Models ==========

  'qwen/qwen3-coder-480b-instruct-fp8': {
    provider: 'gradient',
    endpoints: {
      chat: 'https://apis.gradient.network/api/v1/ai/chat/completions',
      models: 'https://apis.gradient.network/api/v1/ai/models',
    },
    prepare: {
      chat: prepareGradientRequest,
    },
  },

  'qwen/qwen3-coder-480b-instruct-fp8-free': {
    provider: 'gradient',
    endpoints: {
      chat: 'https://apis.gradient.network/api/v1/ai/chat/completions',
      models: 'https://apis.gradient.network/api/v1/ai/models',
    },
    prepare: {
      chat: prepareGradientRequest,
    },
  },

  'openai/gpt-oss-120b-free': {
    provider: 'gradient',
    endpoints: {
      chat: 'https://apis.gradient.network/api/v1/ai/chat/completions',
      models: 'https://apis.gradient.network/api/v1/ai/models',
    },
    prepare: {
      chat: prepareGradientRequest,
    },
  },
};
