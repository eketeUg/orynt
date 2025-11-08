import { Injectable } from '@nestjs/common';
import { ModelRegistry } from './contants/model-registry';

@Injectable()
export class AiService {
  async callModel(model: string, body: any) {
    const config = ModelRegistry[model];
    if (!config) throw new Error(`Unknown model '${model}'`);

    const provider = config.provider.toUpperCase();
    const apiKey = process.env[`${provider}_API_KEY`];

    return fetch(config.endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then((r) => r.json());
  }
}
