import { AiBaseModelProvider } from '.';
import { createAzure } from '@ai-sdk/azure';
import { LanguageModelV1, ProviderV1 } from '@ai-sdk/provider';

export class AzureOpenAIModelProvider extends AiBaseModelProvider {

  constructor({ globalConfig }) {
    super({ globalConfig });
  }

  protected createProvider(): ProviderV1 {
    return createAzure({
      apiKey: this.globalConfig.aiApiKey,
      baseURL: this.globalConfig.aiApiEndpoint || undefined,
      // fetch: this.proxiedFetch
    });
  }

  protected getLLM(): LanguageModelV1 {
    return this.provider.languageModel(this.globalConfig.aiModel ?? 'gpt-3.5-turbo');
  }
}
