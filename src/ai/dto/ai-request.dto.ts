import {
  IsString,
  IsOptional,
  IsNumber,
  Min,
  Max,
  IsUrl,
} from 'class-validator';

// ====== Chat DTO ======
export class ChatDto {
  @IsString()
  model: string;

  @IsString()
  prompt: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(2)
  temperature?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  max_tokens?: number;

  /**
   * Provider-specific extra fields, e.g., OpenAI, Anthropic, Grok, Gradient
   */
  @IsOptional()
  options?: Record<string, any>;
}

// ====== Embedding DTO ======
export class EmbeddingDto {
  @IsString()
  model: string;

  @IsString()
  text: string;

  @IsOptional()
  options?: Record<string, any>;
}

// ====== Image Generation DTO ======
export class ImageDto {
  @IsString()
  model: string;

  @IsString()
  prompt: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  n?: number; // number of images

  @IsOptional()
  @IsString()
  size?: string; // "256x256", "512x512", "1024x1024"

  @IsOptional()
  options?: Record<string, any>;
}

// ====== Speech-to-Text DTO ======
export class SttDto {
  @IsString()
  model: string;

  @IsString()
  @IsUrl()
  audioUrl: string;

  @IsOptional()
  options?: Record<string, any>;
}

// ====== Text-to-Speech DTO ======
export class TtsDto {
  @IsString()
  model: string;

  @IsString()
  text: string;

  @IsOptional()
  @IsString()
  voice?: string;

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
