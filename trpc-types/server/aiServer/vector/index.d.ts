import type { Client as TursoClient } from '@libsql/client';
import { MastraVector, QueryResult, ParamsToArgs, QueryVectorArgs, QueryVectorParams, UpsertVectorParams, CreateIndexParams, IndexStats } from '@mastra/core';
interface LibSQLQueryParams extends QueryVectorParams {
    minScore?: number;
}
type LibSQLQueryArgs = [...QueryVectorArgs, number?];
export declare class LibSQLVector extends MastraVector {
    turso: TursoClient;
    constructor({ connectionUrl, authToken, syncUrl, syncInterval, }: {
        connectionUrl: string;
        authToken?: string;
        syncUrl?: string;
        syncInterval?: number;
    });
    protected rewriteDbUrl(url: string): string;
    transformFilter(filter?: any): import("./filter").VectorFilter;
    query(...args: ParamsToArgs<LibSQLQueryParams> | LibSQLQueryArgs): Promise<QueryResult[]>;
    upsert(...args: ParamsToArgs<UpsertVectorParams>): Promise<string[]>;
    createIndex(...args: ParamsToArgs<CreateIndexParams>): Promise<void>;
    deleteIndex(indexName: string): Promise<void>;
    listIndexes(): Promise<string[]>;
    describeIndex(indexName: string): Promise<IndexStats>;
    /**
     * Updates an index entry by its ID with the provided vector and/or metadata.
     *
     * @param indexName - The name of the index to update.
     * @param id - The ID of the index entry to update.
     * @param update - An object containing the vector and/or metadata to update.
     * @param update.vector - An optional array of numbers representing the new vector.
     * @param update.metadata - An optional record containing the new metadata.
     * @returns A promise that resolves when the update is complete.
     * @throws Will throw an error if no updates are provided or if the update operation fails.
     */
    updateIndexById(indexName: string, id: string, update: {
        vector?: number[];
        metadata?: Record<string, any>;
    }): Promise<void>;
    deleteIndexById(indexName: string, id: string): Promise<void>;
    truncateIndex(indexName: string): Promise<void>;
}
export { LibSQLVector as DefaultVectorDB };
