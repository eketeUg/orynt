export interface AnthropicRequest {
    model: string;
    input: string;
    max_tokens_to_sample?: number;
    temperature?: number;
    [key: string]: any;
}
export interface AnthropicResponse {
    id: string;
    completion: string;
    stop_reason?: string;
    metadata?: any;
}
export declare function prepareAnthropicRequest(body: any): AnthropicRequest;
