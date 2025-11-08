export interface OpenAiRequest {
  model: string;
  input: string | string[];
  temperature?: number;
  max_tokens?: number;
  stop?: string | string[];
  [key: string]: any;
}

export interface OpenAiResponse {
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
 * Converts `messages` array to OpenAI `input` format if needed.
 */
export function prepareOpenAiRequest(body: any): OpenAiRequest {
  let input: string | string[];

  if (Array.isArray(body.messages)) {
    input = body.messages.map((m: any) => `${m.role}: ${m.content}`).join('\n');
  } else if (typeof body.input === 'string' || Array.isArray(body.input)) {
    input = body.input;
  } else {
    throw new Error('No valid input/messages provided for OpenAI request');
  }

  return {
    model: body.model,
    input,
    temperature: body.temperature ?? 0.7,
    max_output_tokens: body.max_tokens ?? 1024,
    stop: body.stop ?? undefined,
    ...body.extra,
  };
}
