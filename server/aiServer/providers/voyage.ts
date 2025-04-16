import { EmbeddingModelV1, LanguageModelV1, ProviderV1 } from '@ai-sdk/provider';
import { AiBaseModelProvider } from '.';
import { createVoyage } from 'voyage-ai-provider';

export class VoyageModelProvider extends AiBaseModelProvider {
  constructor({ globalConfig }) {
    super({ globalConfig });
  }

  protected createProvider(): ProviderV1 {
    return createVoyage({
      apiKey: this.globalConfig.aiApiKey,
      // fetch: this.proxiedFetch
    });
  }

  protected getLLM(): LanguageModelV1 {
    return this.provider.languageModel(this.globalConfig.aiModel ?? 'voyage-3');
  }

  protected getEmbeddings(): EmbeddingModelV1<string> {
    if (this.globalConfig.embeddingApiKey) {
      let overrideProvider = createVoyage({
        apiKey: this.globalConfig.embeddingApiKey,
      });
      return overrideProvider.textEmbeddingModel(this.globalConfig.embeddingModel ?? 'voyage-3-large');
    }
    return this.provider.textEmbeddingModel(this.globalConfig.embeddingModel ?? 'voyage-3-large');
  }
}
