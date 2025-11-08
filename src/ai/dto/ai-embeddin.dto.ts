import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class EmbeddingRequestDto {
  @IsString()
  @IsNotEmpty()
  model: string;

  @IsArray()
  input: string[];
}
