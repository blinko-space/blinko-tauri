import { MarkdownTextSplitter, TokenTextSplitter } from '@langchain/textsplitters';
import { GlobalConfig } from '@shared/lib/types';
import { BufferLoader } from 'langchain/document_loaders/fs/buffer';
import { ProviderV1, LanguageModelV1, EmbeddingModelV1 } from '@ai-sdk/provider';
import { LibSQLVector } from '../vector';
export declare abstract class AiBaseModelProvider {
    globalConfig: GlobalConfig;
    provider: ProviderV1;
    protected proxiedFetch: typeof fetch | undefined;
    protected ready: Promise<void>;
    constructor({ globalConfig }: {
        globalConfig: any;
    });
    languageModel(modelId: string): Promise<LanguageModelV1>;
    /**
     * Initialize the provider - this is called automatically by the constructor
     * Child classes should implement createProvider() to create their specific provider
     */
    private initialize;
    /**
     * Create the provider instance - to be implemented by child classes
     */
    protected abstract createProvider(): ProviderV1;
    /**
     * Get the language model - wait for initialization to complete
     */
    LLM(): Promise<LanguageModelV1>;
    /**
     * Actual implementation of LLM to be overridden by child classes
     */
    protected abstract getLLM(): LanguageModelV1;
    /**
     * Get the embedding model - wait for initialization to complete
     */
    Embeddings(): Promise<EmbeddingModelV1<string>>;
    rerankModel(): Promise<LanguageModelV1 | null>;
    /**
     * Optional custom embeddings implementation for child classes
     */
    protected getEmbeddings?(): EmbeddingModelV1<string>;
    MarkdownSplitter(): MarkdownTextSplitter;
    TokenTextSplitter(): TokenTextSplitter;
    VectorStore(): Promise<LibSQLVector>;
    AudioLoader(audioPath: any): BufferLoader;
}
