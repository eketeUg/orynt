import { Body, Controller, Post } from '@nestjs/common';

import { AiRequestDto } from './dto/ai-request.dto';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly ai: AiService) {}

  @Post('request')
  async generate(@Body() body: AiRequestDto) {
    return this.ai.callModel(body.model, body);
  }
}
