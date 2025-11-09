import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  Min,
  Max,
  IsUrl,
  ValidateIf,
} from 'class-validator';

// ====== Chat DTO ======
export class ChatDto {
  @ApiProperty({ description: 'Model to use', example: 'gpt-4.1' })
  @IsString()
  model: string;

  @ApiPropertyOptional({
    description: 'Optional prompt text',
    example: 'Hello, world!',
  })
  @IsString()
  @IsOptional()
  prompt?: string;

  @ApiPropertyOptional({
    description: 'Messages array or string input for chat models',
    type: [Object],
  })
  @IsOptional()
  @ValidateIf(
    (o) => typeof o.messages === 'string' || Array.isArray(o.messages),
  )
  messages?: string | any[];

  @ApiPropertyOptional({
    description: 'Input text or array for chat/completion',
    type: [Object],
  })
  @IsOptional()
  @ValidateIf((o) => typeof o.input === 'string' || Array.isArray(o.input))
  input?: string | any[];

  @ApiPropertyOptional({
    description: 'Temperature setting',
    minimum: 0,
    maximum: 2,
    example: 0.7,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(2)
  temperature?: number;

  @ApiPropertyOptional({
    description: 'Maximum tokens for completion',
    minimum: 1,
    example: 256,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  max_tokens?: number;

  /**
   * Provider-specific extra fields, e.g., OpenAI, Gradient
   */
  @ApiPropertyOptional({
    description: 'Provider-specific extra fields',
    type: Object,
  })
  @IsOptional()
  options?: Record<string, any>;
}

// ====== Embedding DTO ======
export class EmbeddingDto {
  @ApiProperty({
    description: 'Embedding model to use',
    example: 'text-embedding-3-small',
  })
  @IsString()
  model: string;

  @ApiProperty({ description: 'Text to embed', example: 'Hello world' })
  @IsString()
  text: string;

  @ApiPropertyOptional({
    description: 'Provider-specific options',
    type: Object,
  })
  @IsOptional()
  options?: Record<string, any>;
}

// ====== Image Generation DTO ======
export class ImageDto {
  @ApiProperty({ description: 'Image generation model', example: 'dall-e-3' })
  @IsString()
  model: string;

  @ApiProperty({
    description: 'Prompt for image generation',
    example: 'A futuristic cityscape at sunset',
  })
  @IsString()
  prompt: string;

  @ApiPropertyOptional({
    description: 'Number of images to generate',
    minimum: 1,
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  n?: number;

  @ApiPropertyOptional({ description: 'Image size', example: '512x512' })
  @IsOptional()
  @IsString()
  size?: string;

  @ApiPropertyOptional({
    description: 'Provider-specific options',
    type: Object,
  })
  @IsOptional()
  options?: Record<string, any>;
}

// ====== Speech-to-Text DTO ======
export class SttDto {
  @ApiProperty({ description: 'STT model to use', example: 'whisper-1' })
  @IsString()
  model: string;

  @ApiProperty({
    description: 'URL of the audio file',
    example: 'https://example.com/audio.mp3',
  })
  @IsString()
  @IsUrl()
  audioUrl: string;

  @ApiPropertyOptional({
    description: 'Provider-specific options',
    type: Object,
  })
  @IsOptional()
  options?: Record<string, any>;
}

// ====== Text-to-Speech DTO ======
export class TtsDto {
  @ApiProperty({ description: 'TTS model to use', example: 'gpt-voice-1' })
  @IsString()
  model: string;

  @ApiProperty({
    description: 'Text to convert to speech',
    example: 'Hello world',
  })
  @IsString()
  text: string;

  @ApiPropertyOptional({ description: 'Voice style or name', example: 'alloy' })
  @IsOptional()
  @IsString()
  voice?: string;

  @ApiPropertyOptional({
    description: 'Provider-specific options',
    type: Object,
  })
  @IsOptional()
  options?: Record<string, any>;
}

// import {
//   IsString,
//   IsOptional,
//   IsArray,
//   ValidateNested,
//   IsNumber,
//   Min,
//   Max,
// } from 'class-validator';
// import { Type } from 'class-transformer';

// class MessageDto {
//   @IsString()
//   role: 'user' | 'assistant' | 'system';

//   @IsString()
//   content: string;
// }

// export class AiRequestDto {
//   @IsString()
//   model: string;

//   @IsOptional()
//   @IsString({ each: false })
//   input?: string | string[];

//   @IsOptional()
//   @IsArray()
//   @ValidateNested({ each: true })
//   @Type(() => MessageDto)
//   messages?: MessageDto[];

//   @IsOptional()
//   @IsNumber()
//   @Min(0)
//   @Max(2)
//   temperature?: number;

//   @IsOptional()
//   @IsNumber()
//   max_tokens?: number;

//   @IsOptional()
//   stop?: string | string[];

//   /**
//    * Allows provider-specific extra fields, e.g., OpenAI, Anthropic, Grok, Gradient
//    */
//   [key: string]: any;
// }
