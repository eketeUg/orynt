import { prepareAnthropicRequest } from '../ai-providers/anthropic.provider';
import { prepareGrokRequest } from '../ai-providers/grok.provider';
import { prepareOpenAiRequest } from '../ai-providers/openai.provider';

export const ModelRegistry = {
  // OpenAI Models
  'gpt-4.1': {
    provider: 'openai',
    endpoint: 'https://api.openai.com/v1/responses',
    prepareRequest: prepareOpenAiRequest,
  },
  'gpt-3.5-turbo': {
    provider: 'openai',
    endpoint: 'https://api.openai.com/v1/responses',
    prepareRequest: prepareOpenAiRequest,
  },

  'o1-mini': {
    provider: 'openai',
    endpoint: 'https://api.openai.com/v1/responses',
    prepareRequest: prepareOpenAiRequest,
  },

  // Anthropic Claude Models
  'claude-3-opus': {
    provider: 'anthropic',
    endpoint: 'https://api.anthropic.com/v1/messages',
    prepareRequest: prepareAnthropicRequest,
  },
  'claude-3-sonnet': {
    provider: 'anthropic',
    endpoint: 'https://api.anthropic.com/v1/messages',
    prepareRequest: prepareAnthropicRequest,
  },

  // Grok (xAI)
  'grok-1': {
    provider: 'grok',
    endpoint: 'https://api.x.ai/v1/chat/completions',
    prepareRequest: prepareGrokRequest,
  },

  // Gradient (AI21)
  'gradient-stratos': {
    provider: 'gradient',
    endpoint: 'https://api.gradient.ai/v1/chat/completions',
    prepareRequest: prepareGrokRequest,
  },

  // Embeddings
  'text-embedding-3-small': {
    provider: 'openai',
    endpoint: 'https://api.openai.com/v1/embeddings',
  },

  // Audio STT
  'whisper-1': {
    provider: 'openai',
    endpoint: 'https://api.openai.com/v1/audio/transcriptions',
  },

  // Audio TTS (if supported)
  'gpt-4o-tts': {
    provider: 'openai',
    endpoint: 'https://api.openai.com/v1/audio/speech',
  },

  // Image generation
  'dall-e-3': {
    provider: 'openai',
    endpoint: 'https://api.openai.com/v1/images/generations',
  },

  //   Vision / Multimodal
  'gpt-4o-mini': {
    provider: 'openai',
    endpoint: 'https://api.openai.com/v1/responses',
  },
};
