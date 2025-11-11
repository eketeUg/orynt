export type Feature = 'chat' | 'embeddings' | 'images' | 'stt' | 'tts';
export interface ModelPricing {
    feature: Feature;
    inputTokenUSD?: number;
    outputTokenUSD?: number;
    perMinuteUSD?: number;
    perCharacterUSD?: number;
    perImageUSD?: number;
}
export declare const PricingRegistry: Record<string, ModelPricing>;
