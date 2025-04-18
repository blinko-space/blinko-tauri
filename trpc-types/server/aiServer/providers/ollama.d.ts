import { BufferLoader } from 'langchain/document_loaders/fs/buffer';
import { AiBaseModelProvider } from '.';
import { LanguageModelV1, ProviderV1 } from '@ai-sdk/provider';
export declare class OllamaModelProvider extends AiBaseModelProvider {
    constructor({ globalConfig }: {
        globalConfig: any;
    });
    protected createProvider(): ProviderV1;
    protected getLLM(): LanguageModelV1;
    AudioLoader(audioPath: any): BufferLoader;
}
