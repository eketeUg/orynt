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
 * Prepares request for OpenAI Chat/Completions
 */
export function prepareOpenAiRequest(
  body: any,
  modelId?: string,
): OpenAiRequest {
  if (!modelId && !body.model) {
    throw new Error('OpenAI request requires a model');
  }

  const model = body.model ?? modelId;

  let input: string | string[];
  if (Array.isArray(body.messages)) {
    input = body.messages.map((m: any) => `${m.role}: ${m.content}`).join('\n');
  } else if (typeof body.input === 'string' || Array.isArray(body.input)) {
    input = body.input;
  } else {
    throw new Error('No valid input/messages provided for OpenAI request');
  }

  const payload: any = { model, input };

  if (body.temperature !== undefined) payload.temperature = body.temperature;
  if (body.max_tokens !== undefined)
    payload.max_output_tokens = body.max_tokens;
  if (body.stop !== undefined) payload.stop = body.stop;
  if (body.top_p !== undefined) payload.top_p = body.top_p;
  if (body.extra) Object.assign(payload, body.extra);

  return payload;
}

/**
 * Prepares request for OpenAI Embeddings
 */
export function prepareOpenAiEmbeddingsRequest(body: any, modelId?: string) {
  console.log(body);
  if (!body.input) throw new Error('OpenAI embeddings require `input`');
  const model = body.model ?? modelId;
  if (!model) throw new Error('OpenAI embeddings require `model`');
  return { model, input: body.input };
}

/**
 * Prepares request for OpenAI Image Generation
 */
export function prepareOpenAiImageRequest(body: any, modelId?: string) {
  if (!body.prompt) throw new Error('Image generation requires `prompt`');
  const model = body.model ?? modelId;
  if (!model) throw new Error('Image generation requires `model`');

  const payload: any = { model, prompt: body.prompt };
  if (body.n !== undefined) payload.n = body.n;
  if (body.width !== undefined) payload.width = body.width;
  if (body.height !== undefined) payload.height = body.height;
  if (body.extra) Object.assign(payload, body.extra);
  return payload;
}

/**
 * Prepares request for STT (Audio Transcription)
 */
export function prepareOpenAiTranscriptionRequest(body: any, modelId?: string) {
  const model = body.model ?? modelId;
  if (!model) throw new Error('STT requires `model`');
  return { ...body, model };
}

/**
 * Prepares request for TTS (Audio Speech)
 */
export function prepareOpenAiTtsRequest(body: any, modelId?: string) {
  if (!body.input) throw new Error('TTS requires `input`');
  const model = body.model ?? modelId;
  if (!model) throw new Error('TTS requires `model`');

  const payload: any = { model, input: body.input };
  if (body.voice) payload.voice = body.voice;
  if (body.format) payload.format = body.format;
  if (body.extra) Object.assign(payload, body.extra);
  return payload;
}
