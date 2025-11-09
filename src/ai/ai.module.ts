import { Module } from '@nestjs/common';
import { AiRunnerService } from './ai.runner.service';
import { AiController } from './ai.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [AiRunnerService],
  controllers: [AiController],
})
export class AiModule {}
