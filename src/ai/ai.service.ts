import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ModelRegistry } from './contants/model-registry';

@Injectable()
export class AiService {
  constructor(private readonly httpService: HttpService) {}

  async callModel(model: string, body: any): Promise<any> {
    try {
      const config = ModelRegistry[model];
      if (!config) throw new Error(`Unknown model '${model}'`);

      const provider = config.provider.toUpperCase();
      const apiKey = process.env[`${provider}_API_KEY`];

      const requestBody = config.prepareRequest(body);

      console.log(requestBody);

      const observable = this.httpService.post(config.endpoint, requestBody, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      const response = await firstValueFrom(observable);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}
