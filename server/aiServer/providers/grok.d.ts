import { LanguageModelV1, ProviderV1 } from '@ai-sdk/provider';
import { AiBaseModelProvider } from '.';
export declare class GrokModelProvider extends AiBaseModelProvider {
    constructor({ globalConfig }: {
        globalConfig: any;
    });
    protected createProvider(): ProviderV1;
    protected getLLM(): LanguageModelV1;
}
