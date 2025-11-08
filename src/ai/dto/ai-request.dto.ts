import {
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  IsNumber,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

class MessageDto {
  @IsString()
  role: 'user' | 'assistant' | 'system';

  @IsString()
  content: string;
}

export class AiRequestDto {
  @IsString()
  model: string;

  @IsOptional()
  @IsString({ each: false })
  input?: string | string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MessageDto)
  messages?: MessageDto[];

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(2)
  temperature?: number;

  @IsOptional()
  @IsNumber()
  max_tokens?: number;

  @IsOptional()
  stop?: string | string[];

  /**
   * Allows provider-specific extra fields, e.g., OpenAI, Anthropic, Grok, Gradient
   */
  [key: string]: any;
}
