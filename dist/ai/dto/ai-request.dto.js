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
exports.TtsDto = exports.SttDto = exports.ImageDto = exports.EmbeddingDto = exports.ChatDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ChatDto {
}
exports.ChatDto = ChatDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Model to use', example: 'gpt-4.1' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChatDto.prototype, "model", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Optional prompt text',
        example: 'Hello, world!',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ChatDto.prototype, "prompt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Messages array or string input for chat models',
        type: [Object],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)((o) => typeof o.messages === 'string' || Array.isArray(o.messages)),
    __metadata("design:type", Object)
], ChatDto.prototype, "messages", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Input text or array for chat/completion',
        type: [Object],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)((o) => typeof o.input === 'string' || Array.isArray(o.input)),
    __metadata("design:type", Object)
], ChatDto.prototype, "input", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Temperature setting',
        minimum: 0,
        maximum: 2,
        example: 0.7,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(2),
    __metadata("design:type", Number)
], ChatDto.prototype, "temperature", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Maximum tokens for completion',
        minimum: 1,
        example: 256,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ChatDto.prototype, "max_tokens", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Provider-specific extra fields',
        type: Object,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], ChatDto.prototype, "options", void 0);
class EmbeddingDto {
}
exports.EmbeddingDto = EmbeddingDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Embedding model to use',
        example: 'text-embedding-3-small',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EmbeddingDto.prototype, "model", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Text to embed', example: 'Hello world' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EmbeddingDto.prototype, "text", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Provider-specific options',
        type: Object,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], EmbeddingDto.prototype, "options", void 0);
class ImageDto {
}
exports.ImageDto = ImageDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Image generation model', example: 'dall-e-3' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ImageDto.prototype, "model", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Prompt for image generation',
        example: 'A futuristic cityscape at sunset',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ImageDto.prototype, "prompt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Number of images to generate',
        minimum: 1,
        example: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ImageDto.prototype, "n", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Image size', example: '512x512' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ImageDto.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Provider-specific options',
        type: Object,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], ImageDto.prototype, "options", void 0);
class SttDto {
}
exports.SttDto = SttDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'STT model to use', example: 'whisper-1' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SttDto.prototype, "model", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL of the audio file',
        example: 'https://example.com/audio.mp3',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], SttDto.prototype, "audioUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Provider-specific options',
        type: Object,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], SttDto.prototype, "options", void 0);
class TtsDto {
}
exports.TtsDto = TtsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'TTS model to use', example: 'gpt-voice-1' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TtsDto.prototype, "model", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Text to convert to speech',
        example: 'Hello world',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TtsDto.prototype, "text", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Voice style or name', example: 'alloy' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TtsDto.prototype, "voice", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Provider-specific options',
        type: Object,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], TtsDto.prototype, "options", void 0);
//# sourceMappingURL=ai-request.dto.js.map