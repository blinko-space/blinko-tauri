export declare const aiRouter: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
    ctx: import("../context").User;
    meta: import("trpc-to-openapi").OpenApiMeta;
    errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
    transformer: true;
}, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
    embeddingUpsert: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: number;
            type: "update" | "insert";
            content: string;
        };
        output: {
            ok: true;
        };
    }>;
    embeddingInsertAttachments: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: number;
            filePath: string;
        };
        output: {
            ok: boolean;
            error?: undefined;
        } | {
            ok: boolean;
            error: any;
        } | {
            ok: boolean;
            msg: any;
        };
    }>;
    embeddingDelete: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: number;
        };
        output: {
            ok: boolean;
        } | {
            ok: boolean;
            msg: any;
        };
    }>;
    completions: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            conversations: {
                content: string;
                role: string;
            }[];
            question: string;
            withTools?: boolean | undefined;
            withOnline?: boolean | undefined;
            withRAG?: boolean | undefined;
            systemPrompt?: string | undefined;
        };
        output: AsyncGenerator<{
            chunk: import("ai").TextStreamPart<any>;
            notes?: undefined;
        } | {
            notes: any[];
            chunk?: undefined;
        }, void, unknown>;
    }>;
    speechToText: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            filePath: string;
        };
        output: void;
    }>;
    rebuildingEmbeddings: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            force?: boolean | undefined;
        };
        output: AsyncGenerator<import("@shared/lib/types").ProgressResult & {
            progress?: {
                current: number;
                total: number;
            };
        }, void, unknown>;
    }>;
    summarizeConversationTitle: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            conversations: {
                content: string;
                role: string;
            }[];
            conversationId: number;
        };
        output: {
            id: number;
            accountId: number;
            createdAt: Date;
            updatedAt: Date;
            title: string;
        };
    }>;
    writing: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            question: string;
            type?: "custom" | "expand" | "polish" | undefined;
            content?: string | undefined;
        };
        output: AsyncGenerator<import("ai").TextStreamPart<any>, void, unknown>;
    }>;
    autoTag: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            content: string;
        };
        output: string[];
    }>;
    autoEmoji: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            content: string;
        };
        output: string[];
    }>;
    AIComment: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            content: string;
            noteId: number;
        };
        output: {
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
        };
    }>;
    rebuildEmbeddingStart: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            force?: boolean | undefined;
        };
        output: {
            success: boolean;
        };
    }>;
    rebuildEmbeddingStop: import("@trpc/server").TRPCMutationProcedure<{
        input: void;
        output: {
            success: boolean;
        };
    }>;
    rebuildEmbeddingProgress: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: import("../jobs/rebuildEmbeddingJob").RebuildProgress;
    }>;
    testConnect: import("@trpc/server").TRPCMutationProcedure<{
        input: void;
        output: {
            success: boolean;
        };
    }>;
}>>;
