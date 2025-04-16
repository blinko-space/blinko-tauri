import { LanguageModelV1, ProviderV1 } from '@ai-sdk/provider';
import { AiBaseModelProvider } from '.';
import { createXai } from '@ai-sdk/xai';

export class GrokModelProvider extends AiBaseModelProvider {
  constructor({ globalConfig }) {
    super({ globalConfig });
  }
  
  protected createProvider(): ProviderV1 {
    return createXai({
      apiKey: this.globalConfig.aiApiKey,
      // fetch: this.proxiedFetch
    });
  }

  protected getLLM(): LanguageModelV1 {
    return this.provider.languageModel(this.globalConfig.aiModel ?? 'grok-v1');
  }
}
