"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareGrokRequest = prepareGrokRequest;
function prepareGrokRequest(body) {
    let input;
    if (Array.isArray(body.messages)) {
        input = body.messages.map((m) => `${m.role}: ${m.content}`).join('\n');
    }
    else if (typeof body.input === 'string') {
        input = body.input;
    }
    else {
        throw new Error('No valid input/messages provided for Grok request');
    }
    return {
        model: body.model,
        input,
        maxTokens: body.max_tokens ?? 1024,
        temperature: body.temperature ?? 0.7,
        ...body.extra,
    };
}
//# sourceMappingURL=grok.provider.js.map