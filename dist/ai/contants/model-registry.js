"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelRegistry = void 0;
const anthropic_provider_1 = require("../ai-providers/anthropic.provider");
const gradient_provider_1 = require("../ai-providers/gradient.provider");
const grok_provider_1 = require("../ai-providers/grok.provider");
const openai_provider_1 = require("../ai-providers/openai.provider");
exports.ModelRegistry = {
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
            chat: openai_provider_1.prepareOpenAiRequest,
            embeddings: openai_provider_1.prepareOpenAiEmbeddingsRequest,
            images: openai_provider_1.prepareOpenAiImageRequest,
            stt: openai_provider_1.prepareOpenAiTranscriptionRequest,
            tts: openai_provider_1.prepareOpenAiTtsRequest,
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
            chat: openai_provider_1.prepareOpenAiRequest,
            embeddings: openai_provider_1.prepareOpenAiEmbeddingsRequest,
            images: openai_provider_1.prepareOpenAiImageRequest,
            stt: openai_provider_1.prepareOpenAiTranscriptionRequest,
            tts: openai_provider_1.prepareOpenAiTtsRequest,
        },
    },
    'gpt-3.5-turbo': {
        provider: 'openai',
        endpoints: { chat: 'https://api.openai.com/v1/responses' },
        prepare: { chat: openai_provider_1.prepareOpenAiRequest },
    },
    'o1-mini': {
        provider: 'openai',
        endpoints: { chat: 'https://api.openai.com/v1/responses' },
        prepare: { chat: openai_provider_1.prepareOpenAiRequest },
    },
    'claude-3-opus': {
        provider: 'anthropic',
        endpoints: { chat: 'https://api.anthropic.com/v1/messages' },
        prepare: { chat: anthropic_provider_1.prepareAnthropicRequest },
    },
    'claude-3-sonnet': {
        provider: 'anthropic',
        endpoints: { chat: 'https://api.anthropic.com/v1/messages' },
        prepare: { chat: anthropic_provider_1.prepareAnthropicRequest },
    },
    'grok-1': {
        provider: 'grok',
        endpoints: { chat: 'https://api.x.ai/v1/chat/completions' },
        prepare: { chat: grok_provider_1.prepareGrokRequest },
    },
    'gradient-stratos': {
        provider: 'gradient',
        endpoints: { chat: 'https://api.gradient.ai/v1/chat/completions' },
        prepare: { chat: grok_provider_1.prepareGrokRequest },
    },
    'text-embedding-3-small': {
        provider: 'openai',
        endpoints: { embeddings: 'https://api.openai.com/v1/embeddings' },
        prepare: { embeddings: openai_provider_1.prepareOpenAiEmbeddingsRequest },
    },
    'whisper-1': {
        provider: 'openai',
        endpoints: { stt: 'https://api.openai.com/v1/audio/transcriptions' },
        prepare: { stt: openai_provider_1.prepareOpenAiTranscriptionRequest },
    },
    'gpt-4o-mini-tts': {
        provider: 'openai',
        endpoints: { tts: 'https://api.openai.com/v1/audio/speech' },
        prepare: { tts: openai_provider_1.prepareOpenAiTtsRequest },
    },
    'dall-e-3': {
        provider: 'openai',
        endpoints: { images: 'https://api.openai.com/v1/images/generations' },
        prepare: { images: openai_provider_1.prepareOpenAiImageRequest },
    },
    'qwen/qwen3-coder-480b-instruct-fp8': {
        provider: 'gradient',
        endpoints: {
            chat: 'https://apis.gradient.network/api/v1/ai/chat/completions',
            models: 'https://apis.gradient.network/api/v1/ai/models',
        },
        prepare: {
            chat: gradient_provider_1.prepareGradientRequest,
        },
    },
    'qwen/qwen3-coder-480b-instruct-fp8-free': {
        provider: 'gradient',
        endpoints: {
            chat: 'https://apis.gradient.network/api/v1/ai/chat/completions',
            models: 'https://apis.gradient.network/api/v1/ai/models',
        },
        prepare: {
            chat: gradient_provider_1.prepareGradientRequest,
        },
    },
    'openai/gpt-oss-120b-free': {
        provider: 'gradient',
        endpoints: {
            chat: 'https://apis.gradient.network/api/v1/ai/chat/completions',
            models: 'https://apis.gradient.network/api/v1/ai/models',
        },
        prepare: {
            chat: gradient_provider_1.prepareGradientRequest,
        },
    },
};
//# sourceMappingURL=model-registry.js.map