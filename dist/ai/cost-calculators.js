"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CostCalculator = void 0;
exports.getModelFeature = getModelFeature;
const pricing_model_1 = require("./contants/pricing.model");
class CostCalculator {
    static estimateCost(model, feature, metrics) {
        const pricing = pricing_model_1.PricingRegistry[model];
        if (!pricing || pricing.feature !== feature) {
            throw new Error(`Pricing not found for model ${model} and feature ${feature}`);
        }
        let cost = 0;
        switch (feature) {
            case 'chat':
                if (pricing.inputTokenUSD && metrics.inputTokens) {
                    cost += pricing.inputTokenUSD * metrics.inputTokens;
                }
                if (pricing.outputTokenUSD && metrics.outputTokens) {
                    cost += pricing.outputTokenUSD * metrics.outputTokens;
                }
                break;
            case 'embeddings':
                if (pricing.inputTokenUSD && metrics.inputTokens) {
                    cost += pricing.inputTokenUSD * metrics.inputTokens;
                }
                break;
            case 'stt':
                if (pricing.perMinuteUSD && metrics.audioMinutes) {
                    cost += pricing.perMinuteUSD * metrics.audioMinutes;
                }
                break;
            case 'tts':
                if (pricing.perCharacterUSD && metrics.characterCount) {
                    cost += pricing.perCharacterUSD * metrics.characterCount;
                }
                break;
            case 'images':
                if (pricing.perImageUSD && metrics.imageCount) {
                    cost += pricing.perImageUSD * metrics.imageCount;
                }
                break;
            default:
                throw new Error(`Unsupported feature: ${feature}`);
        }
        return Number(cost.toFixed(6));
    }
    static estimateMetrics(dto, feature) {
        const metrics = {};
        switch (feature) {
            case 'chat':
                const input = dto.input ??
                    dto.messages ??
                    (dto.prompt ? [{ role: 'user', content: dto.prompt }] : []);
                metrics.inputTokens = this.estimateTokens(JSON.stringify(input));
                metrics.outputTokens = dto.max_tokens ?? 1024;
                break;
            case 'embeddings':
                metrics.inputTokens = this.estimateTokens(dto.text);
                break;
            case 'stt':
                metrics.audioMinutes = dto.audioDuration ?? 1;
                break;
            case 'tts':
                metrics.characterCount = dto.text?.length ?? 0;
                break;
            case 'images':
                metrics.imageCount = dto.n ?? 1;
                break;
        }
        return metrics;
    }
    static estimateTokens(text) {
        return Math.ceil(text.length / 4);
    }
}
exports.CostCalculator = CostCalculator;
function getModelFeature(model) {
    const pricing = pricing_model_1.PricingRegistry[model];
    return pricing ? pricing.feature : null;
}
//# sourceMappingURL=cost-calculators.js.map