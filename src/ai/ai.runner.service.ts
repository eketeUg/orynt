import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ModelConfig, ModelRegistry } from './contants/model-registry';

@Injectable()
export class AiRunnerService {
  constructor(private readonly http: HttpService) {}

  async runModel(modelId: string, feature: string, body: any): Promise<any> {
    // console.log(body);
    const config: ModelConfig = ModelRegistry[modelId];
    if (!config) throw new BadRequestException(`Invalid model: ${modelId}`);

    const endpoint = config.endpoints?.[feature];
    if (!endpoint)
      throw new BadRequestException(
        `Feature '${feature}' not supported for ${modelId}`,
      );

    const prepare = config.prepare?.[feature];

    let requestBody: any;
    try {
      requestBody = prepare
        ? prepare(body, modelId)
        : { ...body, model: modelId };
    } catch (e) {
      throw new BadRequestException(`Error preparing request: ${e.message}`);
    }

    const providerKey = config.provider.toUpperCase() + '_API_KEY';
    const apiKey = process.env[providerKey];
    if (!apiKey)
      throw new InternalServerErrorException(
        `Missing API key for provider ${config.provider}`,
      );

    const headers: Record<string, string> = {
      Authorization: `Bearer ${apiKey}`,
    };
    if (feature !== 'stt') {
      headers['Content-Type'] = 'application/json';
    }

    try {
      const response$ = this.http.post(endpoint, requestBody, { headers });
      const response = await firstValueFrom(response$);
      return response.data;
    } catch (error: any) {
      console.error(
        `AI Runner Error [${modelId} - ${feature}]:`,
        error?.response?.data || error.message,
      );
      throw new BadRequestException(error?.response?.data || error.message);
    }
  }

  getAllModels(): Record<string, ModelConfig> {
    return ModelRegistry;
  }

  // async testSDK(): Promise<any> {
  //   try {
  //     const response = await this.Orynt.chat({
  //       model: 'gpt-4.1',
  //       prompt: 'helloe',
  //     });

  //     return response;
  //   } catch (error) {
  //     return error.message;
  //   }
  // }
}
