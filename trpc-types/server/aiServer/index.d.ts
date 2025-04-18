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
            id: number;
            type: string;
            isShare: boolean;
            sharePassword: string;
            accountId: number | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            noteId: number | null;
            sortOrder: number;
            path: string;
            size: import("@prisma/client/runtime/library").Decimal;
            depth: number | null;
            perfixPath: string | null;
        }[];
        tags: ({
            tag: {
                id: number;
                accountId: number | null;
                createdAt: Date;
                updatedAt: Date;
                name: string;
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
                content: string;
                createdAt: Date;
                updatedAt: Date;
            };
        }[];
        references: {
            toNoteId: number;
            toNote: {
                content: string;
                createdAt: Date;
                updatedAt: Date;
            };
        }[];
        _count: {
            comments: number;
            histories: number;
        };
        id: number;
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
        createdAt: Date;
        updatedAt: Date;
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
            id: number;
            name: string;
            nickname: string;
            image: string;
        } | null;
    } & {
        id: number;
        content: string;
        accountId: number | null;
        createdAt: Date;
        updatedAt: Date;
        noteId: number;
        guestName: string | null;
        guestIP: string | null;
        guestUA: string | null;
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
