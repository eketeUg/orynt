export interface AnthropicRequest {
  model: string;
  input: string;
  max_tokens_to_sample?: number;
  temperature?: number;
  [key: string]: any;
}

export interface AnthropicResponse {
  id: string;
  completion: string;
  stop_reason?: string;
  metadata?: any;
}

/**
 * Converts messages or input to Anthropic's required `input` string
 */
export function prepareAnthropicRequest(body: any): AnthropicRequest {
  let input: string;

  if (Array.isArray(body.messages)) {
    input = body.messages.map((m: any) => `${m.role}: ${m.content}`).join('\n');
  } else if (typeof body.input === 'string') {
    input = body.input;
  } else {
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
