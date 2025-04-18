import '../lib/pdf-parse-wrapper';
import { AIMessage, HumanMessage } from '@langchain/core/messages';
import { ProgressResult } from '@shared/lib/types';
import { Context } from '../context';
import { CoreMessage } from '@mastra/core';
import { LibSQLVector } from './vector';
export declare function isImage(filePath: string): boolean;
export declare class AiService {
    static isImage: typeof isImage;
    static loadFileContent(filePath: string): Promise<string>;
    static embeddingDeleteAll(id: number, VectorStore: LibSQLVector): Promise<void>;
    static embeddingDeleteAllAttachments(filePath: string, VectorStore: LibSQLVector): Promise<void>;
    static embeddingUpsert({ id, content, type, createTime, updatedAt }: {
        id: number;
        content: string;
        type: 'update' | 'insert';
        createTime: Date;
        updatedAt?: Date;
    }): Promise<{
        ok: boolean;
        msg: string;
        error?: undefined;
    } | {
        ok: boolean;
        msg?: undefined;
        error?: undefined;
    } | {
        ok: boolean;
        error: any;
        msg?: undefined;
    }>;
    static embeddingInsertAttachments({ id, updatedAt, filePath }: {
        id: number;
        updatedAt?: Date;
        filePath: string;
    }): Promise<{
        ok: boolean;
        error?: undefined;
    } | {
        ok: boolean;
        error: any;
    }>;
    static embeddingDelete({ id }: {
        id: number;
    }): Promise<{
        ok: boolean;
    }>;
    static rebuildEmbeddingIndex({ force }: {
        force?: boolean;
    }): AsyncGenerator<ProgressResult & {
        progress?: {
            current: number;
            total: number;
        };
    }, void, unknown>;
    static getChatHistory({ conversations }: {
        conversations: {
            role: string;
            content: string;
        }[];
    }): (HumanMessage | AIMessage)[];
    static enhanceQuery({ query, ctx }: {
        query: string;
        ctx: Context;
    }): Promise<{
        score: number;
        attachments: {
            name: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            type: string;
            isShare: boolean;
            sharePassword: string;
            accountId: number | null;
            sortOrder: number;
            noteId: number | null;
            path: string;
            size: import("@prisma/client/runtime/library").Decimal;
            perfixPath: string | null;
            depth: number | null;
        }[];
        tags: ({
            tag: {
                name: string;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                accountId: number | null;
                icon: string;
                parent: number;
                sortOrder: number;
            };
        } & {
            id: number;
            noteId: number;
            tagId: number;
        })[];
        referencedBy: {
            fromNoteId: number;
            fromNote: {
                createdAt: Date;
                updatedAt: Date;
                content: string;
            };
        }[];
        references: {
            toNoteId: number;
            toNote: {
                createdAt: Date;
                updatedAt: Date;
                content: string;
            };
        }[];
        _count: {
            comments: number;
            histories: number;
        };
        id: number;
        createdAt: Date;
        updatedAt: Date;
        type: number;
        content: string;
        isArchived: boolean;
        isRecycle: boolean;
        isShare: boolean;
        isTop: boolean;
        isReviewed: boolean;
        sharePassword: string;
        shareEncryptedUrl: string | null;
        shareExpiryDate: Date | null;
        shareMaxView: number | null;
        shareViewCount: number | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        accountId: number | null;
    }[]>;
    static completions({ question, conversations, withTools, withRAG, withOnline, systemPrompt, ctx, }: {
        question: string;
        conversations: CoreMessage[];
        withTools?: boolean;
        withRAG?: boolean;
        withOnline?: boolean;
        systemPrompt?: string;
        ctx: Context;
    }): Promise<{
        result: import("ai").StreamTextResult<any, unknown>;
        notes: any[];
    }>;
    static AIComment({ content, noteId }: {
        content: string;
        noteId: number;
    }): Promise<{
        account: {
            name: string;
            id: number;
            nickname: string;
            image: string;
        } | null;
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        accountId: number | null;
        guestName: string | null;
        guestIP: string | null;
        guestUA: string | null;
        noteId: number;
        parentId: number | null;
    }>;
    static postProcessNote({ noteId, ctx }: {
        noteId: number;
        ctx: Context;
    }): Promise<{
        success: boolean;
        message: any;
    }>;
}
