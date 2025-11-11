import {
  Feature,
  ModelPricing,
  PricingRegistry,
} from './contants/pricing.model';

interface UsageMetrics {
  inputTokens?: number;
  outputTokens?: number;
  audioMinutes?: number;
  characterCount?: number;
  imageCount?: number;
}

export class CostCalculator {
  static estimateCost(
    model: string,
    feature: Feature,
    metrics: Partial<UsageMetrics>,
  ): number {
    const pricing: ModelPricing | undefined = PricingRegistry[model];
    if (!pricing || pricing.feature !== feature) {
      throw new Error(
        `Pricing not found for model ${model} and feature ${feature}`,
      );
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

    return Number(cost.toFixed(6)); // Round to 6 decimal places
  }

  // Helper to estimate metrics based on input DTO
  static estimateMetrics(dto: any, feature: Feature): Partial<UsageMetrics> {
    const metrics: Partial<UsageMetrics> = {};

    switch (feature) {
      case 'chat':
        // Estimate input tokens
        const input =
          dto.input ??
          dto.messages ??
          (dto.prompt ? [{ role: 'user', content: dto.prompt }] : []);
        metrics.inputTokens = this.estimateTokens(JSON.stringify(input));
        // Estimate output tokens (e.g., assume max_tokens or a fixed ratio)
        metrics.outputTokens = dto.max_tokens ?? 1024; // Conservative estimate: assume max output
        break;

      case 'embeddings':
        metrics.inputTokens = this.estimateTokens(dto.text);
        break;

      case 'stt':
        // Assume client provides duration or estimate based on file metadata (if available)
        metrics.audioMinutes = dto.audioDuration ?? 1; // Fallback: assume 1 minute
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

  // Simple token estimation (replace with tiktoken or provider-specific tokenizer if available)
  private static estimateTokens(text: string): number {
    // Rough heuristic: 1 token ≈ 4 characters for English text
    return Math.ceil(text.length / 4);
  }
}

export function getModelFeature(model: string): ModelPricing['feature'] | null {
  const pricing = PricingRegistry[model];
  return pricing ? pricing.feature : null;
}
