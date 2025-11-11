import { CanActivate, ExecutionContext } from '@nestjs/common';
import { X402Service } from '../providers/x402.service';
import { Reflector } from '@nestjs/core';
export declare class X402Guard implements CanActivate {
    private reflector;
    private x402Service;
    constructor(reflector: Reflector, x402Service: X402Service);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
