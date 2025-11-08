import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  Min,
  Max,
  IsArray,
} from 'class-validator';

export class AiImageRequestDto {
  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  @IsNotEmpty()
  prompt: string; // Description for image generation

  @IsOptional()
  @IsInt()
  @Min(256)
  @Max(2048)
  width?: number; // Optional width

  @IsOptional()
  @IsInt()
  @Min(256)
  @Max(2048)
  height?: number; // Optional height

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
  n?: number; // Number of images to generate

  @IsOptional()
  @IsArray()
  sizeOptions?: string[]; // Alternative for provider-specific sizes

  [key: string]: any; // Allows extra provider-specific fields
}
