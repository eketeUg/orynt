export type ImageQuality = 'standard' | 'hd';
export type PricingModelKey = 'gpt-4.1' | 'gpt-4o-mini' | 'gpt-3.5-turbo' | 'o1-mini' | 'claude-3-opus' | 'claude-3-sonnet' | 'grok-1' | 'gradient-stratos' | 'qwen/qwen3-coder-480b-instruct-fp8' | 'qwen/qwen3-coder-480b-instruct-fp8-free' | 'openai/gpt-oss-120b-free' | 'text-embedding-3-small' | 'whisper-1' | 'gpt-4o-mini-tts' | 'dall-e-3';
interface PricingChat {
    input_per_million: number;
    output_per_million: number;
    context_limit?: number;
}
interface PricingEmbeddings {
    per_million_tokens: number;
}
interface PricingImages {
    [resolution: string]: {
        [quality in ImageQuality | string]: number;
    };
}
interface PricingSTT {
    per_minute: number;
}
interface PricingTTS {
    per_second: number;
}
interface ModelPricing {
    chat?: PricingChat;
    embeddings?: PricingEmbeddings;
    images?: PricingImages;
    stt?: PricingSTT;
    tts?: PricingTTS;
}
export declare const PriceRegistry: Record<PricingModelKey, ModelPricing>;
export declare function estimateChatPreAuthCost(model: PricingModelKey, inputTokens: number, maxOutputTokens: number): number;
export declare function calculateChatFinalCost(model: PricingModelKey, inputTokens: number, outputTokens: number): number;
export declare function getModelContextLimit(model: PricingModelKey): number | undefined;
export declare function calculateEmbeddingsCost(model: PricingModelKey, inputTokenCount: number): number;
export declare function calculateImageCost(model: PricingModelKey, resolution: string, quality?: ImageQuality | string, count?: number): number;
export declare function calculateSttCost(model: PricingModelKey, { seconds, minutes }: {
    seconds?: number;
    minutes?: number;
}): number;
export declare function calculateTtsCost(model: PricingModelKey, seconds: number): number;
export type FeatureType = 'chat' | 'embeddings' | 'images' | 'stt' | 'tts';
export declare function estimatePreAuthForRequest(params: {
    model: PricingModelKey;
    feature: FeatureType;
    inputTokens?: number;
    maxOutputTokens?: number;
    embeddingInputTokens?: number;
    resolution?: string;
    quality?: ImageQuality | string;
    imageCount?: number;
    sttSeconds?: number;
    sttMinutes?: number;
    ttsSeconds?: number;
}): number;
declare const _default: {
    PriceRegistry: Record<PricingModelKey, ModelPricing>;
    estimateChatPreAuthCost: typeof estimateChatPreAuthCost;
    calculateChatFinalCost: typeof calculateChatFinalCost;
    getModelContextLimit: typeof getModelContextLimit;
    calculateEmbeddingsCost: typeof calculateEmbeddingsCost;
    calculateImageCost: typeof calculateImageCost;
    calculateSttCost: typeof calculateSttCost;
    calculateTtsCost: typeof calculateTtsCost;
    estimatePreAuthForRequest: typeof estimatePreAuthForRequest;
};
export default _default;
