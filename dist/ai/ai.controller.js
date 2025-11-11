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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiController = void 0;
const common_1 = require("@nestjs/common");
const ai_runner_service_1 = require("./ai.runner.service");
const ai_request_dto_1 = require("./dto/ai-request.dto");
const swagger_1 = require("@nestjs/swagger");
const paywall_decorator_1 = require("../x402/decorators/paywall.decorator");
const no_paywall_decorator_1 = require("../x402/decorators/no-paywall.decorator");
let AiController = class AiController {
    constructor(ai) {
        this.ai = ai;
    }
    async chat(dto) {
        const input = dto.input ??
            dto.messages ??
            (dto.prompt ? [{ role: 'user', content: dto.prompt }] : []);
        const body = {
            input,
            temperature: dto.temperature ?? 0.7,
            max_tokens: dto.max_tokens ?? 1024,
            ...dto.options,
        };
        return this.ai.runModel(dto.model, 'chat', body);
    }
    async embeddings(dto) {
        const body = { input: dto.text, ...dto.options };
        return this.ai.runModel(dto.model, 'embeddings', body);
    }
    async generateImages(dto) {
        const body = {
            prompt: dto.prompt,
            n: dto.n ?? 1,
            size: dto.size ?? '1024x1024',
            ...dto.options,
        };
        return this.ai.runModel(dto.model, 'images', body);
    }
    async transcribe(dto) {
        const body = { file_url: dto.audioUrl, ...dto.options };
        return this.ai.runModel(dto.model, 'stt', body);
    }
    async tts(dto) {
        const body = { input: dto.text, voice: dto.voice ?? 'alloy' };
        return this.ai.runModel(dto.model, 'tts', body);
    }
    async listModels(provider) {
        const allModels = Object.entries(this.ai.getAllModels()).map(([id, config]) => ({
            id,
            provider: config.provider,
            features: Object.keys(config.endpoints),
        }));
        if (provider) {
            return allModels.filter((m) => m.provider === provider.toLowerCase());
        }
        return allModels;
    }
};
exports.AiController = AiController;
__decorate([
    (0, common_1.Post)('chat'),
    (0, paywall_decorator_1.Paywall)({
        description: 'Run ai chat model',
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Run a chat model' }),
    (0, swagger_1.ApiBody)({ type: ai_request_dto_1.ChatDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Chat response from AI model' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ai_request_dto_1.ChatDto]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "chat", null);
__decorate([
    (0, common_1.Post)('embeddings'),
    (0, paywall_decorator_1.Paywall)({
        description: 'generate text embeddings',
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Generate embeddings from text' }),
    (0, swagger_1.ApiBody)({ type: ai_request_dto_1.EmbeddingDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Embedding vector' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ai_request_dto_1.EmbeddingDto]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "embeddings", null);
__decorate([
    (0, common_1.Post)('images'),
    (0, paywall_decorator_1.Paywall)({
        description: 'Generate images',
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Generate images from prompt' }),
    (0, swagger_1.ApiBody)({ type: ai_request_dto_1.ImageDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Generated images' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ai_request_dto_1.ImageDto]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "generateImages", null);
__decorate([
    (0, common_1.Post)('stt'),
    (0, paywall_decorator_1.Paywall)({
        description: 'Transcribe audio to text',
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Transcribe audio to text' }),
    (0, swagger_1.ApiBody)({ type: ai_request_dto_1.SttDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Transcribed text' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ai_request_dto_1.SttDto]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "transcribe", null);
__decorate([
    (0, common_1.Post)('tts'),
    (0, paywall_decorator_1.Paywall)({
        description: 'Convert text to speech',
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Convert text to speech' }),
    (0, swagger_1.ApiBody)({ type: ai_request_dto_1.TtsDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Generated speech/audio file' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ai_request_dto_1.TtsDto]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "tts", null);
__decorate([
    (0, common_1.Get)('models'),
    (0, no_paywall_decorator_1.NoPaywall)(),
    (0, swagger_1.ApiOperation)({ summary: 'List all available AI models' }),
    (0, swagger_1.ApiQuery)({
        name: 'provider',
        required: false,
        description: 'Filter models by provider',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of AI models' }),
    __param(0, (0, common_1.Query)('provider')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "listModels", null);
exports.AiController = AiController = __decorate([
    (0, common_1.Controller)('ai'),
    __metadata("design:paramtypes", [ai_runner_service_1.AiRunnerService])
], AiController);
//# sourceMappingURL=ai.controller.js.map