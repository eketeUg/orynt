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
export declare function prepareGradientRequest(body: any, modelId?: string): GradientRequest;
