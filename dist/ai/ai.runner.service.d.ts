import { HttpService } from '@nestjs/axios';
import { ModelConfig } from './contants/model-registry';
export declare class AiRunnerService {
    private readonly http;
    constructor(http: HttpService);
    runModel(modelId: string, feature: string, body: any): Promise<any>;
    getAllModels(): Record<string, ModelConfig>;
}
