import { LanguageModelV1, ProviderV1 } from '@ai-sdk/provider';
import { AiBaseModelProvider } from '.';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

export class GeminiModelProvider extends AiBaseModelProvider {
  constructor({ globalConfig }) {
    super({ globalConfig });
  }
  
  protected createProvider(): ProviderV1 {
    return createGoogleGenerativeAI({
      apiKey: this.globalConfig.aiApiKey,
      // fetch: this.proxiedFetch
    });
  }

  protected getLLM(): LanguageModelV1 {
    return this.provider.languageModel(this.globalConfig.aiModel ?? 'gemini-pro');
  }
}
