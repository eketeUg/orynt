export const ModelRegistry = {
  // OpenAI Models
  'gpt-4.1': {
    provider: 'openai',
    endpoint: 'https://api.openai.com/v1/responses',
  },
  'o1-mini': {
    provider: 'openai',
    endpoint: 'https://api.openai.com/v1/responses',
  },

  // Anthropic Claude Models
  'claude-3-opus': {
    provider: 'anthropic',
    endpoint: 'https://api.anthropic.com/v1/messages',
  },
  'claude-3-sonnet': {
    provider: 'anthropic',
    endpoint: 'https://api.anthropic.com/v1/messages',
  },

  // Grok (xAI)
  'grok-1': {
    provider: 'grok',
    endpoint: 'https://api.x.ai/v1/chat/completions',
  },

  // Gradient (AI21)
  'gradient-stratos': {
    provider: 'gradient',
    endpoint: 'https://api.gradient.ai/v1/chat/completions',
  },
};
