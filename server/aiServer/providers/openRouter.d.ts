import { AiBaseModelProvider } from '.';
import { LanguageModelV1 } from '@ai-sdk/provider';
export declare class OpenRouterModelProvider extends AiBaseModelProvider {
    constructor({ globalConfig }: {
        globalConfig: any;
    });
    protected createProvider(): any;
    protected getLLM(): LanguageModelV1;
    Image(): import("@ai-sdk/provider").ImageModelV1 | undefined;
}
