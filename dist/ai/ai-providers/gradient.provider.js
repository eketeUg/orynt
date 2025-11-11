"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareGradientRequest = prepareGradientRequest;
function prepareGradientRequest(body, modelId) {
    if (!modelId && !body.model) {
        throw new Error('Gradient request requires a model');
    }
    const model = body.model ?? modelId;
    let messages;
    if (Array.isArray(body.messages)) {
        messages = body.messages
            .map((m) => `${m.role}: ${m.content}`)
            .join('\n');
    }
    else if (typeof body.input === 'string' || Array.isArray(body.input)) {
        messages = body.input;
    }
    else {
        throw new Error('No valid messages provided for Gradient request');
    }
    const payload = { model, messages };
    if (body.temperature !== undefined)
        payload.temperature = body.temperature;
    if (body.max_tokens !== undefined)
        payload.max_tokens = body.max_tokens;
    if (body.stop !== undefined)
        payload.stop = body.stop;
    if (body.top_p !== undefined)
        payload.top_p = body.top_p;
    if (body.extra)
        Object.assign(payload, body.extra);
    return payload;
}
//# sourceMappingURL=gradient.provider.js.map