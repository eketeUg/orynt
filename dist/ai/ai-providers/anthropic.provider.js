"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareAnthropicRequest = prepareAnthropicRequest;
function prepareAnthropicRequest(body) {
    let input;
    if (Array.isArray(body.messages)) {
        input = body.messages.map((m) => `${m.role}: ${m.content}`).join('\n');
    }
    else if (typeof body.input === 'string') {
        input = body.input;
    }
    else {
        throw new Error('No valid input/messages provided for Anthropic request');
    }
    return {
        model: body.model,
        input,
        max_tokens_to_sample: body.max_tokens ?? 1024,
        temperature: body.temperature ?? 0.7,
        ...body.extra,
    };
}
//# sourceMappingURL=anthropic.provider.js.map