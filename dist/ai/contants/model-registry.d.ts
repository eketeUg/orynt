export type Feature = 'chat' | 'embeddings' | 'images' | 'stt' | 'tts' | 'models';
export interface ModelConfig {
    provider: 'openai' | 'anthropic' | 'grok' | 'gradient';
    endpoints: Partial<Record<Feature, string>>;
    prepare: Partial<Record<Feature, (body: any) => any>>;
}
export declare const ModelRegistry: Record<string, ModelConfig>;
