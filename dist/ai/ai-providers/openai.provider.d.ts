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
        message?: {
            role: string;
            content: string;
        };
        finish_reason: string;
        index: number;
    }>;
    usage: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
}
export declare function prepareOpenAiRequest(body: any, modelId?: string): OpenAiRequest;
export declare function prepareOpenAiEmbeddingsRequest(body: any, modelId?: string): {
    model: any;
    input: any;
};
export declare function prepareOpenAiImageRequest(body: any, modelId?: string): any;
export declare function prepareOpenAiTranscriptionRequest(body: any, modelId?: string): any;
export declare function prepareOpenAiTtsRequest(body: any, modelId?: string): any;
