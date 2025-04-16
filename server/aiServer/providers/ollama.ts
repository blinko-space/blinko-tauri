import { BufferLoader } from 'langchain/document_loaders/fs/buffer';
import { createOllama, OllamaProvider } from 'ollama-ai-provider';
import { AiBaseModelProvider } from '.';
import { LanguageModelV1, ProviderV1 } from '@ai-sdk/provider';

export class OllamaModelProvider extends AiBaseModelProvider {
  constructor({ globalConfig }) {
    super({ globalConfig });
  }

  protected createProvider(): ProviderV1 {
    return createOllama({
      baseURL: this.globalConfig.aiApiEndpoint?.trim() || undefined,
      // fetch: this.proxiedFetch
    }) as ProviderV1;
  }

  protected getLLM(): LanguageModelV1 {
    const provider = this.provider as OllamaProvider;
    return provider.languageModel(this.globalConfig.aiModel ?? 'llama3');
  }

  public AudioLoader(audioPath): BufferLoader {
    return null as unknown as BufferLoader;
  }
}
