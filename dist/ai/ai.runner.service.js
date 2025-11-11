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
exports.AiRunnerService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const model_registry_1 = require("./contants/model-registry");
let AiRunnerService = class AiRunnerService {
    constructor(http) {
        this.http = http;
    }
    async runModel(modelId, feature, body) {
        const config = model_registry_1.ModelRegistry[modelId];
        if (!config)
            throw new common_1.BadRequestException(`Invalid model: ${modelId}`);
        const endpoint = config.endpoints?.[feature];
        if (!endpoint)
            throw new common_1.BadRequestException(`Feature '${feature}' not supported for ${modelId}`);
        const prepare = config.prepare?.[feature];
        let requestBody;
        try {
            requestBody = prepare
                ? prepare(body, modelId)
                : { ...body, model: modelId };
        }
        catch (e) {
            throw new common_1.BadRequestException(`Error preparing request: ${e.message}`);
        }
        const providerKey = config.provider.toUpperCase() + '_API_KEY';
        const apiKey = process.env[providerKey];
        if (!apiKey)
            throw new common_1.InternalServerErrorException(`Missing API key for provider ${config.provider}`);
        const headers = {
            Authorization: `Bearer ${apiKey}`,
        };
        if (feature !== 'stt') {
            headers['Content-Type'] = 'application/json';
        }
        try {
            const response$ = this.http.post(endpoint, requestBody, { headers });
            const response = await (0, rxjs_1.firstValueFrom)(response$);
            return response.data;
        }
        catch (error) {
            console.error(`AI Runner Error [${modelId} - ${feature}]:`, error?.response?.data || error.message);
            throw new common_1.BadRequestException(error?.response?.data || error.message);
        }
    }
    getAllModels() {
        return model_registry_1.ModelRegistry;
    }
};
exports.AiRunnerService = AiRunnerService;
exports.AiRunnerService = AiRunnerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], AiRunnerService);
//# sourceMappingURL=ai.runner.service.js.map