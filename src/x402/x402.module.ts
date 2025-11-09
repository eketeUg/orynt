import { Module } from '@nestjs/common';
import { X402Service } from './providers/x402.service';
import { X402Guard } from './guards/x402.guard';

@Module({
  providers: [X402Service, X402Guard],
  exports: [X402Service, X402Guard]
})
export class X402Module { }
