import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AiRunnerService } from './ai.runner.service';
import {
  ChatDto,
  EmbeddingDto,
  ImageDto,
  SttDto,
  TtsDto,
} from './dto/ai-request.dto';

@Controller('ai')
export class AiController {
  constructor(private readonly ai: AiRunnerService) {}

  // ====== Chat / Completion ======
  @Post('chat')
  async chat(@Body() dto: ChatDto) {
    const input =
      dto.input ??
      dto.messages ??
      (dto.prompt ? [{ role: 'user', content: dto.prompt }] : []);

    const body = {
      input,
      temperature: dto.temperature ?? 0.7,
      max_tokens: dto.max_tokens ?? 1024,
      ...dto.options,
    };
    return this.ai.runModel(dto.model, 'chat', body);
  }

  // ====== Embeddings ======
  @Post('embeddings')
  async embeddings(@Body() dto: EmbeddingDto) {
    const body = { input: dto.text, ...dto.options };
    return this.ai.runModel(dto.model, 'embeddings', body);
  }

  // ====== Image Generation ======
  @Post('images')
  async generateImages(@Body() dto: ImageDto) {
    const body = {
      prompt: dto.prompt,
      n: dto.n ?? 1,
      size: dto.size ?? '1024x1024',
      ...dto.options,
    };
    return this.ai.runModel(dto.model, 'images', body);
  }

  // ====== Speech-to-Text (STT) ======
  @Post('stt')
  async transcribe(@Body() dto: SttDto) {
    const body = { file_url: dto.audioUrl, ...dto.options }; // depends on provider
    return this.ai.runModel(dto.model, 'stt', body);
  }

  // ====== Text-to-Speech (TTS) ======
  @Post('tts')
  async tts(@Body() dto: TtsDto) {
    const body = { input: dto.text, voice: dto.voice ?? 'alloy' };
    return this.ai.runModel(dto.model, 'tts', body);
  }

  // ====== Model Listing ======
  @Get('models')
  async listModels(@Query('provider') provider?: string) {
    // If provider is specified, filter models by provider
    const allModels = Object.entries(this.ai.getAllModels()).map(
      ([id, config]) => ({
        id,
        provider: config.provider,
        features: Object.keys(config.endpoints),
      }),
    );

    if (provider) {
      return allModels.filter((m) => m.provider === provider.toLowerCase());
    }
    return allModels;
  }
}
