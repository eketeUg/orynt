import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { X402Module } from './x402/x402.module';
import { APP_GUARD } from '@nestjs/core';
import { X402Guard } from './x402/guards/x402.guard';

@Module({
  imports: [X402Module],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: X402Guard
    }
  ],
})
export class AppModule { }
