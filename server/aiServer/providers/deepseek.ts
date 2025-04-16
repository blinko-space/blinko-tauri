import { AiBaseModelProvider } from '.';
import { createDeepSeek } from '@ai-sdk/deepseek';
import { LanguageModelV1, ProviderV1 } from '@ai-sdk/provider';

export class DeepSeekModelProvider extends AiBaseModelProvider {
  constructor({ globalConfig }) {
    super({ globalConfig });
  }

  protected createProvider(): ProviderV1 {
    return createDeepSeek({
      apiKey: this.globalConfig.aiApiKey,
      // fetch: this.proxiedFetch
    });
  }

  protected getLLM(): LanguageModelV1 {
    return this.provider.languageModel(this.globalConfig.aiModel ?? 'deepseek-v3');
  }
}
