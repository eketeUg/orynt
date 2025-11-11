import { AiRunnerService } from './ai.runner.service';
import { ChatDto, EmbeddingDto, ImageDto, SttDto, TtsDto } from './dto/ai-request.dto';
export declare class AiController {
    private readonly ai;
    constructor(ai: AiRunnerService);
    chat(dto: ChatDto): Promise<any>;
    embeddings(dto: EmbeddingDto): Promise<any>;
    generateImages(dto: ImageDto): Promise<any>;
    transcribe(dto: SttDto): Promise<any>;
    tts(dto: TtsDto): Promise<any>;
    listModels(provider?: string): Promise<{
        id: string;
        provider: "openai" | "anthropic" | "grok" | "gradient";
        features: string[];
    }[]>;
}
