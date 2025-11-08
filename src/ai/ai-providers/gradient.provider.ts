export interface GradientRequest {
  model: string;
  input: string | string[];
  temperature?: number;
  max_tokens?: number;
  stop?: string | string[];
  [key: string]: any;
}

export interface GradientResponse {
  id: string;
  object: string;
  created: number;
  choices: Array<{
    text?: string;
    message?: { role: string; content: string };
    finish_reason: string;
    index: number;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/**
 * Prepares request for Gradient Chat/Completions
 */
export function prepareGradientRequest(
  body: any,
  modelId?: string,
): GradientRequest {
  if (!modelId && !body.model) {
    throw new Error('Gradient request requires a model');
  }

  const model = body.model ?? modelId;

  let messages: string | string[];
  if (Array.isArray(body.messages)) {
    messages = body.messages
      .map((m: any) => `${m.role}: ${m.content}`)
      .join('\n');
  } else if (typeof body.input === 'string' || Array.isArray(body.input)) {
    messages = body.input;
  } else {
    throw new Error('No valid messages provided for Gradient request');
  }

  const payload: any = { model, messages };

  if (body.temperature !== undefined) payload.temperature = body.temperature;
  if (body.max_tokens !== undefined) payload.max_tokens = body.max_tokens;
  if (body.stop !== undefined) payload.stop = body.stop;
  if (body.top_p !== undefined) payload.top_p = body.top_p;
  if (body.extra) Object.assign(payload, body.extra);

  return payload;
}
