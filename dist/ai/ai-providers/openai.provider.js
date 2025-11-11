"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareOpenAiRequest = prepareOpenAiRequest;
exports.prepareOpenAiEmbeddingsRequest = prepareOpenAiEmbeddingsRequest;
exports.prepareOpenAiImageRequest = prepareOpenAiImageRequest;
exports.prepareOpenAiTranscriptionRequest = prepareOpenAiTranscriptionRequest;
exports.prepareOpenAiTtsRequest = prepareOpenAiTtsRequest;
function prepareOpenAiRequest(body, modelId) {
    if (!modelId && !body.model) {
        throw new Error('OpenAI request requires a model');
    }
    const model = body.model ?? modelId;
    let input;
    if (Array.isArray(body.messages)) {
        input = body.messages.map((m) => `${m.role}: ${m.content}`).join('\n');
    }
    else if (typeof body.input === 'string' || Array.isArray(body.input)) {
        input = body.input;
    }
    else {
        throw new Error('No valid input/messages provided for OpenAI request');
    }
    const payload = { model, input };
    if (body.temperature !== undefined)
        payload.temperature = body.temperature;
    if (body.max_tokens !== undefined)
        payload.max_output_tokens = body.max_tokens;
    if (body.stop !== undefined)
        payload.stop = body.stop;
    if (body.top_p !== undefined)
        payload.top_p = body.top_p;
    if (body.extra)
        Object.assign(payload, body.extra);
    return payload;
}
function prepareOpenAiEmbeddingsRequest(body, modelId) {
    if (!body.input)
        throw new Error('OpenAI embeddings require `input`');
    const model = body.model ?? modelId;
    if (!model)
        throw new Error('OpenAI embeddings require `model`');
    return { model, input: body.input };
}
function prepareOpenAiImageRequest(body, modelId) {
    if (!body.prompt)
        throw new Error('Image generation requires `prompt`');
    const model = body.model ?? modelId;
    if (!model)
        throw new Error('Image generation requires `model`');
    const payload = { model, prompt: body.prompt };
    if (body.n !== undefined)
        payload.n = body.n;
    if (body.width !== undefined)
        payload.width = body.width;
    if (body.height !== undefined)
        payload.height = body.height;
    if (body.extra)
        Object.assign(payload, body.extra);
    return payload;
}
function prepareOpenAiTranscriptionRequest(body, modelId) {
    const model = body.model ?? modelId;
    if (!model)
        throw new Error('STT requires `model`');
    return { ...body, model };
}
function prepareOpenAiTtsRequest(body, modelId) {
    if (!body.input)
        throw new Error('TTS requires `input`');
    const model = body.model ?? modelId;
    if (!model)
        throw new Error('TTS requires `model`');
    const payload = { model, input: body.input };
    if (body.voice)
        payload.voice = body.voice;
    if (body.format)
        payload.format = body.format;
    if (body.extra)
        Object.assign(payload, body.extra);
    return payload;
}
//# sourceMappingURL=openai.provider.js.map