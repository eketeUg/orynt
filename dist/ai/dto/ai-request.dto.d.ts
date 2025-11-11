export declare class ChatDto {
    model: string;
    prompt?: string;
    messages?: string | any[];
    input?: string | any[];
    temperature?: number;
    max_tokens?: number;
    options?: Record<string, any>;
}
export declare class EmbeddingDto {
    model: string;
    text: string;
    options?: Record<string, any>;
}
export declare class ImageDto {
    model: string;
    prompt: string;
    n?: number;
    size?: string;
    options?: Record<string, any>;
}
export declare class SttDto {
    model: string;
    audioUrl: string;
    options?: Record<string, any>;
}
export declare class TtsDto {
    model: string;
    text: string;
    voice?: string;
    options?: Record<string, any>;
}
