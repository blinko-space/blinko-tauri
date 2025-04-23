import { MarkdownTextSplitter, TokenTextSplitter } from '@langchain/textsplitters';
import { GlobalConfig } from '@shared/lib/types';
import { BufferLoader } from 'langchain/document_loaders/fs/buffer';
import { OpenAIWhisperAudio } from '@langchain/community/document_loaders/fs/openai_whisper_audio';
import { ProviderV1, LanguageModelV1, EmbeddingModelV1 } from '@ai-sdk/provider';
import { VECTOR_DB_FILE_PATH } from '@shared/lib/sharedConstant';
import { AiModelFactory } from '../aiModelFactory';
import { createOpenAI } from '@ai-sdk/openai';
import { createVoyage } from 'voyage-ai-provider';
import { LibSQLVector } from '../vector';
import { fetchWithProxy } from '@server/lib/proxy';
let vectorStore: LibSQLVector;

export abstract class AiBaseModelProvider {
  globalConfig: GlobalConfig;
  provider!: ProviderV1;
  protected proxiedFetch: typeof fetch | undefined = undefined;
  protected ready: Promise<void>;

  constructor({ globalConfig }) {
    this.globalConfig = globalConfig;

    // Create and store the initialization promise
    this.ready = this.initialize().catch((error) => {
      console.error('Provider initialization failed:', error);
    });
  }

  async languageModel(modelId: string): Promise<LanguageModelV1> {
    await this.ready;
    return this.provider.languageModel(modelId);
  }
  /**
   * Initialize the provider - this is called automatically by the constructor
   * Child classes should implement createProvider() to create their specific provider
   */
  private async initialize(): Promise<void> {
    try {
      // Get proxied fetch function first
      this.proxiedFetch = await fetchWithProxy();
    } catch (error) {
      console.error('Failed to initialize proxy fetch:', error);
      this.proxiedFetch = fetch; // Fallback to default fetch
    }

    // Now create the provider
    this.provider = this.createProvider();
  }

  /**
   * Create the provider instance - to be implemented by child classes
   */
  protected abstract createProvider(): ProviderV1;

  /**
   * Get the language model - wait for initialization to complete
   */
  async LLM(): Promise<LanguageModelV1> {
    await this.ready;
    return this.getLLM();
  }

  /**
   * Actual implementation of LLM to be overridden by child classes
   */
  protected abstract getLLM(): LanguageModelV1;

  /**
   * Get the embedding model - wait for initialization to complete
   */
  async Embeddings(): Promise<EmbeddingModelV1<string>> {
    await this.ready;

    // Check if child class provides custom embeddings implementation
    if (this.getEmbeddings) {
      return this.getEmbeddings();
    }

    // Default implementation
    try {
      const config = {
        apiKey: this.globalConfig.embeddingApiKey,
        baseURL: this.globalConfig.embeddingApiEndpoint || undefined,
      };
      if (this.globalConfig.embeddingModel?.includes('voyage')) {
        return createVoyage(config).textEmbeddingModel(this.globalConfig.embeddingModel);
      }
      if (this.globalConfig.embeddingApiKey) {
        return createOpenAI(config).textEmbeddingModel(this.globalConfig.embeddingModel ?? 'text-embedding-3-small');
      }
      return this.provider.textEmbeddingModel(this.globalConfig.embeddingModel ?? 'text-embedding-3-small');
    } catch (error) {
      console.log(error, 'ERROR Create Embedding model');
      throw error;
    }
  }

  async rerankModel(): Promise<LanguageModelV1 | null> {
    await this.ready;
    try {
      if (!this.globalConfig.rerankModel) {
        return null;
      }
      console.log(this.globalConfig.rerankModel, 'rerankModel');
      if (this.globalConfig.rerankUseEembbingEndpoint) {
        const config = {
          apiKey: this.globalConfig.embeddingApiKey,
          baseURL: this.globalConfig.embeddingApiEndpoint || undefined,
        };
        if (this.globalConfig.embeddingApiKey) {
          console.log(this.globalConfig.rerankModel, 'rerankModel');
          return createOpenAI(config).languageModel(this.globalConfig.rerankModel);
        }
      }
      console.log(this.globalConfig.rerankModel, 'rerankModel');
      return this.provider.languageModel(this.globalConfig.rerankModel);
    } catch (error) {
      console.log(error, 'ERROR Create Rerank model');
      throw error;
    }
  }

  /**
   * Optional custom embeddings implementation for child classes
   */
  protected getEmbeddings?(): EmbeddingModelV1<string>;

  public MarkdownSplitter(): MarkdownTextSplitter {
    return new MarkdownTextSplitter({
      chunkSize: 2000,
      chunkOverlap: 200,
    });
  }

  public TokenTextSplitter(): TokenTextSplitter {
    return new TokenTextSplitter({
      chunkSize: 2000,
      chunkOverlap: 200,
    });
  }

  public async VectorStore(): Promise<LibSQLVector> {
    await this.ready;

    if (!vectorStore) {
      vectorStore = new LibSQLVector({
        connectionUrl: VECTOR_DB_FILE_PATH,
      });
      //!index must be created before use
      await AiModelFactory.rebuildVectorIndex({ vectorStore });
    }
    return vectorStore;
  }

  public AudioLoader(audioPath): BufferLoader {
    //todo: loader from user config
    if (this.globalConfig.aiModelProvider == 'OpenAI') {
      return new OpenAIWhisperAudio(audioPath, {
        clientOptions: {
          apiKey: this.globalConfig.aiApiKey,
          baseURL: this.globalConfig.aiApiEndpoint || null,
        },
      });
    }
    return null as unknown as BufferLoader;
  }
}
