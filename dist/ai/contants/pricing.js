"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceRegistry = void 0;
exports.estimateChatPreAuthCost = estimateChatPreAuthCost;
exports.calculateChatFinalCost = calculateChatFinalCost;
exports.getModelContextLimit = getModelContextLimit;
exports.calculateEmbeddingsCost = calculateEmbeddingsCost;
exports.calculateImageCost = calculateImageCost;
exports.calculateSttCost = calculateSttCost;
exports.calculateTtsCost = calculateTtsCost;
exports.estimatePreAuthForRequest = estimatePreAuthForRequest;
const PER_TOKEN_DIV = 1_000_000;
exports.PriceRegistry = {
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
    'grok-1': {
        chat: {
            input_per_million: 1.8,
            output_per_million: 2.8,
            context_limit: 128_000,
        },
    },
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
    'text-embedding-3-small': {
        embeddings: { per_million_tokens: 0.02 },
    },
    'whisper-1': {
        stt: { per_minute: 0.006 },
    },
    'gpt-4o-mini-tts': {
        tts: { per_second: 0.0008 },
    },
    'dall-e-3': {
        images: {
            '1024x1024': { standard: 0.04, hd: 0.08 },
            '512x512': { standard: 0.02, hd: 0.04 },
            '256x256': { standard: 0.01, hd: 0.02 },
        },
    },
};
function ensureModelPricing(model) {
    const cfg = exports.PriceRegistry[model];
    if (!cfg)
        throw new Error(`No pricing for model: ${model}`);
    return cfg;
}
function roundUsd(value) {
    return Number(value.toFixed(8));
}
function estimateChatPreAuthCost(model, inputTokens, maxOutputTokens) {
    const cfg = ensureModelPricing(model);
    const chat = cfg.chat;
    if (!chat)
        throw new Error(`Model ${model} does not support chat pricing`);
    const inputCost = (chat.input_per_million / PER_TOKEN_DIV) * inputTokens;
    const outputCost = (chat.output_per_million / PER_TOKEN_DIV) * maxOutputTokens;
    return roundUsd(inputCost + outputCost);
}
function calculateChatFinalCost(model, inputTokens, outputTokens) {
    const cfg = ensureModelPricing(model);
    const chat = cfg.chat;
    if (!chat)
        throw new Error(`Model ${model} does not support chat pricing`);
    const inputCost = (chat.input_per_million / PER_TOKEN_DIV) * inputTokens;
    const outputCost = (chat.output_per_million / PER_TOKEN_DIV) * outputTokens;
    return roundUsd(inputCost + outputCost);
}
function getModelContextLimit(model) {
    const cfg = ensureModelPricing(model);
    return cfg.chat?.context_limit;
}
function calculateEmbeddingsCost(model, inputTokenCount) {
    const cfg = ensureModelPricing(model);
    const emb = cfg.embeddings;
    if (!emb)
        throw new Error(`Model ${model} does not support embeddings pricing`);
    const cost = (emb.per_million_tokens / PER_TOKEN_DIV) * inputTokenCount;
    return roundUsd(cost);
}
function calculateImageCost(model, resolution, quality = 'standard', count = 1) {
    const cfg = ensureModelPricing(model);
    const images = cfg.images;
    if (!images)
        throw new Error(`Model ${model} does not support image pricing`);
    const resEntry = images[resolution];
    if (!resEntry)
        throw new Error(`Resolution ${resolution} not supported for model ${model}`);
    const pricePer = resEntry[quality];
    if (pricePer == null)
        throw new Error(`Quality ${quality} not supported for ${model}@${resolution}`);
    return roundUsd(pricePer * Math.max(1, count));
}
function calculateSttCost(model, { seconds, minutes }) {
    const cfg = ensureModelPricing(model);
    const s = cfg.stt;
    if (!s)
        throw new Error(`Model ${model} does not support STT pricing`);
    const mins = minutes ?? (seconds ? seconds / 60 : 0);
    const cost = s.per_minute * Math.max(0, mins);
    return roundUsd(cost);
}
function calculateTtsCost(model, seconds) {
    const cfg = ensureModelPricing(model);
    const t = cfg.tts;
    if (!t)
        throw new Error(`Model ${model} does not support TTS pricing`);
    const cost = t.per_second * Math.max(0, seconds);
    return roundUsd(cost);
}
function estimatePreAuthForRequest(params) {
    const { model, feature } = params;
    switch (feature) {
        case 'chat': {
            const inputTokens = params.inputTokens ?? 0;
            const maxOutputTokens = params.maxOutputTokens ??
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
exports.default = {
    PriceRegistry: exports.PriceRegistry,
    estimateChatPreAuthCost,
    calculateChatFinalCost,
    getModelContextLimit,
    calculateEmbeddingsCost,
    calculateImageCost,
    calculateSttCost,
    calculateTtsCost,
    estimatePreAuthForRequest,
};
//# sourceMappingURL=pricing.js.map