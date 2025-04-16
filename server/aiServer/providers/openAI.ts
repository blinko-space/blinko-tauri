import { createOpenAI } from "@ai-sdk/openai";
import { AiBaseModelProvider } from '.';
import { LanguageModelV1, ProviderV1 } from '@ai-sdk/provider';

export class OpenAIModelProvider extends AiBaseModelProvider {
  constructor({ globalConfig }) {
    super({ globalConfig });
  }

  protected createProvider(): ProviderV1 {
    return createOpenAI({
      apiKey: this.globalConfig.aiApiKey,
      baseURL: this.globalConfig.aiApiEndpoint || undefined,
      //override fetch on stream has some bug
      // fetch: this.proxiedFetch
    });
  }

  protected getLLM(): LanguageModelV1 {
    return this.provider.languageModel(this.globalConfig.aiModel ?? 'gpt-3.5-turbo');
  }

  async Image() {
    // Wait for initialization to complete
    await this.ready;
    
    try {
      return this.provider.imageModel?.('dall-e-3');
    } catch (error) {
      throw error;
    }
  }
}
