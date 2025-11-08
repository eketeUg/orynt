import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';

export class AiRequestDto {
  @IsString()
  @IsNotEmpty()
  model: string;

  @IsArray()
  @IsOptional()
  messages?: any[];

  @IsOptional()
  input?: any;

  @IsOptional()
  prompt?: any;

  // allow flexible structure for multimodal
  [key: string]: any;
}
