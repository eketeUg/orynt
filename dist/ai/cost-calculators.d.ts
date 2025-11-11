import { Feature, ModelPricing } from './contants/pricing.model';
interface UsageMetrics {
    inputTokens?: number;
    outputTokens?: number;
    audioMinutes?: number;
    characterCount?: number;
    imageCount?: number;
}
export declare class CostCalculator {
    static estimateCost(model: string, feature: Feature, metrics: Partial<UsageMetrics>): number;
    static estimateMetrics(dto: any, feature: Feature): Partial<UsageMetrics>;
    private static estimateTokens;
}
export declare function getModelFeature(model: string): ModelPricing['feature'] | null;
export {};
