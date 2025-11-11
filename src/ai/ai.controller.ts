import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AiRunnerService } from './ai.runner.service';
import {
  ChatDto,
  EmbeddingDto,
  ImageDto,
  SttDto,
  TtsDto,
} from './dto/ai-request.dto';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Paywall } from 'src/x402/decorators/paywall.decorator';
import { NoPaywall } from 'src/x402/decorators/no-paywall.decorator';

@Controller('ai')
export class AiController {
  constructor(private readonly ai: AiRunnerService) {}

  // ====== Chat / Completion ======
  @Post('chat')
  @Paywall({
    description: 'Run ai chat model',
  })
  @ApiOperation({ summary: 'Run a chat model' })
  @ApiBody({ type: ChatDto })
  @ApiResponse({ status: 200, description: 'Chat response from AI model' })
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
  @Paywall({
    description: 'generate text embeddings',
  })
  @ApiOperation({ summary: 'Generate embeddings from text' })
  @ApiBody({ type: EmbeddingDto })
  @ApiResponse({ status: 200, description: 'Embedding vector' })
  async embeddings(@Body() dto: EmbeddingDto) {
    const body = { input: dto.text, ...dto.options };
    return this.ai.runModel(dto.model, 'embeddings', body);
  }

  // ====== Image Generation ======
  @Post('images')
  @Paywall({
    description: 'Generate images',
  })
  @ApiOperation({ summary: 'Generate images from prompt' })
  @ApiBody({ type: ImageDto })
  @ApiResponse({ status: 200, description: 'Generated images' })
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
  @Paywall({
    description: 'Transcribe audio to text',
  })
  @ApiOperation({ summary: 'Transcribe audio to text' })
  @ApiBody({ type: SttDto })
  @ApiResponse({ status: 200, description: 'Transcribed text' })
  async transcribe(@Body() dto: SttDto) {
    const body = { file_url: dto.audioUrl, ...dto.options }; // depends on provider
    return this.ai.runModel(dto.model, 'stt', body);
  }

  // ====== Text-to-Speech (TTS) ======
  @Post('tts')
  @Paywall({
    description: 'Convert text to speech',
  })
  @ApiOperation({ summary: 'Convert text to speech' })
  @ApiBody({ type: TtsDto })
  @ApiResponse({ status: 200, description: 'Generated speech/audio file' })
  async tts(@Body() dto: TtsDto) {
    const body = { input: dto.text, voice: dto.voice ?? 'alloy' };
    return this.ai.runModel(dto.model, 'tts', body);
  }

  // ====== Model Listing ======
  @Get('models')
  @NoPaywall()
  @ApiOperation({ summary: 'List all available AI models' })
  @ApiQuery({
    name: 'provider',
    required: false,
    description: 'Filter models by provider',
  })
  @ApiResponse({ status: 200, description: 'List of AI models' })
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
