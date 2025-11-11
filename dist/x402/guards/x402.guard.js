"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.X402Guard = void 0;
const common_1 = require("@nestjs/common");
const paywall_decorator_1 = require("../decorators/paywall.decorator");
const x402_service_1 = require("../providers/x402.service");
const core_1 = require("@nestjs/core");
const cost_calculators_1 = require("../../ai/cost-calculators");
const no_paywall_decorator_1 = require("../decorators/no-paywall.decorator");
let X402Guard = class X402Guard {
    constructor(reflector, x402Service) {
        this.reflector = reflector;
        this.x402Service = x402Service;
    }
    async canActivate(context) {
        const skip = this.reflector.get(no_paywall_decorator_1.NO_PAYWALL_METADATA, context.getHandler());
        if (skip)
            return true;
        const config = this.reflector.get(paywall_decorator_1.PAYWALL_METADATA, context.getHandler());
        if (!config)
            return true;
        const req = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();
        const network = req.headers['x-network'];
        console.log(network);
        config.network = network;
        console.log(config.network);
        const dto = req.body;
        console.log(dto);
        const feature = (0, cost_calculators_1.getModelFeature)(dto.model);
        console.log(feature);
        const metrics = cost_calculators_1.CostCalculator.estimateMetrics(dto, feature);
        const estimatedCost = cost_calculators_1.CostCalculator.estimateCost(dto.model, feature, metrics);
        console.log('estimated cost :', estimatedCost);
        config.amount = Math.floor(estimatedCost * 1_000_000);
        console.log('config amount :', config.amount);
        return await this.x402Service.verifyPayment(req, res, config);
    }
};
exports.X402Guard = X402Guard;
exports.X402Guard = X402Guard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        x402_service_1.X402Service])
], X402Guard);
//# sourceMappingURL=x402.guard.js.map