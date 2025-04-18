import { AiBaseModelProvider } from '.';
import { LanguageModelV1, ProviderV1 } from '@ai-sdk/provider';
export declare class DeepSeekModelProvider extends AiBaseModelProvider {
    constructor({ globalConfig }: {
        globalConfig: any;
    });
    protected createProvider(): ProviderV1;
    protected getLLM(): LanguageModelV1;
}
