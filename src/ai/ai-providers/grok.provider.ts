export interface GrokRequest {
  model: string;
  input: string;
  maxTokens?: number;
  temperature?: number;
  [key: string]: any;
}

export interface GrokResponse {
  id: string;
  output: string;
  usage?: any;
}

/**
 * Converts messages or input to Grok's required input string
 */
export function prepareGrokRequest(body: any): GrokRequest {
  let input: string;

  if (Array.isArray(body.messages)) {
    input = body.messages.map((m: any) => `${m.role}: ${m.content}`).join('\n');
  } else if (typeof body.input === 'string') {
    input = body.input;
  } else {
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
