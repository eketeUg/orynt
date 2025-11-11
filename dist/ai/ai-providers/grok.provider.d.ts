export interface GrokRequest {
    model: string;
    input: string;
    maxTokens?: number;
    temperature?: number;
    [key: string]: any;
}
export interface GrokResponse {
    id: string;
    output: string;
    usage?: any;
}
export declare function prepareGrokRequest(body: any): GrokRequest;
