import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiRequestDto } from './dto/ai-request.dto';

@Controller('ai')
export class AiController {
  constructor(private readonly ai: AiService) {}

  @Post('request')
  async generate(@Body() body: AiRequestDto) {
    return this.ai.callModel(body.model, body);
  }
}
