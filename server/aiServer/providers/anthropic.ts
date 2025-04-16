import { AiBaseModelProvider } from '.';
import { createAnthropic } from '@ai-sdk/anthropic';
import { LanguageModelV1, ProviderV1 } from '@ai-sdk/provider';

export class AnthropicModelProvider extends AiBaseModelProvider {
  constructor({ globalConfig }) {
    super({ globalConfig });
  }

  protected createProvider(): ProviderV1 {
    return createAnthropic({
      apiKey: this.globalConfig.aiApiKey,
      baseURL: this.globalConfig.aiApiEndpoint || undefined,
      // fetch: this.proxiedFetch
    });
  }

  protected getLLM(): LanguageModelV1 {
    return this.provider.languageModel(this.globalConfig.aiModel ?? 'claude-3-5-sonnet-20241022');
  }
}
