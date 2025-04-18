/**
 * This file contains the root router of your tRPC-backend
 */
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { Context } from '../context';
export declare const appRouter: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
    ctx: import("../context").User;
    meta: import("trpc-to-openapi").OpenApiMeta;
    errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
    transformer: true;
}, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
    ai: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
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
                    role: string;
                    content: string;
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
                    role: string;
                    content: string;
                }[];
                conversationId: number;
            };
            output: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                accountId: number;
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
    notes: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        list: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                orderBy?: "asc" | "desc" | undefined;
                type?: import("@shared/lib/types").NoteType | -1 | undefined;
                isArchived?: boolean | null | undefined;
                isRecycle?: boolean | undefined;
                isShare?: boolean | null | undefined;
                size?: number | undefined;
                tagId?: number | null | undefined;
                page?: number | undefined;
                searchText?: string | undefined;
                withoutTag?: boolean | undefined;
                withFile?: boolean | undefined;
                withLink?: boolean | undefined;
                isUseAiQuery?: boolean | undefined;
                startDate?: string | Date | null | undefined;
                endDate?: string | Date | null | undefined;
                hasTodo?: boolean | undefined;
            };
            output: {
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
                accountId: number | null;
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
                    size: string | number | import("@prisma/client/runtime/library").Decimal;
                    perfixPath?: any;
                    depth?: any;
                }[];
                tags: {
                    id: number;
                    tag: {
                        name: string;
                        id: number;
                        createdAt: Date;
                        updatedAt: Date;
                        icon: string;
                        parent: number;
                        sortOrder: number;
                    };
                    noteId: number;
                    tagId: number;
                }[];
                _count: {
                    comments: number;
                    histories: number;
                };
                shareEncryptedUrl?: string | null | undefined;
                shareExpiryDate?: Date | null | undefined;
                shareMaxView?: number | null | undefined;
                shareViewCount?: number | null | undefined;
                metadata?: any;
                canEdit?: boolean | undefined;
                referencedBy?: {
                    fromNoteId: number;
                    fromNote?: {
                        createdAt?: Date | undefined;
                        updatedAt?: Date | undefined;
                        content?: string | undefined;
                    } | undefined;
                }[] | undefined;
                references?: {
                    toNoteId: number;
                    toNote?: {
                        createdAt?: Date | undefined;
                        updatedAt?: Date | undefined;
                        content?: string | undefined;
                    } | undefined;
                }[] | undefined;
                owner?: {
                    name: string;
                    id: number;
                    nickname: string;
                    image: string;
                } | null | undefined;
                isSharedNote?: boolean | undefined;
                isInternalShared?: boolean | undefined;
            }[];
        }>;
        publicList: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                size?: number | undefined;
                page?: number | undefined;
                searchText?: string | undefined;
            };
            output: {
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
                accountId: number | null;
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
                    size: string | number | import("@prisma/client/runtime/library").Decimal;
                    perfixPath?: any;
                    depth?: any;
                }[];
                tags: {
                    id: number;
                    tag: {
                        name: string;
                        id: number;
                        createdAt: Date;
                        updatedAt: Date;
                        icon: string;
                        parent: number;
                        sortOrder: number;
                    };
                    noteId: number;
                    tagId: number;
                }[];
                _count: {
                    comments: number;
                };
                shareEncryptedUrl?: string | null | undefined;
                shareExpiryDate?: Date | null | undefined;
                shareMaxView?: number | null | undefined;
                shareViewCount?: number | null | undefined;
                metadata?: any;
                account?: {
                    name?: string | undefined;
                    id?: number | undefined;
                    nickname?: string | undefined;
                    image?: string | undefined;
                } | null | undefined;
            }[];
        }>;
        listByIds: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                ids: number[];
            };
            output: {
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
                accountId: number | null;
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
                    size: string | number | import("@prisma/client/runtime/library").Decimal;
                    perfixPath?: any;
                    depth?: any;
                }[];
                tags: {
                    id: number;
                    tag: {
                        name: string;
                        id: number;
                        createdAt: Date;
                        updatedAt: Date;
                        icon: string;
                        parent: number;
                        sortOrder: number;
                    };
                    noteId: number;
                    tagId: number;
                }[];
                _count: {
                    comments: number;
                    histories: number;
                };
                shareEncryptedUrl?: string | null | undefined;
                shareExpiryDate?: Date | null | undefined;
                shareMaxView?: number | null | undefined;
                shareViewCount?: number | null | undefined;
                metadata?: any;
                referencedBy?: {
                    fromNoteId: number;
                    fromNote?: {
                        createdAt?: Date | undefined;
                        updatedAt?: Date | undefined;
                        content?: string | undefined;
                    } | undefined;
                }[] | undefined;
                references?: {
                    toNoteId: number;
                    toNote?: {
                        createdAt?: Date | undefined;
                        updatedAt?: Date | undefined;
                        content?: string | undefined;
                    } | undefined;
                }[] | undefined;
            }[];
        }>;
        publicDetail: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                shareEncryptedUrl: string;
                password?: string | undefined;
            };
            output: {
                error: "expired" | null;
                data: {
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
                    accountId: number | null;
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
                        size: string | number | import("@prisma/client/runtime/library").Decimal;
                        perfixPath?: any;
                        depth?: any;
                    }[];
                    _count: {
                        comments: number;
                        histories: number;
                    };
                    shareEncryptedUrl?: string | null | undefined;
                    shareExpiryDate?: Date | null | undefined;
                    shareMaxView?: number | null | undefined;
                    shareViewCount?: number | null | undefined;
                    metadata?: any;
                    account?: {
                        name?: string | undefined;
                        id?: number | undefined;
                        nickname?: string | undefined;
                        image?: string | undefined;
                    } | null | undefined;
                    referencedBy?: {
                        fromNoteId: number;
                        fromNote?: {
                            createdAt?: Date | undefined;
                            updatedAt?: Date | undefined;
                            content?: string | undefined;
                        } | undefined;
                    }[] | undefined;
                    references?: {
                        toNoteId: number;
                        toNote?: {
                            createdAt?: Date | undefined;
                            updatedAt?: Date | undefined;
                            content?: string | undefined;
                        } | undefined;
                    }[] | undefined;
                } | null;
                hasPassword: boolean;
            };
        }>;
        detail: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: {
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
                accountId: number | null;
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
                    size: string | number | import("@prisma/client/runtime/library").Decimal;
                    perfixPath?: any;
                    depth?: any;
                }[];
                tags: {
                    id: number;
                    tag: {
                        name: string;
                        id: number;
                        createdAt: Date;
                        updatedAt: Date;
                        icon: string;
                        parent: number;
                        sortOrder: number;
                    };
                    noteId: number;
                    tagId: number;
                }[];
                _count: {
                    comments: number;
                    histories: number;
                };
                shareEncryptedUrl?: string | null | undefined;
                shareExpiryDate?: Date | null | undefined;
                shareMaxView?: number | null | undefined;
                shareViewCount?: number | null | undefined;
                metadata?: any;
                referencedBy?: {
                    fromNoteId: number;
                    fromNote?: {
                        createdAt?: Date | undefined;
                        updatedAt?: Date | undefined;
                        content?: string | undefined;
                    } | undefined;
                }[] | undefined;
                references?: {
                    toNoteId: number;
                    toNote?: {
                        createdAt?: Date | undefined;
                        updatedAt?: Date | undefined;
                        content?: string | undefined;
                    } | undefined;
                }[] | undefined;
            } | null;
        }>;
        dailyReviewNoteList: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
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
                accountId: number | null;
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
                    size: string | number | import("@prisma/client/runtime/library").Decimal;
                    perfixPath?: any;
                    depth?: any;
                }[];
                shareEncryptedUrl?: string | null | undefined;
                shareExpiryDate?: Date | null | undefined;
                shareMaxView?: number | null | undefined;
                shareViewCount?: number | null | undefined;
                metadata?: any;
            }[];
        }>;
        randomNoteList: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                limit?: number | undefined;
            };
            output: {
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
                accountId: number | null;
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
                    size: string | number | import("@prisma/client/runtime/library").Decimal;
                    perfixPath?: any;
                    depth?: any;
                }[];
                shareEncryptedUrl?: string | null | undefined;
                shareExpiryDate?: Date | null | undefined;
                shareMaxView?: number | null | undefined;
                shareViewCount?: number | null | undefined;
                metadata?: any;
            }[];
        }>;
        relatedNotes: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                id: number;
            };
            output: {
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
                accountId: number | null;
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
                    size: string | number | import("@prisma/client/runtime/library").Decimal;
                    perfixPath?: any;
                    depth?: any;
                }[];
                tags: {
                    id: number;
                    tag: {
                        name: string;
                        id: number;
                        createdAt: Date;
                        updatedAt: Date;
                        icon: string;
                        parent: number;
                        sortOrder: number;
                    };
                    noteId: number;
                    tagId: number;
                }[];
                _count: {
                    comments: number;
                    histories: number;
                };
                shareEncryptedUrl?: string | null | undefined;
                shareExpiryDate?: Date | null | undefined;
                shareMaxView?: number | null | undefined;
                shareViewCount?: number | null | undefined;
                metadata?: any;
                referencedBy?: {
                    fromNoteId: number;
                    fromNote?: {
                        createdAt?: Date | undefined;
                        updatedAt?: Date | undefined;
                        content?: string | undefined;
                    } | undefined;
                }[] | undefined;
                references?: {
                    toNoteId: number;
                    toNote?: {
                        createdAt?: Date | undefined;
                        updatedAt?: Date | undefined;
                        content?: string | undefined;
                    } | undefined;
                }[] | undefined;
            }[];
        }>;
        reviewNote: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: {
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
                accountId: number | null;
                shareEncryptedUrl?: string | null | undefined;
                shareExpiryDate?: Date | null | undefined;
                shareMaxView?: number | null | undefined;
                shareViewCount?: number | null | undefined;
                metadata?: any;
            } | null;
        }>;
        upsert: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id?: number | undefined;
                createdAt?: Date | undefined;
                updatedAt?: Date | undefined;
                type?: import("@shared/lib/types").NoteType | -1 | undefined;
                content?: string | null | undefined;
                isArchived?: boolean | null | undefined;
                isRecycle?: boolean | null | undefined;
                isShare?: boolean | null | undefined;
                isTop?: boolean | null | undefined;
                metadata?: any;
                attachments?: {
                    name: string;
                    type: string;
                    path: string;
                    size: string | number;
                }[] | undefined;
                references?: number[] | undefined;
            };
            output: any;
        }>;
        shareNote: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
                password?: string | undefined;
                isCancel?: boolean | undefined;
                expireAt?: Date | undefined;
            };
            output: {
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
                accountId: number | null;
                shareEncryptedUrl?: string | null | undefined;
                shareExpiryDate?: Date | null | undefined;
                shareMaxView?: number | null | undefined;
                shareViewCount?: number | null | undefined;
                metadata?: any;
            };
        }>;
        updateMany: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                ids: number[];
                type?: import("@shared/lib/types").NoteType | -1 | undefined;
                isArchived?: boolean | null | undefined;
                isRecycle?: boolean | null | undefined;
            };
            output: any;
        }>;
        trashMany: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                ids: number[];
            };
            output: any;
        }>;
        deleteMany: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                ids: number[];
            };
            output: any;
        }>;
        addReference: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                fromNoteId: number;
                toNoteId: number;
            };
            output: any;
        }>;
        noteReferenceList: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                noteId: number;
                type?: "referencedBy" | "references" | undefined;
            };
            output: {
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
                accountId: number | null;
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
                    size: string | number | import("@prisma/client/runtime/library").Decimal;
                    perfixPath?: any;
                    depth?: any;
                }[];
                referenceCreatedAt: Date;
                shareEncryptedUrl?: string | null | undefined;
                shareExpiryDate?: Date | null | undefined;
                shareMaxView?: number | null | undefined;
                shareViewCount?: number | null | undefined;
                metadata?: any;
            }[];
        }>;
        clearRecycleBin: import("@trpc/server").TRPCMutationProcedure<{
            input: void;
            output: any;
        }>;
        updateAttachmentsOrder: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                attachments: {
                    name: string;
                    sortOrder: number;
                }[];
            };
            output: any;
        }>;
        getNoteHistory: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                noteId: number;
            };
            output: {
                id: number;
                createdAt: Date;
                content: string;
                accountId: number | null;
                noteId: number;
                version?: number | undefined;
            }[];
        }>;
        getNoteVersion: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                noteId: number;
                version?: number | undefined;
            };
            output: {
                createdAt: Date;
                content: string;
                version: number;
                metadata?: any;
            };
        }>;
        internalShareNote: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
                accountIds: number[];
                isCancel?: boolean | undefined;
            };
            output: {
                success: boolean;
                message?: string | undefined;
            };
        }>;
        getInternalSharedUsers: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: {
                name: string;
                id: number;
                nickname: string;
                image: string;
                loginType: string;
                canEdit: boolean;
            }[];
        }>;
        internalSharedWithMe: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                orderBy?: "asc" | "desc" | undefined;
                size?: number | undefined;
                page?: number | undefined;
            };
            output: {
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
                accountId: number | null;
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
                    size: string | number | import("@prisma/client/runtime/library").Decimal;
                    perfixPath?: any;
                    depth?: any;
                }[];
                canEdit: boolean;
                tags: {
                    id: number;
                    tag: {
                        name: string;
                        id: number;
                        createdAt: Date;
                        updatedAt: Date;
                        icon: string;
                        parent: number;
                        sortOrder: number;
                    };
                    noteId: number;
                    tagId: number;
                }[];
                _count: {
                    comments: number;
                    histories: number;
                };
                owner: {
                    name: string;
                    id: number;
                    nickname: string;
                    image: string;
                } | null;
                shareEncryptedUrl?: string | null | undefined;
                shareExpiryDate?: Date | null | undefined;
                shareMaxView?: number | null | undefined;
                shareViewCount?: number | null | undefined;
                metadata?: any;
            }[];
        }>;
    }>>;
    tags: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        list: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                name: string;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                icon: string;
                parent: number;
                sortOrder: number;
            }[];
        }>;
        fullTagNameById: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                id: number;
            };
            output: string;
        }>;
        updateTagMany: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                tag: string;
                ids: number[];
            };
            output: boolean;
        }>;
        updateTagName: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
                oldName: string;
                newName: string;
            };
            output: boolean;
        }>;
        updateTagIcon: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
                icon: string;
            };
            output: {
                name: string;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                icon: string;
                parent: number;
                sortOrder: number;
            };
        }>;
        deleteOnlyTag: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: boolean;
        }>;
        deleteTagWithAllNote: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: boolean;
        }>;
        updateTagOrder: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
                sortOrder: number;
            };
            output: {
                name: string;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                accountId: number | null;
                icon: string;
                parent: number;
                sortOrder: number;
            };
        }>;
    }>>;
    users: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        list: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                name: string;
                id: number;
                nickname: string;
                password: string;
                image: string;
                apiToken: string;
                note: number;
                role: string;
                createdAt: Date;
                updatedAt: Date;
                description?: string | undefined;
                loginType?: string | undefined;
                linkAccountId?: number | null | undefined;
            }[];
        }>;
        publicUserList: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                name: string;
                id: number;
                nickname: string;
                image: string | null;
                description: string | null;
                role: string;
                loginType: string;
                linkAccountId: number | null;
                createdAt: Date;
                updatedAt: Date;
            }[];
        }>;
        nativeAccountList: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                name: string;
                id: number;
                nickname: string;
            }[];
        }>;
        linkAccount: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
                originalPassword: string;
            };
            output: boolean;
        }>;
        unlinkAccount: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: boolean;
        }>;
        detail: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                id?: number | undefined;
            };
            output: {
                name: string;
                id: number;
                image: string | null;
                role: string;
                loginType: string;
                nickName: string;
                token: string;
                isLinked: boolean;
            };
        }>;
        canRegister: import("@trpc/server").TRPCMutationProcedure<{
            input: void;
            output: boolean;
        }>;
        register: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                name: string;
                password: string;
            };
            output: any;
        }>;
        regenToken: import("@trpc/server").TRPCMutationProcedure<{
            input: void;
            output: boolean;
        }>;
        genLowPermToken: import("@trpc/server").TRPCMutationProcedure<{
            input: void;
            output: {
                token: string;
            };
        }>;
        upsertUser: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                name?: string | undefined;
                id?: number | undefined;
                nickname?: string | undefined;
                password?: string | undefined;
                image?: string | undefined;
                originalPassword?: string | undefined;
            };
            output: any;
        }>;
        upsertUserByAdmin: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                name?: string | undefined;
                id?: number | undefined;
                nickname?: string | undefined;
                password?: string | undefined;
            };
            output: any;
        }>;
        generate2FASecret: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                name: string;
            };
            output: {
                secret: string;
                qrCode: string;
            };
        }>;
        verify2FAToken: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                token: string;
                secret: string;
            };
            output: boolean;
        }>;
        deleteUser: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: boolean;
        }>;
        login: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                name: string;
                password: string;
            };
            output: {
                name: string;
                id: number;
                nickname: string;
                image: string | null;
                role: string;
                loginType: string;
                token: string;
            };
        }>;
    }>>;
    attachments: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        list: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                size?: number | undefined;
                page?: number | undefined;
                searchText?: string | undefined;
                folder?: string | undefined;
            };
            output: import("./attachment").AttachmentResult[];
        }>;
        rename: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                newName: string;
                id?: number | undefined;
                isFolder?: boolean | undefined;
                oldFolderPath?: string | undefined;
            };
            output: {
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
            } | {
                success: boolean;
            };
        }>;
        move: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                sourceIds: number[];
                targetFolder: string;
            };
            output: {
                success: boolean;
                message: string;
            };
        }>;
        delete: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id?: number | null | undefined;
                isFolder?: boolean | undefined;
                folderPath?: string | undefined;
            };
            output: {
                success: boolean;
                message: string;
            };
        }>;
        deleteMany: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                ids: number[];
            };
            output: {
                success: boolean;
                message: string;
            };
        }>;
    }>>;
    config: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        list: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                isAutoArchived?: boolean | undefined;
                autoArchivedDays?: number | undefined;
                isUseAI?: boolean | undefined;
                aiModelProvider?: any;
                aiApiKey?: any;
                aiApiEndpoint?: any;
                aiApiVersion?: any;
                aiModel?: any;
                isHiddenMobileBar?: boolean | undefined;
                toolbarVisibility?: any;
                isAllowRegister?: any;
                isCloseBackgroundAnimation?: boolean | undefined;
                customBackgroundUrl?: any;
                isOrderByCreateTime?: any;
                timeFormat?: any;
                smallDeviceCardColumns?: any;
                mediumDeviceCardColumns?: any;
                largeDeviceCardColumns?: any;
                textFoldLength?: number | undefined;
                objectStorage?: any;
                s3AccessKeyId?: any;
                s3AccessKeySecret?: any;
                s3Endpoint?: any;
                s3Bucket?: any;
                s3CustomPath?: any;
                s3Region?: any;
                localCustomPath?: any;
                embeddingModel?: any;
                embeddingDimensions?: number | undefined;
                embeddingTopK?: number | undefined;
                embeddingLambda?: number | undefined;
                embeddingScore?: number | undefined;
                excludeEmbeddingTagId?: number | undefined;
                language?: any;
                theme?: any;
                themeColor?: any;
                themeForegroundColor?: any;
                webhookEndpoint?: any;
                twoFactorEnabled?: boolean | undefined;
                twoFactorSecret?: string | undefined;
                spotifyConsumerKey?: string | undefined;
                spotifyConsumerSecret?: string | undefined;
                isCloseDailyReview?: boolean | undefined;
                maxHomePageWidth?: number | undefined;
                oauth2Providers?: {
                    name: string;
                    id: string;
                    tokenUrl: string;
                    userinfoUrl: string;
                    clientId: string;
                    clientSecret: string;
                    icon?: string | undefined;
                    wellKnown?: string | undefined;
                    scope?: string | undefined;
                    authorizationUrl?: string | undefined;
                }[] | undefined;
                isUseBlinkoHub?: boolean | undefined;
                embeddingApiEndpoint?: string | undefined;
                embeddingApiKey?: string | undefined;
                isHiddenNotification?: boolean | undefined;
                tavilyApiKey?: any;
                tavilyMaxResult?: any;
                isHideBlogImages?: boolean | undefined;
                isUseAiPostProcessing?: boolean | undefined;
                aiCommentPrompt?: string | undefined;
                aiTagsPrompt?: string | undefined;
                aiPostProcessingMode?: string | undefined;
                isUseHttpProxy?: boolean | undefined;
                httpProxyHost?: string | undefined;
                httpProxyPort?: number | undefined;
                httpProxyUsername?: string | undefined;
                httpProxyPassword?: string | undefined;
                aiSmartEditPrompt?: string | undefined;
                rerankModel?: string | undefined;
                rerankTopK?: number | undefined;
                rerankScore?: number | undefined;
                rerankUseEembbingEndpoint?: boolean | undefined;
            };
        }>;
        update: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                key?: any;
                value?: any;
            };
            output: {
                id: number;
                key: string;
                config?: any;
            };
        }>;
        setPluginConfig: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                key: string;
                pluginName: string;
                value?: any;
            };
            output: any;
        }>;
        getPluginConfig: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                pluginName: string;
            };
            output: any;
        }>;
    }>>;
    public: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        version: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: string;
        }>;
        oauthProviders: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                name: string;
                id: string;
                icon?: string | undefined;
            }[];
        }>;
        latestVersion: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: string;
        }>;
        linkPreview: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                url: string;
            };
            output: {
                description: string;
                title: string;
                favicon: string;
            } | null;
        }>;
        testWebhook: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                data?: any;
                webhookType?: string | undefined;
            };
            output: {
                success: boolean;
                data?: any;
            };
        }>;
        musicMetadata: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                filePath: string;
            };
            output: {
                coverUrl?: string | undefined;
                trackName?: string | undefined;
                albumName?: string | undefined;
                artists?: string[] | undefined;
            };
        }>;
        siteInfo: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                id?: number | null | undefined;
            } | undefined;
            output: {
                id: number;
                name?: string | undefined;
                image?: string | undefined;
                description?: string | undefined;
                role?: string | undefined;
            };
        }>;
        hubList: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                name: string;
                id: string;
                image: string;
                description: string;
            }[];
        }>;
        hubSiteList: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                search?: string | undefined;
                refresh?: boolean | undefined;
            };
            output: {
                title: string;
                url: string;
                image?: string | null | undefined;
                tags?: string[] | undefined;
                version?: string | undefined;
                site_description?: string | null | undefined;
            }[];
        }>;
        testHttpProxy: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                url?: string | undefined;
            };
            output: {
                message: string;
                success: boolean;
                responseTime: number;
                error?: string | undefined;
                statusCode?: number | undefined;
                errorCode?: string | undefined;
                errorDetails?: any;
            };
        }>;
    }>>;
    task: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        list: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                name: string;
                schedule: string;
                lastRun: Date;
                isSuccess: boolean;
                isRunning: boolean;
                output?: any;
            }[];
        }>;
        upsertTask: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                type: "update" | "stop" | "start";
                task: "Auto Archive Blinko" | "Backup Database";
                time?: string | undefined;
            };
            output: any;
        }>;
        importFromBlinko: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                filePath: string;
            };
            output: AsyncGenerator<import("@shared/lib/types").RestoreResult & {
                progress: {
                    current: number;
                    total: number;
                };
            }, void, unknown>;
        }>;
        importFromMemos: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                filePath: string;
            };
            output: AsyncGenerator<import("@shared/lib/types").ProgressResult & {
                progress?: {
                    current: number;
                    total: number;
                };
            }, void, unknown>;
        }>;
        exportMarkdown: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                format: "json" | "markdown" | "csv";
                baseURL: string;
                startDate?: Date | undefined;
                endDate?: Date | undefined;
            };
            output: {
                success: boolean;
                error?: string | undefined;
                downloadUrl?: string | undefined;
                fileCount?: number | undefined;
            };
        }>;
    }>>;
    analytics: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        dailyNoteCount: import("@trpc/server").TRPCMutationProcedure<{
            input: void;
            output: {
                date: string;
                count: number;
            }[];
        }>;
        monthlyStats: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                month: string;
            };
            output: {
                noteCount: number;
                totalWords: number;
                maxDailyWords: number;
                activeDays: number;
                tagStats?: {
                    count: number;
                    tagName: string;
                }[] | undefined;
            };
        }>;
    }>>;
    comments: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        create: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                content: string;
                noteId: number;
                guestName?: string | undefined;
                parentId?: number | undefined;
            };
            output: boolean;
        }>;
        list: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                noteId: number;
                orderBy?: "asc" | "desc" | undefined;
                size?: number | undefined;
                page?: number | undefined;
            };
            output: {
                total: number;
                items: any[];
            };
        }>;
        delete: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: {
                success: boolean;
            };
        }>;
        update: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
                content: string;
            };
            output: any;
        }>;
    }>>;
    follows: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        recommandList: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                searchText?: string | undefined;
            } | undefined;
            output: {
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
                accountId: number | null;
                shareEncryptedUrl?: string | null | undefined;
                shareExpiryDate?: Date | null | undefined;
                shareMaxView?: number | null | undefined;
                shareViewCount?: number | null | undefined;
                metadata?: any;
                attachments?: {
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
                    size: string | number | import("@prisma/client/runtime/library").Decimal;
                    perfixPath?: any;
                    depth?: any;
                }[] | undefined;
                tags?: ({
                    id: number;
                    tag: {
                        name: string;
                        id: number;
                        createdAt: Date;
                        updatedAt: Date;
                        icon: string;
                        parent: number;
                        sortOrder: number;
                    };
                    noteId: number;
                    tagId: number;
                } | undefined)[] | null | undefined;
                account?: {
                    name?: string | undefined;
                    id?: number | undefined;
                    nickname?: string | undefined;
                    image?: string | undefined;
                } | null | undefined;
                _count?: {
                    comments: number;
                } | undefined;
                originURL?: string | undefined;
            }[];
        }>;
        follow: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                siteUrl: string;
                mySiteUrl: string;
            };
            output: {
                success: boolean;
                data?: any;
            };
        }>;
        followFrom: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                siteName: string;
                siteUrl: string;
                siteAvatar: string;
                mySiteAccountId: number;
            };
            output: {
                success: boolean;
                data?: any;
            };
        }>;
        unfollow: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                siteUrl: string;
                mySiteUrl: string;
            };
            output: boolean;
        }>;
        unfollowFrom: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                siteUrl: string;
                mySiteAccountId: number;
            };
            output: boolean;
        }>;
        followList: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                userId?: number | null | undefined;
            };
            output: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                accountId: number;
                siteUrl: string;
                followType: string;
                description?: string | undefined;
                siteName?: string | undefined;
                siteAvatar?: string | undefined;
            }[] | undefined;
        }>;
        followerList: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                userId?: number | null | undefined;
            };
            output: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                accountId: number;
                siteUrl: string;
                followType: string;
                description?: string | undefined;
                siteName?: string | undefined;
                siteAvatar?: string | undefined;
            }[] | undefined;
        }>;
        isFollowing: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                siteUrl: string;
            };
            output: {
                data: boolean;
                success: boolean;
            };
        }>;
    }>>;
    notifications: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        list: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                size?: number | undefined;
                page?: number | undefined;
            };
            output: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                type: string;
                content: string;
                accountId: number;
                title: string;
                isRead: boolean;
                metadata?: any;
            }[];
        }>;
        create: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                type: string;
                content: string;
                title: string;
                metadata?: any;
            };
            output: boolean;
        }>;
        markAsRead: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id?: number | undefined;
                all?: boolean | undefined;
            };
            output: boolean;
        }>;
        unreadCount: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: number;
        }>;
        delete: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: boolean;
        }>;
    }>>;
    plugin: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        getAllPlugins: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                name: string;
                url: string;
                version: string;
                author: string;
                minAppVersion: string;
                downloads: number;
                description?: any;
                displayName?: any;
                readme?: any;
            }[];
        }>;
        getPluginCssContents: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                pluginName: string;
            };
            output: {
                content: string;
                fileName: string;
            }[];
        }>;
        saveDevPlugin: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                code: string;
                fileName: string;
                metadata?: any;
            };
            output: any;
        }>;
        saveAdditionalDevFile: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                content: string;
                filePath: string;
            };
            output: any;
        }>;
        installPlugin: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                name: string;
                url: string;
                version: string;
                author: string;
                minAppVersion: string;
                description?: any;
                displayName?: any;
            };
            output: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                metadata: import("@prisma/client/runtime/library").JsonValue;
                path: string;
                isUse: boolean;
                isDev: boolean;
            };
        }>;
        getInstalledPlugins: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                path: string;
                isUse: boolean;
                isDev: boolean;
                metadata?: any;
            }[];
        }>;
        uninstallPlugin: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: {
                success: boolean;
            };
        }>;
    }>>;
    conversation: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        create: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                title?: string | undefined;
            };
            output: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                accountId: number;
                title: string;
            };
        }>;
        clearMessages: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: {
                success: boolean;
            };
        }>;
        list: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                size?: number | undefined;
                page?: number | undefined;
            };
            output: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                accountId: number;
                title: string;
            }[];
        }>;
        detail: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                id: number;
            };
            output: ({
                messages: {
                    id: number;
                    role: string;
                    createdAt: Date;
                    updatedAt: Date;
                    content: string;
                    metadata: import("@prisma/client/runtime/library").JsonValue | null;
                    conversationId: number;
                }[];
            } & {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                accountId: number;
                title: string;
            }) | null;
        }>;
        update: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
                title?: string | undefined;
            };
            output: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                accountId: number;
                title: string;
            };
        }>;
        delete: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                accountId: number;
                title: string;
            };
        }>;
    }>>;
    message: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        create: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                role: "user" | "system" | "assistant";
                content: string;
                conversationId: number;
                metadata?: any;
            };
            output: {
                id: number;
                role: string;
                createdAt: Date;
                updatedAt: Date;
                content: string;
                metadata: import("@prisma/client/runtime/library").JsonValue | null;
                conversationId: number;
            };
        }>;
        list: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                conversationId: number;
                size?: number | undefined;
                page?: number | undefined;
            };
            output: {
                id: number;
                role: string;
                createdAt: Date;
                updatedAt: Date;
                content: string;
                metadata: import("@prisma/client/runtime/library").JsonValue | null;
                conversationId: number;
            }[];
        }>;
        update: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
                content: string;
            };
            output: {
                id: number;
                role: string;
                createdAt: Date;
                updatedAt: Date;
                content: string;
                metadata: import("@prisma/client/runtime/library").JsonValue | null;
                conversationId: number;
            };
        }>;
        delete: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: void;
        }>;
    }>>;
}>>;
export declare const createCaller: import("@trpc/server/unstable-core-do-not-import").RouterCaller<{
    ctx: import("../context").User;
    meta: import("trpc-to-openapi").OpenApiMeta;
    errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
    transformer: true;
}, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
    ai: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
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
                    role: string;
                    content: string;
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
                    role: string;
                    content: string;
                }[];
                conversationId: number;
            };
            output: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                accountId: number;
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
    notes: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        list: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                orderBy?: "asc" | "desc" | undefined;
                type?: import("@shared/lib/types").NoteType | -1 | undefined;
                isArchived?: boolean | null | undefined;
                isRecycle?: boolean | undefined;
                isShare?: boolean | null | undefined;
                size?: number | undefined;
                tagId?: number | null | undefined;
                page?: number | undefined;
                searchText?: string | undefined;
                withoutTag?: boolean | undefined;
                withFile?: boolean | undefined;
                withLink?: boolean | undefined;
                isUseAiQuery?: boolean | undefined;
                startDate?: string | Date | null | undefined;
                endDate?: string | Date | null | undefined;
                hasTodo?: boolean | undefined;
            };
            output: {
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
                accountId: number | null;
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
                    size: string | number | import("@prisma/client/runtime/library").Decimal;
                    perfixPath?: any;
                    depth?: any;
                }[];
                tags: {
                    id: number;
                    tag: {
                        name: string;
                        id: number;
                        createdAt: Date;
                        updatedAt: Date;
                        icon: string;
                        parent: number;
                        sortOrder: number;
                    };
                    noteId: number;
                    tagId: number;
                }[];
                _count: {
                    comments: number;
                    histories: number;
                };
                shareEncryptedUrl?: string | null | undefined;
                shareExpiryDate?: Date | null | undefined;
                shareMaxView?: number | null | undefined;
                shareViewCount?: number | null | undefined;
                metadata?: any;
                canEdit?: boolean | undefined;
                referencedBy?: {
                    fromNoteId: number;
                    fromNote?: {
                        createdAt?: Date | undefined;
                        updatedAt?: Date | undefined;
                        content?: string | undefined;
                    } | undefined;
                }[] | undefined;
                references?: {
                    toNoteId: number;
                    toNote?: {
                        createdAt?: Date | undefined;
                        updatedAt?: Date | undefined;
                        content?: string | undefined;
                    } | undefined;
                }[] | undefined;
                owner?: {
                    name: string;
                    id: number;
                    nickname: string;
                    image: string;
                } | null | undefined;
                isSharedNote?: boolean | undefined;
                isInternalShared?: boolean | undefined;
            }[];
        }>;
        publicList: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                size?: number | undefined;
                page?: number | undefined;
                searchText?: string | undefined;
            };
            output: {
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
                accountId: number | null;
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
                    size: string | number | import("@prisma/client/runtime/library").Decimal;
                    perfixPath?: any;
                    depth?: any;
                }[];
                tags: {
                    id: number;
                    tag: {
                        name: string;
                        id: number;
                        createdAt: Date;
                        updatedAt: Date;
                        icon: string;
                        parent: number;
                        sortOrder: number;
                    };
                    noteId: number;
                    tagId: number;
                }[];
                _count: {
                    comments: number;
                };
                shareEncryptedUrl?: string | null | undefined;
                shareExpiryDate?: Date | null | undefined;
                shareMaxView?: number | null | undefined;
                shareViewCount?: number | null | undefined;
                metadata?: any;
                account?: {
                    name?: string | undefined;
                    id?: number | undefined;
                    nickname?: string | undefined;
                    image?: string | undefined;
                } | null | undefined;
            }[];
        }>;
        listByIds: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                ids: number[];
            };
            output: {
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
                accountId: number | null;
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
                    size: string | number | import("@prisma/client/runtime/library").Decimal;
                    perfixPath?: any;
                    depth?: any;
                }[];
                tags: {
                    id: number;
                    tag: {
                        name: string;
                        id: number;
                        createdAt: Date;
                        updatedAt: Date;
                        icon: string;
                        parent: number;
                        sortOrder: number;
                    };
                    noteId: number;
                    tagId: number;
                }[];
                _count: {
                    comments: number;
                    histories: number;
                };
                shareEncryptedUrl?: string | null | undefined;
                shareExpiryDate?: Date | null | undefined;
                shareMaxView?: number | null | undefined;
                shareViewCount?: number | null | undefined;
                metadata?: any;
                referencedBy?: {
                    fromNoteId: number;
                    fromNote?: {
                        createdAt?: Date | undefined;
                        updatedAt?: Date | undefined;
                        content?: string | undefined;
                    } | undefined;
                }[] | undefined;
                references?: {
                    toNoteId: number;
                    toNote?: {
                        createdAt?: Date | undefined;
                        updatedAt?: Date | undefined;
                        content?: string | undefined;
                    } | undefined;
                }[] | undefined;
            }[];
        }>;
        publicDetail: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                shareEncryptedUrl: string;
                password?: string | undefined;
            };
            output: {
                error: "expired" | null;
                data: {
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
                    accountId: number | null;
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
                        size: string | number | import("@prisma/client/runtime/library").Decimal;
                        perfixPath?: any;
                        depth?: any;
                    }[];
                    _count: {
                        comments: number;
                        histories: number;
                    };
                    shareEncryptedUrl?: string | null | undefined;
                    shareExpiryDate?: Date | null | undefined;
                    shareMaxView?: number | null | undefined;
                    shareViewCount?: number | null | undefined;
                    metadata?: any;
                    account?: {
                        name?: string | undefined;
                        id?: number | undefined;
                        nickname?: string | undefined;
                        image?: string | undefined;
                    } | null | undefined;
                    referencedBy?: {
                        fromNoteId: number;
                        fromNote?: {
                            createdAt?: Date | undefined;
                            updatedAt?: Date | undefined;
                            content?: string | undefined;
                        } | undefined;
                    }[] | undefined;
                    references?: {
                        toNoteId: number;
                        toNote?: {
                            createdAt?: Date | undefined;
                            updatedAt?: Date | undefined;
                            content?: string | undefined;
                        } | undefined;
                    }[] | undefined;
                } | null;
                hasPassword: boolean;
            };
        }>;
        detail: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: {
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
                accountId: number | null;
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
                    size: string | number | import("@prisma/client/runtime/library").Decimal;
                    perfixPath?: any;
                    depth?: any;
                }[];
                tags: {
                    id: number;
                    tag: {
                        name: string;
                        id: number;
                        createdAt: Date;
                        updatedAt: Date;
                        icon: string;
                        parent: number;
                        sortOrder: number;
                    };
                    noteId: number;
                    tagId: number;
                }[];
                _count: {
                    comments: number;
                    histories: number;
                };
                shareEncryptedUrl?: string | null | undefined;
                shareExpiryDate?: Date | null | undefined;
                shareMaxView?: number | null | undefined;
                shareViewCount?: number | null | undefined;
                metadata?: any;
                referencedBy?: {
                    fromNoteId: number;
                    fromNote?: {
                        createdAt?: Date | undefined;
                        updatedAt?: Date | undefined;
                        content?: string | undefined;
                    } | undefined;
                }[] | undefined;
                references?: {
                    toNoteId: number;
                    toNote?: {
                        createdAt?: Date | undefined;
                        updatedAt?: Date | undefined;
                        content?: string | undefined;
                    } | undefined;
                }[] | undefined;
            } | null;
        }>;
        dailyReviewNoteList: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
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
                accountId: number | null;
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
                    size: string | number | import("@prisma/client/runtime/library").Decimal;
                    perfixPath?: any;
                    depth?: any;
                }[];
                shareEncryptedUrl?: string | null | undefined;
                shareExpiryDate?: Date | null | undefined;
                shareMaxView?: number | null | undefined;
                shareViewCount?: number | null | undefined;
                metadata?: any;
            }[];
        }>;
        randomNoteList: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                limit?: number | undefined;
            };
            output: {
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
                accountId: number | null;
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
                    size: string | number | import("@prisma/client/runtime/library").Decimal;
                    perfixPath?: any;
                    depth?: any;
                }[];
                shareEncryptedUrl?: string | null | undefined;
                shareExpiryDate?: Date | null | undefined;
                shareMaxView?: number | null | undefined;
                shareViewCount?: number | null | undefined;
                metadata?: any;
            }[];
        }>;
        relatedNotes: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                id: number;
            };
            output: {
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
                accountId: number | null;
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
                    size: string | number | import("@prisma/client/runtime/library").Decimal;
                    perfixPath?: any;
                    depth?: any;
                }[];
                tags: {
                    id: number;
                    tag: {
                        name: string;
                        id: number;
                        createdAt: Date;
                        updatedAt: Date;
                        icon: string;
                        parent: number;
                        sortOrder: number;
                    };
                    noteId: number;
                    tagId: number;
                }[];
                _count: {
                    comments: number;
                    histories: number;
                };
                shareEncryptedUrl?: string | null | undefined;
                shareExpiryDate?: Date | null | undefined;
                shareMaxView?: number | null | undefined;
                shareViewCount?: number | null | undefined;
                metadata?: any;
                referencedBy?: {
                    fromNoteId: number;
                    fromNote?: {
                        createdAt?: Date | undefined;
                        updatedAt?: Date | undefined;
                        content?: string | undefined;
                    } | undefined;
                }[] | undefined;
                references?: {
                    toNoteId: number;
                    toNote?: {
                        createdAt?: Date | undefined;
                        updatedAt?: Date | undefined;
                        content?: string | undefined;
                    } | undefined;
                }[] | undefined;
            }[];
        }>;
        reviewNote: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: {
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
                accountId: number | null;
                shareEncryptedUrl?: string | null | undefined;
                shareExpiryDate?: Date | null | undefined;
                shareMaxView?: number | null | undefined;
                shareViewCount?: number | null | undefined;
                metadata?: any;
            } | null;
        }>;
        upsert: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id?: number | undefined;
                createdAt?: Date | undefined;
                updatedAt?: Date | undefined;
                type?: import("@shared/lib/types").NoteType | -1 | undefined;
                content?: string | null | undefined;
                isArchived?: boolean | null | undefined;
                isRecycle?: boolean | null | undefined;
                isShare?: boolean | null | undefined;
                isTop?: boolean | null | undefined;
                metadata?: any;
                attachments?: {
                    name: string;
                    type: string;
                    path: string;
                    size: string | number;
                }[] | undefined;
                references?: number[] | undefined;
            };
            output: any;
        }>;
        shareNote: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
                password?: string | undefined;
                isCancel?: boolean | undefined;
                expireAt?: Date | undefined;
            };
            output: {
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
                accountId: number | null;
                shareEncryptedUrl?: string | null | undefined;
                shareExpiryDate?: Date | null | undefined;
                shareMaxView?: number | null | undefined;
                shareViewCount?: number | null | undefined;
                metadata?: any;
            };
        }>;
        updateMany: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                ids: number[];
                type?: import("@shared/lib/types").NoteType | -1 | undefined;
                isArchived?: boolean | null | undefined;
                isRecycle?: boolean | null | undefined;
            };
            output: any;
        }>;
        trashMany: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                ids: number[];
            };
            output: any;
        }>;
        deleteMany: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                ids: number[];
            };
            output: any;
        }>;
        addReference: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                fromNoteId: number;
                toNoteId: number;
            };
            output: any;
        }>;
        noteReferenceList: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                noteId: number;
                type?: "referencedBy" | "references" | undefined;
            };
            output: {
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
                accountId: number | null;
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
                    size: string | number | import("@prisma/client/runtime/library").Decimal;
                    perfixPath?: any;
                    depth?: any;
                }[];
                referenceCreatedAt: Date;
                shareEncryptedUrl?: string | null | undefined;
                shareExpiryDate?: Date | null | undefined;
                shareMaxView?: number | null | undefined;
                shareViewCount?: number | null | undefined;
                metadata?: any;
            }[];
        }>;
        clearRecycleBin: import("@trpc/server").TRPCMutationProcedure<{
            input: void;
            output: any;
        }>;
        updateAttachmentsOrder: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                attachments: {
                    name: string;
                    sortOrder: number;
                }[];
            };
            output: any;
        }>;
        getNoteHistory: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                noteId: number;
            };
            output: {
                id: number;
                createdAt: Date;
                content: string;
                accountId: number | null;
                noteId: number;
                version?: number | undefined;
            }[];
        }>;
        getNoteVersion: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                noteId: number;
                version?: number | undefined;
            };
            output: {
                createdAt: Date;
                content: string;
                version: number;
                metadata?: any;
            };
        }>;
        internalShareNote: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
                accountIds: number[];
                isCancel?: boolean | undefined;
            };
            output: {
                success: boolean;
                message?: string | undefined;
            };
        }>;
        getInternalSharedUsers: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: {
                name: string;
                id: number;
                nickname: string;
                image: string;
                loginType: string;
                canEdit: boolean;
            }[];
        }>;
        internalSharedWithMe: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                orderBy?: "asc" | "desc" | undefined;
                size?: number | undefined;
                page?: number | undefined;
            };
            output: {
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
                accountId: number | null;
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
                    size: string | number | import("@prisma/client/runtime/library").Decimal;
                    perfixPath?: any;
                    depth?: any;
                }[];
                canEdit: boolean;
                tags: {
                    id: number;
                    tag: {
                        name: string;
                        id: number;
                        createdAt: Date;
                        updatedAt: Date;
                        icon: string;
                        parent: number;
                        sortOrder: number;
                    };
                    noteId: number;
                    tagId: number;
                }[];
                _count: {
                    comments: number;
                    histories: number;
                };
                owner: {
                    name: string;
                    id: number;
                    nickname: string;
                    image: string;
                } | null;
                shareEncryptedUrl?: string | null | undefined;
                shareExpiryDate?: Date | null | undefined;
                shareMaxView?: number | null | undefined;
                shareViewCount?: number | null | undefined;
                metadata?: any;
            }[];
        }>;
    }>>;
    tags: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        list: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                name: string;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                icon: string;
                parent: number;
                sortOrder: number;
            }[];
        }>;
        fullTagNameById: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                id: number;
            };
            output: string;
        }>;
        updateTagMany: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                tag: string;
                ids: number[];
            };
            output: boolean;
        }>;
        updateTagName: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
                oldName: string;
                newName: string;
            };
            output: boolean;
        }>;
        updateTagIcon: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
                icon: string;
            };
            output: {
                name: string;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                icon: string;
                parent: number;
                sortOrder: number;
            };
        }>;
        deleteOnlyTag: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: boolean;
        }>;
        deleteTagWithAllNote: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: boolean;
        }>;
        updateTagOrder: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
                sortOrder: number;
            };
            output: {
                name: string;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                accountId: number | null;
                icon: string;
                parent: number;
                sortOrder: number;
            };
        }>;
    }>>;
    users: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        list: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                name: string;
                id: number;
                nickname: string;
                password: string;
                image: string;
                apiToken: string;
                note: number;
                role: string;
                createdAt: Date;
                updatedAt: Date;
                description?: string | undefined;
                loginType?: string | undefined;
                linkAccountId?: number | null | undefined;
            }[];
        }>;
        publicUserList: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                name: string;
                id: number;
                nickname: string;
                image: string | null;
                description: string | null;
                role: string;
                loginType: string;
                linkAccountId: number | null;
                createdAt: Date;
                updatedAt: Date;
            }[];
        }>;
        nativeAccountList: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                name: string;
                id: number;
                nickname: string;
            }[];
        }>;
        linkAccount: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
                originalPassword: string;
            };
            output: boolean;
        }>;
        unlinkAccount: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: boolean;
        }>;
        detail: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                id?: number | undefined;
            };
            output: {
                name: string;
                id: number;
                image: string | null;
                role: string;
                loginType: string;
                nickName: string;
                token: string;
                isLinked: boolean;
            };
        }>;
        canRegister: import("@trpc/server").TRPCMutationProcedure<{
            input: void;
            output: boolean;
        }>;
        register: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                name: string;
                password: string;
            };
            output: any;
        }>;
        regenToken: import("@trpc/server").TRPCMutationProcedure<{
            input: void;
            output: boolean;
        }>;
        genLowPermToken: import("@trpc/server").TRPCMutationProcedure<{
            input: void;
            output: {
                token: string;
            };
        }>;
        upsertUser: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                name?: string | undefined;
                id?: number | undefined;
                nickname?: string | undefined;
                password?: string | undefined;
                image?: string | undefined;
                originalPassword?: string | undefined;
            };
            output: any;
        }>;
        upsertUserByAdmin: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                name?: string | undefined;
                id?: number | undefined;
                nickname?: string | undefined;
                password?: string | undefined;
            };
            output: any;
        }>;
        generate2FASecret: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                name: string;
            };
            output: {
                secret: string;
                qrCode: string;
            };
        }>;
        verify2FAToken: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                token: string;
                secret: string;
            };
            output: boolean;
        }>;
        deleteUser: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: boolean;
        }>;
        login: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                name: string;
                password: string;
            };
            output: {
                name: string;
                id: number;
                nickname: string;
                image: string | null;
                role: string;
                loginType: string;
                token: string;
            };
        }>;
    }>>;
    attachments: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        list: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                size?: number | undefined;
                page?: number | undefined;
                searchText?: string | undefined;
                folder?: string | undefined;
            };
            output: import("./attachment").AttachmentResult[];
        }>;
        rename: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                newName: string;
                id?: number | undefined;
                isFolder?: boolean | undefined;
                oldFolderPath?: string | undefined;
            };
            output: {
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
            } | {
                success: boolean;
            };
        }>;
        move: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                sourceIds: number[];
                targetFolder: string;
            };
            output: {
                success: boolean;
                message: string;
            };
        }>;
        delete: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id?: number | null | undefined;
                isFolder?: boolean | undefined;
                folderPath?: string | undefined;
            };
            output: {
                success: boolean;
                message: string;
            };
        }>;
        deleteMany: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                ids: number[];
            };
            output: {
                success: boolean;
                message: string;
            };
        }>;
    }>>;
    config: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        list: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                isAutoArchived?: boolean | undefined;
                autoArchivedDays?: number | undefined;
                isUseAI?: boolean | undefined;
                aiModelProvider?: any;
                aiApiKey?: any;
                aiApiEndpoint?: any;
                aiApiVersion?: any;
                aiModel?: any;
                isHiddenMobileBar?: boolean | undefined;
                toolbarVisibility?: any;
                isAllowRegister?: any;
                isCloseBackgroundAnimation?: boolean | undefined;
                customBackgroundUrl?: any;
                isOrderByCreateTime?: any;
                timeFormat?: any;
                smallDeviceCardColumns?: any;
                mediumDeviceCardColumns?: any;
                largeDeviceCardColumns?: any;
                textFoldLength?: number | undefined;
                objectStorage?: any;
                s3AccessKeyId?: any;
                s3AccessKeySecret?: any;
                s3Endpoint?: any;
                s3Bucket?: any;
                s3CustomPath?: any;
                s3Region?: any;
                localCustomPath?: any;
                embeddingModel?: any;
                embeddingDimensions?: number | undefined;
                embeddingTopK?: number | undefined;
                embeddingLambda?: number | undefined;
                embeddingScore?: number | undefined;
                excludeEmbeddingTagId?: number | undefined;
                language?: any;
                theme?: any;
                themeColor?: any;
                themeForegroundColor?: any;
                webhookEndpoint?: any;
                twoFactorEnabled?: boolean | undefined;
                twoFactorSecret?: string | undefined;
                spotifyConsumerKey?: string | undefined;
                spotifyConsumerSecret?: string | undefined;
                isCloseDailyReview?: boolean | undefined;
                maxHomePageWidth?: number | undefined;
                oauth2Providers?: {
                    name: string;
                    id: string;
                    tokenUrl: string;
                    userinfoUrl: string;
                    clientId: string;
                    clientSecret: string;
                    icon?: string | undefined;
                    wellKnown?: string | undefined;
                    scope?: string | undefined;
                    authorizationUrl?: string | undefined;
                }[] | undefined;
                isUseBlinkoHub?: boolean | undefined;
                embeddingApiEndpoint?: string | undefined;
                embeddingApiKey?: string | undefined;
                isHiddenNotification?: boolean | undefined;
                tavilyApiKey?: any;
                tavilyMaxResult?: any;
                isHideBlogImages?: boolean | undefined;
                isUseAiPostProcessing?: boolean | undefined;
                aiCommentPrompt?: string | undefined;
                aiTagsPrompt?: string | undefined;
                aiPostProcessingMode?: string | undefined;
                isUseHttpProxy?: boolean | undefined;
                httpProxyHost?: string | undefined;
                httpProxyPort?: number | undefined;
                httpProxyUsername?: string | undefined;
                httpProxyPassword?: string | undefined;
                aiSmartEditPrompt?: string | undefined;
                rerankModel?: string | undefined;
                rerankTopK?: number | undefined;
                rerankScore?: number | undefined;
                rerankUseEembbingEndpoint?: boolean | undefined;
            };
        }>;
        update: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                key?: any;
                value?: any;
            };
            output: {
                id: number;
                key: string;
                config?: any;
            };
        }>;
        setPluginConfig: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                key: string;
                pluginName: string;
                value?: any;
            };
            output: any;
        }>;
        getPluginConfig: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                pluginName: string;
            };
            output: any;
        }>;
    }>>;
    public: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        version: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: string;
        }>;
        oauthProviders: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                name: string;
                id: string;
                icon?: string | undefined;
            }[];
        }>;
        latestVersion: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: string;
        }>;
        linkPreview: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                url: string;
            };
            output: {
                description: string;
                title: string;
                favicon: string;
            } | null;
        }>;
        testWebhook: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                data?: any;
                webhookType?: string | undefined;
            };
            output: {
                success: boolean;
                data?: any;
            };
        }>;
        musicMetadata: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                filePath: string;
            };
            output: {
                coverUrl?: string | undefined;
                trackName?: string | undefined;
                albumName?: string | undefined;
                artists?: string[] | undefined;
            };
        }>;
        siteInfo: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                id?: number | null | undefined;
            } | undefined;
            output: {
                id: number;
                name?: string | undefined;
                image?: string | undefined;
                description?: string | undefined;
                role?: string | undefined;
            };
        }>;
        hubList: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                name: string;
                id: string;
                image: string;
                description: string;
            }[];
        }>;
        hubSiteList: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                search?: string | undefined;
                refresh?: boolean | undefined;
            };
            output: {
                title: string;
                url: string;
                image?: string | null | undefined;
                tags?: string[] | undefined;
                version?: string | undefined;
                site_description?: string | null | undefined;
            }[];
        }>;
        testHttpProxy: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                url?: string | undefined;
            };
            output: {
                message: string;
                success: boolean;
                responseTime: number;
                error?: string | undefined;
                statusCode?: number | undefined;
                errorCode?: string | undefined;
                errorDetails?: any;
            };
        }>;
    }>>;
    task: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        list: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                name: string;
                schedule: string;
                lastRun: Date;
                isSuccess: boolean;
                isRunning: boolean;
                output?: any;
            }[];
        }>;
        upsertTask: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                type: "update" | "stop" | "start";
                task: "Auto Archive Blinko" | "Backup Database";
                time?: string | undefined;
            };
            output: any;
        }>;
        importFromBlinko: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                filePath: string;
            };
            output: AsyncGenerator<import("@shared/lib/types").RestoreResult & {
                progress: {
                    current: number;
                    total: number;
                };
            }, void, unknown>;
        }>;
        importFromMemos: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                filePath: string;
            };
            output: AsyncGenerator<import("@shared/lib/types").ProgressResult & {
                progress?: {
                    current: number;
                    total: number;
                };
            }, void, unknown>;
        }>;
        exportMarkdown: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                format: "json" | "markdown" | "csv";
                baseURL: string;
                startDate?: Date | undefined;
                endDate?: Date | undefined;
            };
            output: {
                success: boolean;
                error?: string | undefined;
                downloadUrl?: string | undefined;
                fileCount?: number | undefined;
            };
        }>;
    }>>;
    analytics: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        dailyNoteCount: import("@trpc/server").TRPCMutationProcedure<{
            input: void;
            output: {
                date: string;
                count: number;
            }[];
        }>;
        monthlyStats: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                month: string;
            };
            output: {
                noteCount: number;
                totalWords: number;
                maxDailyWords: number;
                activeDays: number;
                tagStats?: {
                    count: number;
                    tagName: string;
                }[] | undefined;
            };
        }>;
    }>>;
    comments: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        create: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                content: string;
                noteId: number;
                guestName?: string | undefined;
                parentId?: number | undefined;
            };
            output: boolean;
        }>;
        list: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                noteId: number;
                orderBy?: "asc" | "desc" | undefined;
                size?: number | undefined;
                page?: number | undefined;
            };
            output: {
                total: number;
                items: any[];
            };
        }>;
        delete: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: {
                success: boolean;
            };
        }>;
        update: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
                content: string;
            };
            output: any;
        }>;
    }>>;
    follows: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        recommandList: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                searchText?: string | undefined;
            } | undefined;
            output: {
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
                accountId: number | null;
                shareEncryptedUrl?: string | null | undefined;
                shareExpiryDate?: Date | null | undefined;
                shareMaxView?: number | null | undefined;
                shareViewCount?: number | null | undefined;
                metadata?: any;
                attachments?: {
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
                    size: string | number | import("@prisma/client/runtime/library").Decimal;
                    perfixPath?: any;
                    depth?: any;
                }[] | undefined;
                tags?: ({
                    id: number;
                    tag: {
                        name: string;
                        id: number;
                        createdAt: Date;
                        updatedAt: Date;
                        icon: string;
                        parent: number;
                        sortOrder: number;
                    };
                    noteId: number;
                    tagId: number;
                } | undefined)[] | null | undefined;
                account?: {
                    name?: string | undefined;
                    id?: number | undefined;
                    nickname?: string | undefined;
                    image?: string | undefined;
                } | null | undefined;
                _count?: {
                    comments: number;
                } | undefined;
                originURL?: string | undefined;
            }[];
        }>;
        follow: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                siteUrl: string;
                mySiteUrl: string;
            };
            output: {
                success: boolean;
                data?: any;
            };
        }>;
        followFrom: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                siteName: string;
                siteUrl: string;
                siteAvatar: string;
                mySiteAccountId: number;
            };
            output: {
                success: boolean;
                data?: any;
            };
        }>;
        unfollow: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                siteUrl: string;
                mySiteUrl: string;
            };
            output: boolean;
        }>;
        unfollowFrom: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                siteUrl: string;
                mySiteAccountId: number;
            };
            output: boolean;
        }>;
        followList: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                userId?: number | null | undefined;
            };
            output: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                accountId: number;
                siteUrl: string;
                followType: string;
                description?: string | undefined;
                siteName?: string | undefined;
                siteAvatar?: string | undefined;
            }[] | undefined;
        }>;
        followerList: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                userId?: number | null | undefined;
            };
            output: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                accountId: number;
                siteUrl: string;
                followType: string;
                description?: string | undefined;
                siteName?: string | undefined;
                siteAvatar?: string | undefined;
            }[] | undefined;
        }>;
        isFollowing: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                siteUrl: string;
            };
            output: {
                data: boolean;
                success: boolean;
            };
        }>;
    }>>;
    notifications: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        list: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                size?: number | undefined;
                page?: number | undefined;
            };
            output: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                type: string;
                content: string;
                accountId: number;
                title: string;
                isRead: boolean;
                metadata?: any;
            }[];
        }>;
        create: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                type: string;
                content: string;
                title: string;
                metadata?: any;
            };
            output: boolean;
        }>;
        markAsRead: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id?: number | undefined;
                all?: boolean | undefined;
            };
            output: boolean;
        }>;
        unreadCount: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: number;
        }>;
        delete: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: boolean;
        }>;
    }>>;
    plugin: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        getAllPlugins: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                name: string;
                url: string;
                version: string;
                author: string;
                minAppVersion: string;
                downloads: number;
                description?: any;
                displayName?: any;
                readme?: any;
            }[];
        }>;
        getPluginCssContents: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                pluginName: string;
            };
            output: {
                content: string;
                fileName: string;
            }[];
        }>;
        saveDevPlugin: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                code: string;
                fileName: string;
                metadata?: any;
            };
            output: any;
        }>;
        saveAdditionalDevFile: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                content: string;
                filePath: string;
            };
            output: any;
        }>;
        installPlugin: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                name: string;
                url: string;
                version: string;
                author: string;
                minAppVersion: string;
                description?: any;
                displayName?: any;
            };
            output: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                metadata: import("@prisma/client/runtime/library").JsonValue;
                path: string;
                isUse: boolean;
                isDev: boolean;
            };
        }>;
        getInstalledPlugins: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                path: string;
                isUse: boolean;
                isDev: boolean;
                metadata?: any;
            }[];
        }>;
        uninstallPlugin: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: {
                success: boolean;
            };
        }>;
    }>>;
    conversation: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        create: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                title?: string | undefined;
            };
            output: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                accountId: number;
                title: string;
            };
        }>;
        clearMessages: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: {
                success: boolean;
            };
        }>;
        list: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                size?: number | undefined;
                page?: number | undefined;
            };
            output: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                accountId: number;
                title: string;
            }[];
        }>;
        detail: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                id: number;
            };
            output: ({
                messages: {
                    id: number;
                    role: string;
                    createdAt: Date;
                    updatedAt: Date;
                    content: string;
                    metadata: import("@prisma/client/runtime/library").JsonValue | null;
                    conversationId: number;
                }[];
            } & {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                accountId: number;
                title: string;
            }) | null;
        }>;
        update: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
                title?: string | undefined;
            };
            output: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                accountId: number;
                title: string;
            };
        }>;
        delete: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                accountId: number;
                title: string;
            };
        }>;
    }>>;
    message: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        create: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                role: "user" | "system" | "assistant";
                content: string;
                conversationId: number;
                metadata?: any;
            };
            output: {
                id: number;
                role: string;
                createdAt: Date;
                updatedAt: Date;
                content: string;
                metadata: import("@prisma/client/runtime/library").JsonValue | null;
                conversationId: number;
            };
        }>;
        list: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                conversationId: number;
                size?: number | undefined;
                page?: number | undefined;
            };
            output: {
                id: number;
                role: string;
                createdAt: Date;
                updatedAt: Date;
                content: string;
                metadata: import("@prisma/client/runtime/library").JsonValue | null;
                conversationId: number;
            }[];
        }>;
        update: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
                content: string;
            };
            output: {
                id: number;
                role: string;
                createdAt: Date;
                updatedAt: Date;
                content: string;
                metadata: import("@prisma/client/runtime/library").JsonValue | null;
                conversationId: number;
            };
        }>;
        delete: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: void;
        }>;
    }>>;
}>>;
export declare const adminCaller: import("@trpc/server/unstable-core-do-not-import").DecorateRouterRecord<import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
    ai: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
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
                    role: string;
                    content: string;
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
                    role: string;
                    content: string;
                }[];
                conversationId: number;
            };
            output: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                accountId: number;
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
    notes: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        list: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                orderBy?: "asc" | "desc" | undefined;
                type?: import("@shared/lib/types").NoteType | -1 | undefined;
                isArchived?: boolean | null | undefined;
                isRecycle?: boolean | undefined;
                isShare?: boolean | null | undefined;
                size?: number | undefined;
                tagId?: number | null | undefined;
                page?: number | undefined;
                searchText?: string | undefined;
                withoutTag?: boolean | undefined;
                withFile?: boolean | undefined;
                withLink?: boolean | undefined;
                isUseAiQuery?: boolean | undefined;
                startDate?: string | Date | null | undefined;
                endDate?: string | Date | null | undefined;
                hasTodo?: boolean | undefined;
            };
            output: {
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
                accountId: number | null;
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
                    size: string | number | import("@prisma/client/runtime/library").Decimal;
                    perfixPath?: any;
                    depth?: any;
                }[];
                tags: {
                    id: number;
                    tag: {
                        name: string;
                        id: number;
                        createdAt: Date;
                        updatedAt: Date;
                        icon: string;
                        parent: number;
                        sortOrder: number;
                    };
                    noteId: number;
                    tagId: number;
                }[];
                _count: {
                    comments: number;
                    histories: number;
                };
                shareEncryptedUrl?: string | null | undefined;
                shareExpiryDate?: Date | null | undefined;
                shareMaxView?: number | null | undefined;
                shareViewCount?: number | null | undefined;
                metadata?: any;
                canEdit?: boolean | undefined;
                referencedBy?: {
                    fromNoteId: number;
                    fromNote?: {
                        createdAt?: Date | undefined;
                        updatedAt?: Date | undefined;
                        content?: string | undefined;
                    } | undefined;
                }[] | undefined;
                references?: {
                    toNoteId: number;
                    toNote?: {
                        createdAt?: Date | undefined;
                        updatedAt?: Date | undefined;
                        content?: string | undefined;
                    } | undefined;
                }[] | undefined;
                owner?: {
                    name: string;
                    id: number;
                    nickname: string;
                    image: string;
                } | null | undefined;
                isSharedNote?: boolean | undefined;
                isInternalShared?: boolean | undefined;
            }[];
        }>;
        publicList: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                size?: number | undefined;
                page?: number | undefined;
                searchText?: string | undefined;
            };
            output: {
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
                accountId: number | null;
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
                    size: string | number | import("@prisma/client/runtime/library").Decimal;
                    perfixPath?: any;
                    depth?: any;
                }[];
                tags: {
                    id: number;
                    tag: {
                        name: string;
                        id: number;
                        createdAt: Date;
                        updatedAt: Date;
                        icon: string;
                        parent: number;
                        sortOrder: number;
                    };
                    noteId: number;
                    tagId: number;
                }[];
                _count: {
                    comments: number;
                };
                shareEncryptedUrl?: string | null | undefined;
                shareExpiryDate?: Date | null | undefined;
                shareMaxView?: number | null | undefined;
                shareViewCount?: number | null | undefined;
                metadata?: any;
                account?: {
                    name?: string | undefined;
                    id?: number | undefined;
                    nickname?: string | undefined;
                    image?: string | undefined;
                } | null | undefined;
            }[];
        }>;
        listByIds: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                ids: number[];
            };
            output: {
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
                accountId: number | null;
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
                    size: string | number | import("@prisma/client/runtime/library").Decimal;
                    perfixPath?: any;
                    depth?: any;
                }[];
                tags: {
                    id: number;
                    tag: {
                        name: string;
                        id: number;
                        createdAt: Date;
                        updatedAt: Date;
                        icon: string;
                        parent: number;
                        sortOrder: number;
                    };
                    noteId: number;
                    tagId: number;
                }[];
                _count: {
                    comments: number;
                    histories: number;
                };
                shareEncryptedUrl?: string | null | undefined;
                shareExpiryDate?: Date | null | undefined;
                shareMaxView?: number | null | undefined;
                shareViewCount?: number | null | undefined;
                metadata?: any;
                referencedBy?: {
                    fromNoteId: number;
                    fromNote?: {
                        createdAt?: Date | undefined;
                        updatedAt?: Date | undefined;
                        content?: string | undefined;
                    } | undefined;
                }[] | undefined;
                references?: {
                    toNoteId: number;
                    toNote?: {
                        createdAt?: Date | undefined;
                        updatedAt?: Date | undefined;
                        content?: string | undefined;
                    } | undefined;
                }[] | undefined;
            }[];
        }>;
        publicDetail: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                shareEncryptedUrl: string;
                password?: string | undefined;
            };
            output: {
                error: "expired" | null;
                data: {
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
                    accountId: number | null;
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
                        size: string | number | import("@prisma/client/runtime/library").Decimal;
                        perfixPath?: any;
                        depth?: any;
                    }[];
                    _count: {
                        comments: number;
                        histories: number;
                    };
                    shareEncryptedUrl?: string | null | undefined;
                    shareExpiryDate?: Date | null | undefined;
                    shareMaxView?: number | null | undefined;
                    shareViewCount?: number | null | undefined;
                    metadata?: any;
                    account?: {
                        name?: string | undefined;
                        id?: number | undefined;
                        nickname?: string | undefined;
                        image?: string | undefined;
                    } | null | undefined;
                    referencedBy?: {
                        fromNoteId: number;
                        fromNote?: {
                            createdAt?: Date | undefined;
                            updatedAt?: Date | undefined;
                            content?: string | undefined;
                        } | undefined;
                    }[] | undefined;
                    references?: {
                        toNoteId: number;
                        toNote?: {
                            createdAt?: Date | undefined;
                            updatedAt?: Date | undefined;
                            content?: string | undefined;
                        } | undefined;
                    }[] | undefined;
                } | null;
                hasPassword: boolean;
            };
        }>;
        detail: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: {
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
                accountId: number | null;
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
                    size: string | number | import("@prisma/client/runtime/library").Decimal;
                    perfixPath?: any;
                    depth?: any;
                }[];
                tags: {
                    id: number;
                    tag: {
                        name: string;
                        id: number;
                        createdAt: Date;
                        updatedAt: Date;
                        icon: string;
                        parent: number;
                        sortOrder: number;
                    };
                    noteId: number;
                    tagId: number;
                }[];
                _count: {
                    comments: number;
                    histories: number;
                };
                shareEncryptedUrl?: string | null | undefined;
                shareExpiryDate?: Date | null | undefined;
                shareMaxView?: number | null | undefined;
                shareViewCount?: number | null | undefined;
                metadata?: any;
                referencedBy?: {
                    fromNoteId: number;
                    fromNote?: {
                        createdAt?: Date | undefined;
                        updatedAt?: Date | undefined;
                        content?: string | undefined;
                    } | undefined;
                }[] | undefined;
                references?: {
                    toNoteId: number;
                    toNote?: {
                        createdAt?: Date | undefined;
                        updatedAt?: Date | undefined;
                        content?: string | undefined;
                    } | undefined;
                }[] | undefined;
            } | null;
        }>;
        dailyReviewNoteList: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
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
                accountId: number | null;
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
                    size: string | number | import("@prisma/client/runtime/library").Decimal;
                    perfixPath?: any;
                    depth?: any;
                }[];
                shareEncryptedUrl?: string | null | undefined;
                shareExpiryDate?: Date | null | undefined;
                shareMaxView?: number | null | undefined;
                shareViewCount?: number | null | undefined;
                metadata?: any;
            }[];
        }>;
        randomNoteList: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                limit?: number | undefined;
            };
            output: {
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
                accountId: number | null;
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
                    size: string | number | import("@prisma/client/runtime/library").Decimal;
                    perfixPath?: any;
                    depth?: any;
                }[];
                shareEncryptedUrl?: string | null | undefined;
                shareExpiryDate?: Date | null | undefined;
                shareMaxView?: number | null | undefined;
                shareViewCount?: number | null | undefined;
                metadata?: any;
            }[];
        }>;
        relatedNotes: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                id: number;
            };
            output: {
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
                accountId: number | null;
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
                    size: string | number | import("@prisma/client/runtime/library").Decimal;
                    perfixPath?: any;
                    depth?: any;
                }[];
                tags: {
                    id: number;
                    tag: {
                        name: string;
                        id: number;
                        createdAt: Date;
                        updatedAt: Date;
                        icon: string;
                        parent: number;
                        sortOrder: number;
                    };
                    noteId: number;
                    tagId: number;
                }[];
                _count: {
                    comments: number;
                    histories: number;
                };
                shareEncryptedUrl?: string | null | undefined;
                shareExpiryDate?: Date | null | undefined;
                shareMaxView?: number | null | undefined;
                shareViewCount?: number | null | undefined;
                metadata?: any;
                referencedBy?: {
                    fromNoteId: number;
                    fromNote?: {
                        createdAt?: Date | undefined;
                        updatedAt?: Date | undefined;
                        content?: string | undefined;
                    } | undefined;
                }[] | undefined;
                references?: {
                    toNoteId: number;
                    toNote?: {
                        createdAt?: Date | undefined;
                        updatedAt?: Date | undefined;
                        content?: string | undefined;
                    } | undefined;
                }[] | undefined;
            }[];
        }>;
        reviewNote: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: {
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
                accountId: number | null;
                shareEncryptedUrl?: string | null | undefined;
                shareExpiryDate?: Date | null | undefined;
                shareMaxView?: number | null | undefined;
                shareViewCount?: number | null | undefined;
                metadata?: any;
            } | null;
        }>;
        upsert: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id?: number | undefined;
                createdAt?: Date | undefined;
                updatedAt?: Date | undefined;
                type?: import("@shared/lib/types").NoteType | -1 | undefined;
                content?: string | null | undefined;
                isArchived?: boolean | null | undefined;
                isRecycle?: boolean | null | undefined;
                isShare?: boolean | null | undefined;
                isTop?: boolean | null | undefined;
                metadata?: any;
                attachments?: {
                    name: string;
                    type: string;
                    path: string;
                    size: string | number;
                }[] | undefined;
                references?: number[] | undefined;
            };
            output: any;
        }>;
        shareNote: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
                password?: string | undefined;
                isCancel?: boolean | undefined;
                expireAt?: Date | undefined;
            };
            output: {
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
                accountId: number | null;
                shareEncryptedUrl?: string | null | undefined;
                shareExpiryDate?: Date | null | undefined;
                shareMaxView?: number | null | undefined;
                shareViewCount?: number | null | undefined;
                metadata?: any;
            };
        }>;
        updateMany: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                ids: number[];
                type?: import("@shared/lib/types").NoteType | -1 | undefined;
                isArchived?: boolean | null | undefined;
                isRecycle?: boolean | null | undefined;
            };
            output: any;
        }>;
        trashMany: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                ids: number[];
            };
            output: any;
        }>;
        deleteMany: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                ids: number[];
            };
            output: any;
        }>;
        addReference: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                fromNoteId: number;
                toNoteId: number;
            };
            output: any;
        }>;
        noteReferenceList: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                noteId: number;
                type?: "referencedBy" | "references" | undefined;
            };
            output: {
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
                accountId: number | null;
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
                    size: string | number | import("@prisma/client/runtime/library").Decimal;
                    perfixPath?: any;
                    depth?: any;
                }[];
                referenceCreatedAt: Date;
                shareEncryptedUrl?: string | null | undefined;
                shareExpiryDate?: Date | null | undefined;
                shareMaxView?: number | null | undefined;
                shareViewCount?: number | null | undefined;
                metadata?: any;
            }[];
        }>;
        clearRecycleBin: import("@trpc/server").TRPCMutationProcedure<{
            input: void;
            output: any;
        }>;
        updateAttachmentsOrder: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                attachments: {
                    name: string;
                    sortOrder: number;
                }[];
            };
            output: any;
        }>;
        getNoteHistory: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                noteId: number;
            };
            output: {
                id: number;
                createdAt: Date;
                content: string;
                accountId: number | null;
                noteId: number;
                version?: number | undefined;
            }[];
        }>;
        getNoteVersion: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                noteId: number;
                version?: number | undefined;
            };
            output: {
                createdAt: Date;
                content: string;
                version: number;
                metadata?: any;
            };
        }>;
        internalShareNote: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
                accountIds: number[];
                isCancel?: boolean | undefined;
            };
            output: {
                success: boolean;
                message?: string | undefined;
            };
        }>;
        getInternalSharedUsers: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: {
                name: string;
                id: number;
                nickname: string;
                image: string;
                loginType: string;
                canEdit: boolean;
            }[];
        }>;
        internalSharedWithMe: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                orderBy?: "asc" | "desc" | undefined;
                size?: number | undefined;
                page?: number | undefined;
            };
            output: {
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
                accountId: number | null;
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
                    size: string | number | import("@prisma/client/runtime/library").Decimal;
                    perfixPath?: any;
                    depth?: any;
                }[];
                canEdit: boolean;
                tags: {
                    id: number;
                    tag: {
                        name: string;
                        id: number;
                        createdAt: Date;
                        updatedAt: Date;
                        icon: string;
                        parent: number;
                        sortOrder: number;
                    };
                    noteId: number;
                    tagId: number;
                }[];
                _count: {
                    comments: number;
                    histories: number;
                };
                owner: {
                    name: string;
                    id: number;
                    nickname: string;
                    image: string;
                } | null;
                shareEncryptedUrl?: string | null | undefined;
                shareExpiryDate?: Date | null | undefined;
                shareMaxView?: number | null | undefined;
                shareViewCount?: number | null | undefined;
                metadata?: any;
            }[];
        }>;
    }>>;
    tags: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        list: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                name: string;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                icon: string;
                parent: number;
                sortOrder: number;
            }[];
        }>;
        fullTagNameById: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                id: number;
            };
            output: string;
        }>;
        updateTagMany: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                tag: string;
                ids: number[];
            };
            output: boolean;
        }>;
        updateTagName: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
                oldName: string;
                newName: string;
            };
            output: boolean;
        }>;
        updateTagIcon: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
                icon: string;
            };
            output: {
                name: string;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                icon: string;
                parent: number;
                sortOrder: number;
            };
        }>;
        deleteOnlyTag: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: boolean;
        }>;
        deleteTagWithAllNote: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: boolean;
        }>;
        updateTagOrder: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
                sortOrder: number;
            };
            output: {
                name: string;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                accountId: number | null;
                icon: string;
                parent: number;
                sortOrder: number;
            };
        }>;
    }>>;
    users: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        list: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                name: string;
                id: number;
                nickname: string;
                password: string;
                image: string;
                apiToken: string;
                note: number;
                role: string;
                createdAt: Date;
                updatedAt: Date;
                description?: string | undefined;
                loginType?: string | undefined;
                linkAccountId?: number | null | undefined;
            }[];
        }>;
        publicUserList: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                name: string;
                id: number;
                nickname: string;
                image: string | null;
                description: string | null;
                role: string;
                loginType: string;
                linkAccountId: number | null;
                createdAt: Date;
                updatedAt: Date;
            }[];
        }>;
        nativeAccountList: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                name: string;
                id: number;
                nickname: string;
            }[];
        }>;
        linkAccount: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
                originalPassword: string;
            };
            output: boolean;
        }>;
        unlinkAccount: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: boolean;
        }>;
        detail: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                id?: number | undefined;
            };
            output: {
                name: string;
                id: number;
                image: string | null;
                role: string;
                loginType: string;
                nickName: string;
                token: string;
                isLinked: boolean;
            };
        }>;
        canRegister: import("@trpc/server").TRPCMutationProcedure<{
            input: void;
            output: boolean;
        }>;
        register: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                name: string;
                password: string;
            };
            output: any;
        }>;
        regenToken: import("@trpc/server").TRPCMutationProcedure<{
            input: void;
            output: boolean;
        }>;
        genLowPermToken: import("@trpc/server").TRPCMutationProcedure<{
            input: void;
            output: {
                token: string;
            };
        }>;
        upsertUser: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                name?: string | undefined;
                id?: number | undefined;
                nickname?: string | undefined;
                password?: string | undefined;
                image?: string | undefined;
                originalPassword?: string | undefined;
            };
            output: any;
        }>;
        upsertUserByAdmin: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                name?: string | undefined;
                id?: number | undefined;
                nickname?: string | undefined;
                password?: string | undefined;
            };
            output: any;
        }>;
        generate2FASecret: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                name: string;
            };
            output: {
                secret: string;
                qrCode: string;
            };
        }>;
        verify2FAToken: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                token: string;
                secret: string;
            };
            output: boolean;
        }>;
        deleteUser: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: boolean;
        }>;
        login: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                name: string;
                password: string;
            };
            output: {
                name: string;
                id: number;
                nickname: string;
                image: string | null;
                role: string;
                loginType: string;
                token: string;
            };
        }>;
    }>>;
    attachments: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        list: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                size?: number | undefined;
                page?: number | undefined;
                searchText?: string | undefined;
                folder?: string | undefined;
            };
            output: import("./attachment").AttachmentResult[];
        }>;
        rename: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                newName: string;
                id?: number | undefined;
                isFolder?: boolean | undefined;
                oldFolderPath?: string | undefined;
            };
            output: {
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
            } | {
                success: boolean;
            };
        }>;
        move: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                sourceIds: number[];
                targetFolder: string;
            };
            output: {
                success: boolean;
                message: string;
            };
        }>;
        delete: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id?: number | null | undefined;
                isFolder?: boolean | undefined;
                folderPath?: string | undefined;
            };
            output: {
                success: boolean;
                message: string;
            };
        }>;
        deleteMany: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                ids: number[];
            };
            output: {
                success: boolean;
                message: string;
            };
        }>;
    }>>;
    config: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        list: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                isAutoArchived?: boolean | undefined;
                autoArchivedDays?: number | undefined;
                isUseAI?: boolean | undefined;
                aiModelProvider?: any;
                aiApiKey?: any;
                aiApiEndpoint?: any;
                aiApiVersion?: any;
                aiModel?: any;
                isHiddenMobileBar?: boolean | undefined;
                toolbarVisibility?: any;
                isAllowRegister?: any;
                isCloseBackgroundAnimation?: boolean | undefined;
                customBackgroundUrl?: any;
                isOrderByCreateTime?: any;
                timeFormat?: any;
                smallDeviceCardColumns?: any;
                mediumDeviceCardColumns?: any;
                largeDeviceCardColumns?: any;
                textFoldLength?: number | undefined;
                objectStorage?: any;
                s3AccessKeyId?: any;
                s3AccessKeySecret?: any;
                s3Endpoint?: any;
                s3Bucket?: any;
                s3CustomPath?: any;
                s3Region?: any;
                localCustomPath?: any;
                embeddingModel?: any;
                embeddingDimensions?: number | undefined;
                embeddingTopK?: number | undefined;
                embeddingLambda?: number | undefined;
                embeddingScore?: number | undefined;
                excludeEmbeddingTagId?: number | undefined;
                language?: any;
                theme?: any;
                themeColor?: any;
                themeForegroundColor?: any;
                webhookEndpoint?: any;
                twoFactorEnabled?: boolean | undefined;
                twoFactorSecret?: string | undefined;
                spotifyConsumerKey?: string | undefined;
                spotifyConsumerSecret?: string | undefined;
                isCloseDailyReview?: boolean | undefined;
                maxHomePageWidth?: number | undefined;
                oauth2Providers?: {
                    name: string;
                    id: string;
                    tokenUrl: string;
                    userinfoUrl: string;
                    clientId: string;
                    clientSecret: string;
                    icon?: string | undefined;
                    wellKnown?: string | undefined;
                    scope?: string | undefined;
                    authorizationUrl?: string | undefined;
                }[] | undefined;
                isUseBlinkoHub?: boolean | undefined;
                embeddingApiEndpoint?: string | undefined;
                embeddingApiKey?: string | undefined;
                isHiddenNotification?: boolean | undefined;
                tavilyApiKey?: any;
                tavilyMaxResult?: any;
                isHideBlogImages?: boolean | undefined;
                isUseAiPostProcessing?: boolean | undefined;
                aiCommentPrompt?: string | undefined;
                aiTagsPrompt?: string | undefined;
                aiPostProcessingMode?: string | undefined;
                isUseHttpProxy?: boolean | undefined;
                httpProxyHost?: string | undefined;
                httpProxyPort?: number | undefined;
                httpProxyUsername?: string | undefined;
                httpProxyPassword?: string | undefined;
                aiSmartEditPrompt?: string | undefined;
                rerankModel?: string | undefined;
                rerankTopK?: number | undefined;
                rerankScore?: number | undefined;
                rerankUseEembbingEndpoint?: boolean | undefined;
            };
        }>;
        update: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                key?: any;
                value?: any;
            };
            output: {
                id: number;
                key: string;
                config?: any;
            };
        }>;
        setPluginConfig: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                key: string;
                pluginName: string;
                value?: any;
            };
            output: any;
        }>;
        getPluginConfig: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                pluginName: string;
            };
            output: any;
        }>;
    }>>;
    public: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        version: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: string;
        }>;
        oauthProviders: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                name: string;
                id: string;
                icon?: string | undefined;
            }[];
        }>;
        latestVersion: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: string;
        }>;
        linkPreview: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                url: string;
            };
            output: {
                description: string;
                title: string;
                favicon: string;
            } | null;
        }>;
        testWebhook: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                data?: any;
                webhookType?: string | undefined;
            };
            output: {
                success: boolean;
                data?: any;
            };
        }>;
        musicMetadata: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                filePath: string;
            };
            output: {
                coverUrl?: string | undefined;
                trackName?: string | undefined;
                albumName?: string | undefined;
                artists?: string[] | undefined;
            };
        }>;
        siteInfo: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                id?: number | null | undefined;
            } | undefined;
            output: {
                id: number;
                name?: string | undefined;
                image?: string | undefined;
                description?: string | undefined;
                role?: string | undefined;
            };
        }>;
        hubList: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                name: string;
                id: string;
                image: string;
                description: string;
            }[];
        }>;
        hubSiteList: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                search?: string | undefined;
                refresh?: boolean | undefined;
            };
            output: {
                title: string;
                url: string;
                image?: string | null | undefined;
                tags?: string[] | undefined;
                version?: string | undefined;
                site_description?: string | null | undefined;
            }[];
        }>;
        testHttpProxy: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                url?: string | undefined;
            };
            output: {
                message: string;
                success: boolean;
                responseTime: number;
                error?: string | undefined;
                statusCode?: number | undefined;
                errorCode?: string | undefined;
                errorDetails?: any;
            };
        }>;
    }>>;
    task: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        list: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                name: string;
                schedule: string;
                lastRun: Date;
                isSuccess: boolean;
                isRunning: boolean;
                output?: any;
            }[];
        }>;
        upsertTask: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                type: "update" | "stop" | "start";
                task: "Auto Archive Blinko" | "Backup Database";
                time?: string | undefined;
            };
            output: any;
        }>;
        importFromBlinko: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                filePath: string;
            };
            output: AsyncGenerator<import("@shared/lib/types").RestoreResult & {
                progress: {
                    current: number;
                    total: number;
                };
            }, void, unknown>;
        }>;
        importFromMemos: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                filePath: string;
            };
            output: AsyncGenerator<import("@shared/lib/types").ProgressResult & {
                progress?: {
                    current: number;
                    total: number;
                };
            }, void, unknown>;
        }>;
        exportMarkdown: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                format: "json" | "markdown" | "csv";
                baseURL: string;
                startDate?: Date | undefined;
                endDate?: Date | undefined;
            };
            output: {
                success: boolean;
                error?: string | undefined;
                downloadUrl?: string | undefined;
                fileCount?: number | undefined;
            };
        }>;
    }>>;
    analytics: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        dailyNoteCount: import("@trpc/server").TRPCMutationProcedure<{
            input: void;
            output: {
                date: string;
                count: number;
            }[];
        }>;
        monthlyStats: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                month: string;
            };
            output: {
                noteCount: number;
                totalWords: number;
                maxDailyWords: number;
                activeDays: number;
                tagStats?: {
                    count: number;
                    tagName: string;
                }[] | undefined;
            };
        }>;
    }>>;
    comments: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        create: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                content: string;
                noteId: number;
                guestName?: string | undefined;
                parentId?: number | undefined;
            };
            output: boolean;
        }>;
        list: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                noteId: number;
                orderBy?: "asc" | "desc" | undefined;
                size?: number | undefined;
                page?: number | undefined;
            };
            output: {
                total: number;
                items: any[];
            };
        }>;
        delete: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: {
                success: boolean;
            };
        }>;
        update: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
                content: string;
            };
            output: any;
        }>;
    }>>;
    follows: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        recommandList: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                searchText?: string | undefined;
            } | undefined;
            output: {
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
                accountId: number | null;
                shareEncryptedUrl?: string | null | undefined;
                shareExpiryDate?: Date | null | undefined;
                shareMaxView?: number | null | undefined;
                shareViewCount?: number | null | undefined;
                metadata?: any;
                attachments?: {
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
                    size: string | number | import("@prisma/client/runtime/library").Decimal;
                    perfixPath?: any;
                    depth?: any;
                }[] | undefined;
                tags?: ({
                    id: number;
                    tag: {
                        name: string;
                        id: number;
                        createdAt: Date;
                        updatedAt: Date;
                        icon: string;
                        parent: number;
                        sortOrder: number;
                    };
                    noteId: number;
                    tagId: number;
                } | undefined)[] | null | undefined;
                account?: {
                    name?: string | undefined;
                    id?: number | undefined;
                    nickname?: string | undefined;
                    image?: string | undefined;
                } | null | undefined;
                _count?: {
                    comments: number;
                } | undefined;
                originURL?: string | undefined;
            }[];
        }>;
        follow: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                siteUrl: string;
                mySiteUrl: string;
            };
            output: {
                success: boolean;
                data?: any;
            };
        }>;
        followFrom: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                siteName: string;
                siteUrl: string;
                siteAvatar: string;
                mySiteAccountId: number;
            };
            output: {
                success: boolean;
                data?: any;
            };
        }>;
        unfollow: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                siteUrl: string;
                mySiteUrl: string;
            };
            output: boolean;
        }>;
        unfollowFrom: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                siteUrl: string;
                mySiteAccountId: number;
            };
            output: boolean;
        }>;
        followList: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                userId?: number | null | undefined;
            };
            output: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                accountId: number;
                siteUrl: string;
                followType: string;
                description?: string | undefined;
                siteName?: string | undefined;
                siteAvatar?: string | undefined;
            }[] | undefined;
        }>;
        followerList: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                userId?: number | null | undefined;
            };
            output: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                accountId: number;
                siteUrl: string;
                followType: string;
                description?: string | undefined;
                siteName?: string | undefined;
                siteAvatar?: string | undefined;
            }[] | undefined;
        }>;
        isFollowing: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                siteUrl: string;
            };
            output: {
                data: boolean;
                success: boolean;
            };
        }>;
    }>>;
    notifications: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        list: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                size?: number | undefined;
                page?: number | undefined;
            };
            output: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                type: string;
                content: string;
                accountId: number;
                title: string;
                isRead: boolean;
                metadata?: any;
            }[];
        }>;
        create: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                type: string;
                content: string;
                title: string;
                metadata?: any;
            };
            output: boolean;
        }>;
        markAsRead: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id?: number | undefined;
                all?: boolean | undefined;
            };
            output: boolean;
        }>;
        unreadCount: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: number;
        }>;
        delete: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: boolean;
        }>;
    }>>;
    plugin: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        getAllPlugins: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                name: string;
                url: string;
                version: string;
                author: string;
                minAppVersion: string;
                downloads: number;
                description?: any;
                displayName?: any;
                readme?: any;
            }[];
        }>;
        getPluginCssContents: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                pluginName: string;
            };
            output: {
                content: string;
                fileName: string;
            }[];
        }>;
        saveDevPlugin: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                code: string;
                fileName: string;
                metadata?: any;
            };
            output: any;
        }>;
        saveAdditionalDevFile: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                content: string;
                filePath: string;
            };
            output: any;
        }>;
        installPlugin: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                name: string;
                url: string;
                version: string;
                author: string;
                minAppVersion: string;
                description?: any;
                displayName?: any;
            };
            output: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                metadata: import("@prisma/client/runtime/library").JsonValue;
                path: string;
                isUse: boolean;
                isDev: boolean;
            };
        }>;
        getInstalledPlugins: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                path: string;
                isUse: boolean;
                isDev: boolean;
                metadata?: any;
            }[];
        }>;
        uninstallPlugin: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: {
                success: boolean;
            };
        }>;
    }>>;
    conversation: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        create: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                title?: string | undefined;
            };
            output: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                accountId: number;
                title: string;
            };
        }>;
        clearMessages: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: {
                success: boolean;
            };
        }>;
        list: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                size?: number | undefined;
                page?: number | undefined;
            };
            output: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                accountId: number;
                title: string;
            }[];
        }>;
        detail: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                id: number;
            };
            output: ({
                messages: {
                    id: number;
                    role: string;
                    createdAt: Date;
                    updatedAt: Date;
                    content: string;
                    metadata: import("@prisma/client/runtime/library").JsonValue | null;
                    conversationId: number;
                }[];
            } & {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                accountId: number;
                title: string;
            }) | null;
        }>;
        update: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
                title?: string | undefined;
            };
            output: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                accountId: number;
                title: string;
            };
        }>;
        delete: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                accountId: number;
                title: string;
            };
        }>;
    }>>;
    message: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        create: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                role: "user" | "system" | "assistant";
                content: string;
                conversationId: number;
                metadata?: any;
            };
            output: {
                id: number;
                role: string;
                createdAt: Date;
                updatedAt: Date;
                content: string;
                metadata: import("@prisma/client/runtime/library").JsonValue | null;
                conversationId: number;
            };
        }>;
        list: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                conversationId: number;
                size?: number | undefined;
                page?: number | undefined;
            };
            output: {
                id: number;
                role: string;
                createdAt: Date;
                updatedAt: Date;
                content: string;
                metadata: import("@prisma/client/runtime/library").JsonValue | null;
                conversationId: number;
            }[];
        }>;
        update: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
                content: string;
            };
            output: {
                id: number;
                role: string;
                createdAt: Date;
                updatedAt: Date;
                content: string;
                metadata: import("@prisma/client/runtime/library").JsonValue | null;
                conversationId: number;
            };
        }>;
        delete: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: void;
        }>;
    }>>;
}>>;
export declare const userCaller: (ctx: Context) => import("@trpc/server/unstable-core-do-not-import").DecorateRouterRecord<import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
    ai: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
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
                    role: string;
                    content: string;
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
                    role: string;
                    content: string;
                }[];
                conversationId: number;
            };
            output: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                accountId: number;
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
    notes: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        list: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                orderBy?: "asc" | "desc" | undefined;
                type?: import("@shared/lib/types").NoteType | -1 | undefined;
                isArchived?: boolean | null | undefined;
                isRecycle?: boolean | undefined;
                isShare?: boolean | null | undefined;
                size?: number | undefined;
                tagId?: number | null | undefined;
                page?: number | undefined;
                searchText?: string | undefined;
                withoutTag?: boolean | undefined;
                withFile?: boolean | undefined;
                withLink?: boolean | undefined;
                isUseAiQuery?: boolean | undefined;
                startDate?: string | Date | null | undefined;
                endDate?: string | Date | null | undefined;
                hasTodo?: boolean | undefined;
            };
            output: {
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
                accountId: number | null;
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
                    size: string | number | import("@prisma/client/runtime/library").Decimal;
                    perfixPath?: any;
                    depth?: any;
                }[];
                tags: {
                    id: number;
                    tag: {
                        name: string;
                        id: number;
                        createdAt: Date;
                        updatedAt: Date;
                        icon: string;
                        parent: number;
                        sortOrder: number;
                    };
                    noteId: number;
                    tagId: number;
                }[];
                _count: {
                    comments: number;
                    histories: number;
                };
                shareEncryptedUrl?: string | null | undefined;
                shareExpiryDate?: Date | null | undefined;
                shareMaxView?: number | null | undefined;
                shareViewCount?: number | null | undefined;
                metadata?: any;
                canEdit?: boolean | undefined;
                referencedBy?: {
                    fromNoteId: number;
                    fromNote?: {
                        createdAt?: Date | undefined;
                        updatedAt?: Date | undefined;
                        content?: string | undefined;
                    } | undefined;
                }[] | undefined;
                references?: {
                    toNoteId: number;
                    toNote?: {
                        createdAt?: Date | undefined;
                        updatedAt?: Date | undefined;
                        content?: string | undefined;
                    } | undefined;
                }[] | undefined;
                owner?: {
                    name: string;
                    id: number;
                    nickname: string;
                    image: string;
                } | null | undefined;
                isSharedNote?: boolean | undefined;
                isInternalShared?: boolean | undefined;
            }[];
        }>;
        publicList: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                size?: number | undefined;
                page?: number | undefined;
                searchText?: string | undefined;
            };
            output: {
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
                accountId: number | null;
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
                    size: string | number | import("@prisma/client/runtime/library").Decimal;
                    perfixPath?: any;
                    depth?: any;
                }[];
                tags: {
                    id: number;
                    tag: {
                        name: string;
                        id: number;
                        createdAt: Date;
                        updatedAt: Date;
                        icon: string;
                        parent: number;
                        sortOrder: number;
                    };
                    noteId: number;
                    tagId: number;
                }[];
                _count: {
                    comments: number;
                };
                shareEncryptedUrl?: string | null | undefined;
                shareExpiryDate?: Date | null | undefined;
                shareMaxView?: number | null | undefined;
                shareViewCount?: number | null | undefined;
                metadata?: any;
                account?: {
                    name?: string | undefined;
                    id?: number | undefined;
                    nickname?: string | undefined;
                    image?: string | undefined;
                } | null | undefined;
            }[];
        }>;
        listByIds: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                ids: number[];
            };
            output: {
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
                accountId: number | null;
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
                    size: string | number | import("@prisma/client/runtime/library").Decimal;
                    perfixPath?: any;
                    depth?: any;
                }[];
                tags: {
                    id: number;
                    tag: {
                        name: string;
                        id: number;
                        createdAt: Date;
                        updatedAt: Date;
                        icon: string;
                        parent: number;
                        sortOrder: number;
                    };
                    noteId: number;
                    tagId: number;
                }[];
                _count: {
                    comments: number;
                    histories: number;
                };
                shareEncryptedUrl?: string | null | undefined;
                shareExpiryDate?: Date | null | undefined;
                shareMaxView?: number | null | undefined;
                shareViewCount?: number | null | undefined;
                metadata?: any;
                referencedBy?: {
                    fromNoteId: number;
                    fromNote?: {
                        createdAt?: Date | undefined;
                        updatedAt?: Date | undefined;
                        content?: string | undefined;
                    } | undefined;
                }[] | undefined;
                references?: {
                    toNoteId: number;
                    toNote?: {
                        createdAt?: Date | undefined;
                        updatedAt?: Date | undefined;
                        content?: string | undefined;
                    } | undefined;
                }[] | undefined;
            }[];
        }>;
        publicDetail: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                shareEncryptedUrl: string;
                password?: string | undefined;
            };
            output: {
                error: "expired" | null;
                data: {
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
                    accountId: number | null;
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
                        size: string | number | import("@prisma/client/runtime/library").Decimal;
                        perfixPath?: any;
                        depth?: any;
                    }[];
                    _count: {
                        comments: number;
                        histories: number;
                    };
                    shareEncryptedUrl?: string | null | undefined;
                    shareExpiryDate?: Date | null | undefined;
                    shareMaxView?: number | null | undefined;
                    shareViewCount?: number | null | undefined;
                    metadata?: any;
                    account?: {
                        name?: string | undefined;
                        id?: number | undefined;
                        nickname?: string | undefined;
                        image?: string | undefined;
                    } | null | undefined;
                    referencedBy?: {
                        fromNoteId: number;
                        fromNote?: {
                            createdAt?: Date | undefined;
                            updatedAt?: Date | undefined;
                            content?: string | undefined;
                        } | undefined;
                    }[] | undefined;
                    references?: {
                        toNoteId: number;
                        toNote?: {
                            createdAt?: Date | undefined;
                            updatedAt?: Date | undefined;
                            content?: string | undefined;
                        } | undefined;
                    }[] | undefined;
                } | null;
                hasPassword: boolean;
            };
        }>;
        detail: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: {
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
                accountId: number | null;
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
                    size: string | number | import("@prisma/client/runtime/library").Decimal;
                    perfixPath?: any;
                    depth?: any;
                }[];
                tags: {
                    id: number;
                    tag: {
                        name: string;
                        id: number;
                        createdAt: Date;
                        updatedAt: Date;
                        icon: string;
                        parent: number;
                        sortOrder: number;
                    };
                    noteId: number;
                    tagId: number;
                }[];
                _count: {
                    comments: number;
                    histories: number;
                };
                shareEncryptedUrl?: string | null | undefined;
                shareExpiryDate?: Date | null | undefined;
                shareMaxView?: number | null | undefined;
                shareViewCount?: number | null | undefined;
                metadata?: any;
                referencedBy?: {
                    fromNoteId: number;
                    fromNote?: {
                        createdAt?: Date | undefined;
                        updatedAt?: Date | undefined;
                        content?: string | undefined;
                    } | undefined;
                }[] | undefined;
                references?: {
                    toNoteId: number;
                    toNote?: {
                        createdAt?: Date | undefined;
                        updatedAt?: Date | undefined;
                        content?: string | undefined;
                    } | undefined;
                }[] | undefined;
            } | null;
        }>;
        dailyReviewNoteList: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
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
                accountId: number | null;
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
                    size: string | number | import("@prisma/client/runtime/library").Decimal;
                    perfixPath?: any;
                    depth?: any;
                }[];
                shareEncryptedUrl?: string | null | undefined;
                shareExpiryDate?: Date | null | undefined;
                shareMaxView?: number | null | undefined;
                shareViewCount?: number | null | undefined;
                metadata?: any;
            }[];
        }>;
        randomNoteList: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                limit?: number | undefined;
            };
            output: {
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
                accountId: number | null;
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
                    size: string | number | import("@prisma/client/runtime/library").Decimal;
                    perfixPath?: any;
                    depth?: any;
                }[];
                shareEncryptedUrl?: string | null | undefined;
                shareExpiryDate?: Date | null | undefined;
                shareMaxView?: number | null | undefined;
                shareViewCount?: number | null | undefined;
                metadata?: any;
            }[];
        }>;
        relatedNotes: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                id: number;
            };
            output: {
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
                accountId: number | null;
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
                    size: string | number | import("@prisma/client/runtime/library").Decimal;
                    perfixPath?: any;
                    depth?: any;
                }[];
                tags: {
                    id: number;
                    tag: {
                        name: string;
                        id: number;
                        createdAt: Date;
                        updatedAt: Date;
                        icon: string;
                        parent: number;
                        sortOrder: number;
                    };
                    noteId: number;
                    tagId: number;
                }[];
                _count: {
                    comments: number;
                    histories: number;
                };
                shareEncryptedUrl?: string | null | undefined;
                shareExpiryDate?: Date | null | undefined;
                shareMaxView?: number | null | undefined;
                shareViewCount?: number | null | undefined;
                metadata?: any;
                referencedBy?: {
                    fromNoteId: number;
                    fromNote?: {
                        createdAt?: Date | undefined;
                        updatedAt?: Date | undefined;
                        content?: string | undefined;
                    } | undefined;
                }[] | undefined;
                references?: {
                    toNoteId: number;
                    toNote?: {
                        createdAt?: Date | undefined;
                        updatedAt?: Date | undefined;
                        content?: string | undefined;
                    } | undefined;
                }[] | undefined;
            }[];
        }>;
        reviewNote: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: {
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
                accountId: number | null;
                shareEncryptedUrl?: string | null | undefined;
                shareExpiryDate?: Date | null | undefined;
                shareMaxView?: number | null | undefined;
                shareViewCount?: number | null | undefined;
                metadata?: any;
            } | null;
        }>;
        upsert: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id?: number | undefined;
                createdAt?: Date | undefined;
                updatedAt?: Date | undefined;
                type?: import("@shared/lib/types").NoteType | -1 | undefined;
                content?: string | null | undefined;
                isArchived?: boolean | null | undefined;
                isRecycle?: boolean | null | undefined;
                isShare?: boolean | null | undefined;
                isTop?: boolean | null | undefined;
                metadata?: any;
                attachments?: {
                    name: string;
                    type: string;
                    path: string;
                    size: string | number;
                }[] | undefined;
                references?: number[] | undefined;
            };
            output: any;
        }>;
        shareNote: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
                password?: string | undefined;
                isCancel?: boolean | undefined;
                expireAt?: Date | undefined;
            };
            output: {
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
                accountId: number | null;
                shareEncryptedUrl?: string | null | undefined;
                shareExpiryDate?: Date | null | undefined;
                shareMaxView?: number | null | undefined;
                shareViewCount?: number | null | undefined;
                metadata?: any;
            };
        }>;
        updateMany: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                ids: number[];
                type?: import("@shared/lib/types").NoteType | -1 | undefined;
                isArchived?: boolean | null | undefined;
                isRecycle?: boolean | null | undefined;
            };
            output: any;
        }>;
        trashMany: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                ids: number[];
            };
            output: any;
        }>;
        deleteMany: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                ids: number[];
            };
            output: any;
        }>;
        addReference: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                fromNoteId: number;
                toNoteId: number;
            };
            output: any;
        }>;
        noteReferenceList: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                noteId: number;
                type?: "referencedBy" | "references" | undefined;
            };
            output: {
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
                accountId: number | null;
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
                    size: string | number | import("@prisma/client/runtime/library").Decimal;
                    perfixPath?: any;
                    depth?: any;
                }[];
                referenceCreatedAt: Date;
                shareEncryptedUrl?: string | null | undefined;
                shareExpiryDate?: Date | null | undefined;
                shareMaxView?: number | null | undefined;
                shareViewCount?: number | null | undefined;
                metadata?: any;
            }[];
        }>;
        clearRecycleBin: import("@trpc/server").TRPCMutationProcedure<{
            input: void;
            output: any;
        }>;
        updateAttachmentsOrder: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                attachments: {
                    name: string;
                    sortOrder: number;
                }[];
            };
            output: any;
        }>;
        getNoteHistory: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                noteId: number;
            };
            output: {
                id: number;
                createdAt: Date;
                content: string;
                accountId: number | null;
                noteId: number;
                version?: number | undefined;
            }[];
        }>;
        getNoteVersion: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                noteId: number;
                version?: number | undefined;
            };
            output: {
                createdAt: Date;
                content: string;
                version: number;
                metadata?: any;
            };
        }>;
        internalShareNote: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
                accountIds: number[];
                isCancel?: boolean | undefined;
            };
            output: {
                success: boolean;
                message?: string | undefined;
            };
        }>;
        getInternalSharedUsers: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: {
                name: string;
                id: number;
                nickname: string;
                image: string;
                loginType: string;
                canEdit: boolean;
            }[];
        }>;
        internalSharedWithMe: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                orderBy?: "asc" | "desc" | undefined;
                size?: number | undefined;
                page?: number | undefined;
            };
            output: {
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
                accountId: number | null;
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
                    size: string | number | import("@prisma/client/runtime/library").Decimal;
                    perfixPath?: any;
                    depth?: any;
                }[];
                canEdit: boolean;
                tags: {
                    id: number;
                    tag: {
                        name: string;
                        id: number;
                        createdAt: Date;
                        updatedAt: Date;
                        icon: string;
                        parent: number;
                        sortOrder: number;
                    };
                    noteId: number;
                    tagId: number;
                }[];
                _count: {
                    comments: number;
                    histories: number;
                };
                owner: {
                    name: string;
                    id: number;
                    nickname: string;
                    image: string;
                } | null;
                shareEncryptedUrl?: string | null | undefined;
                shareExpiryDate?: Date | null | undefined;
                shareMaxView?: number | null | undefined;
                shareViewCount?: number | null | undefined;
                metadata?: any;
            }[];
        }>;
    }>>;
    tags: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        list: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                name: string;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                icon: string;
                parent: number;
                sortOrder: number;
            }[];
        }>;
        fullTagNameById: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                id: number;
            };
            output: string;
        }>;
        updateTagMany: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                tag: string;
                ids: number[];
            };
            output: boolean;
        }>;
        updateTagName: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
                oldName: string;
                newName: string;
            };
            output: boolean;
        }>;
        updateTagIcon: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
                icon: string;
            };
            output: {
                name: string;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                icon: string;
                parent: number;
                sortOrder: number;
            };
        }>;
        deleteOnlyTag: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: boolean;
        }>;
        deleteTagWithAllNote: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: boolean;
        }>;
        updateTagOrder: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
                sortOrder: number;
            };
            output: {
                name: string;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                accountId: number | null;
                icon: string;
                parent: number;
                sortOrder: number;
            };
        }>;
    }>>;
    users: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        list: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                name: string;
                id: number;
                nickname: string;
                password: string;
                image: string;
                apiToken: string;
                note: number;
                role: string;
                createdAt: Date;
                updatedAt: Date;
                description?: string | undefined;
                loginType?: string | undefined;
                linkAccountId?: number | null | undefined;
            }[];
        }>;
        publicUserList: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                name: string;
                id: number;
                nickname: string;
                image: string | null;
                description: string | null;
                role: string;
                loginType: string;
                linkAccountId: number | null;
                createdAt: Date;
                updatedAt: Date;
            }[];
        }>;
        nativeAccountList: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                name: string;
                id: number;
                nickname: string;
            }[];
        }>;
        linkAccount: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
                originalPassword: string;
            };
            output: boolean;
        }>;
        unlinkAccount: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: boolean;
        }>;
        detail: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                id?: number | undefined;
            };
            output: {
                name: string;
                id: number;
                image: string | null;
                role: string;
                loginType: string;
                nickName: string;
                token: string;
                isLinked: boolean;
            };
        }>;
        canRegister: import("@trpc/server").TRPCMutationProcedure<{
            input: void;
            output: boolean;
        }>;
        register: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                name: string;
                password: string;
            };
            output: any;
        }>;
        regenToken: import("@trpc/server").TRPCMutationProcedure<{
            input: void;
            output: boolean;
        }>;
        genLowPermToken: import("@trpc/server").TRPCMutationProcedure<{
            input: void;
            output: {
                token: string;
            };
        }>;
        upsertUser: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                name?: string | undefined;
                id?: number | undefined;
                nickname?: string | undefined;
                password?: string | undefined;
                image?: string | undefined;
                originalPassword?: string | undefined;
            };
            output: any;
        }>;
        upsertUserByAdmin: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                name?: string | undefined;
                id?: number | undefined;
                nickname?: string | undefined;
                password?: string | undefined;
            };
            output: any;
        }>;
        generate2FASecret: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                name: string;
            };
            output: {
                secret: string;
                qrCode: string;
            };
        }>;
        verify2FAToken: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                token: string;
                secret: string;
            };
            output: boolean;
        }>;
        deleteUser: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: boolean;
        }>;
        login: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                name: string;
                password: string;
            };
            output: {
                name: string;
                id: number;
                nickname: string;
                image: string | null;
                role: string;
                loginType: string;
                token: string;
            };
        }>;
    }>>;
    attachments: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        list: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                size?: number | undefined;
                page?: number | undefined;
                searchText?: string | undefined;
                folder?: string | undefined;
            };
            output: import("./attachment").AttachmentResult[];
        }>;
        rename: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                newName: string;
                id?: number | undefined;
                isFolder?: boolean | undefined;
                oldFolderPath?: string | undefined;
            };
            output: {
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
            } | {
                success: boolean;
            };
        }>;
        move: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                sourceIds: number[];
                targetFolder: string;
            };
            output: {
                success: boolean;
                message: string;
            };
        }>;
        delete: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id?: number | null | undefined;
                isFolder?: boolean | undefined;
                folderPath?: string | undefined;
            };
            output: {
                success: boolean;
                message: string;
            };
        }>;
        deleteMany: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                ids: number[];
            };
            output: {
                success: boolean;
                message: string;
            };
        }>;
    }>>;
    config: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        list: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                isAutoArchived?: boolean | undefined;
                autoArchivedDays?: number | undefined;
                isUseAI?: boolean | undefined;
                aiModelProvider?: any;
                aiApiKey?: any;
                aiApiEndpoint?: any;
                aiApiVersion?: any;
                aiModel?: any;
                isHiddenMobileBar?: boolean | undefined;
                toolbarVisibility?: any;
                isAllowRegister?: any;
                isCloseBackgroundAnimation?: boolean | undefined;
                customBackgroundUrl?: any;
                isOrderByCreateTime?: any;
                timeFormat?: any;
                smallDeviceCardColumns?: any;
                mediumDeviceCardColumns?: any;
                largeDeviceCardColumns?: any;
                textFoldLength?: number | undefined;
                objectStorage?: any;
                s3AccessKeyId?: any;
                s3AccessKeySecret?: any;
                s3Endpoint?: any;
                s3Bucket?: any;
                s3CustomPath?: any;
                s3Region?: any;
                localCustomPath?: any;
                embeddingModel?: any;
                embeddingDimensions?: number | undefined;
                embeddingTopK?: number | undefined;
                embeddingLambda?: number | undefined;
                embeddingScore?: number | undefined;
                excludeEmbeddingTagId?: number | undefined;
                language?: any;
                theme?: any;
                themeColor?: any;
                themeForegroundColor?: any;
                webhookEndpoint?: any;
                twoFactorEnabled?: boolean | undefined;
                twoFactorSecret?: string | undefined;
                spotifyConsumerKey?: string | undefined;
                spotifyConsumerSecret?: string | undefined;
                isCloseDailyReview?: boolean | undefined;
                maxHomePageWidth?: number | undefined;
                oauth2Providers?: {
                    name: string;
                    id: string;
                    tokenUrl: string;
                    userinfoUrl: string;
                    clientId: string;
                    clientSecret: string;
                    icon?: string | undefined;
                    wellKnown?: string | undefined;
                    scope?: string | undefined;
                    authorizationUrl?: string | undefined;
                }[] | undefined;
                isUseBlinkoHub?: boolean | undefined;
                embeddingApiEndpoint?: string | undefined;
                embeddingApiKey?: string | undefined;
                isHiddenNotification?: boolean | undefined;
                tavilyApiKey?: any;
                tavilyMaxResult?: any;
                isHideBlogImages?: boolean | undefined;
                isUseAiPostProcessing?: boolean | undefined;
                aiCommentPrompt?: string | undefined;
                aiTagsPrompt?: string | undefined;
                aiPostProcessingMode?: string | undefined;
                isUseHttpProxy?: boolean | undefined;
                httpProxyHost?: string | undefined;
                httpProxyPort?: number | undefined;
                httpProxyUsername?: string | undefined;
                httpProxyPassword?: string | undefined;
                aiSmartEditPrompt?: string | undefined;
                rerankModel?: string | undefined;
                rerankTopK?: number | undefined;
                rerankScore?: number | undefined;
                rerankUseEembbingEndpoint?: boolean | undefined;
            };
        }>;
        update: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                key?: any;
                value?: any;
            };
            output: {
                id: number;
                key: string;
                config?: any;
            };
        }>;
        setPluginConfig: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                key: string;
                pluginName: string;
                value?: any;
            };
            output: any;
        }>;
        getPluginConfig: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                pluginName: string;
            };
            output: any;
        }>;
    }>>;
    public: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        version: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: string;
        }>;
        oauthProviders: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                name: string;
                id: string;
                icon?: string | undefined;
            }[];
        }>;
        latestVersion: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: string;
        }>;
        linkPreview: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                url: string;
            };
            output: {
                description: string;
                title: string;
                favicon: string;
            } | null;
        }>;
        testWebhook: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                data?: any;
                webhookType?: string | undefined;
            };
            output: {
                success: boolean;
                data?: any;
            };
        }>;
        musicMetadata: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                filePath: string;
            };
            output: {
                coverUrl?: string | undefined;
                trackName?: string | undefined;
                albumName?: string | undefined;
                artists?: string[] | undefined;
            };
        }>;
        siteInfo: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                id?: number | null | undefined;
            } | undefined;
            output: {
                id: number;
                name?: string | undefined;
                image?: string | undefined;
                description?: string | undefined;
                role?: string | undefined;
            };
        }>;
        hubList: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                name: string;
                id: string;
                image: string;
                description: string;
            }[];
        }>;
        hubSiteList: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                search?: string | undefined;
                refresh?: boolean | undefined;
            };
            output: {
                title: string;
                url: string;
                image?: string | null | undefined;
                tags?: string[] | undefined;
                version?: string | undefined;
                site_description?: string | null | undefined;
            }[];
        }>;
        testHttpProxy: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                url?: string | undefined;
            };
            output: {
                message: string;
                success: boolean;
                responseTime: number;
                error?: string | undefined;
                statusCode?: number | undefined;
                errorCode?: string | undefined;
                errorDetails?: any;
            };
        }>;
    }>>;
    task: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        list: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                name: string;
                schedule: string;
                lastRun: Date;
                isSuccess: boolean;
                isRunning: boolean;
                output?: any;
            }[];
        }>;
        upsertTask: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                type: "update" | "stop" | "start";
                task: "Auto Archive Blinko" | "Backup Database";
                time?: string | undefined;
            };
            output: any;
        }>;
        importFromBlinko: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                filePath: string;
            };
            output: AsyncGenerator<import("@shared/lib/types").RestoreResult & {
                progress: {
                    current: number;
                    total: number;
                };
            }, void, unknown>;
        }>;
        importFromMemos: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                filePath: string;
            };
            output: AsyncGenerator<import("@shared/lib/types").ProgressResult & {
                progress?: {
                    current: number;
                    total: number;
                };
            }, void, unknown>;
        }>;
        exportMarkdown: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                format: "json" | "markdown" | "csv";
                baseURL: string;
                startDate?: Date | undefined;
                endDate?: Date | undefined;
            };
            output: {
                success: boolean;
                error?: string | undefined;
                downloadUrl?: string | undefined;
                fileCount?: number | undefined;
            };
        }>;
    }>>;
    analytics: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        dailyNoteCount: import("@trpc/server").TRPCMutationProcedure<{
            input: void;
            output: {
                date: string;
                count: number;
            }[];
        }>;
        monthlyStats: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                month: string;
            };
            output: {
                noteCount: number;
                totalWords: number;
                maxDailyWords: number;
                activeDays: number;
                tagStats?: {
                    count: number;
                    tagName: string;
                }[] | undefined;
            };
        }>;
    }>>;
    comments: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        create: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                content: string;
                noteId: number;
                guestName?: string | undefined;
                parentId?: number | undefined;
            };
            output: boolean;
        }>;
        list: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                noteId: number;
                orderBy?: "asc" | "desc" | undefined;
                size?: number | undefined;
                page?: number | undefined;
            };
            output: {
                total: number;
                items: any[];
            };
        }>;
        delete: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: {
                success: boolean;
            };
        }>;
        update: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
                content: string;
            };
            output: any;
        }>;
    }>>;
    follows: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        recommandList: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                searchText?: string | undefined;
            } | undefined;
            output: {
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
                accountId: number | null;
                shareEncryptedUrl?: string | null | undefined;
                shareExpiryDate?: Date | null | undefined;
                shareMaxView?: number | null | undefined;
                shareViewCount?: number | null | undefined;
                metadata?: any;
                attachments?: {
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
                    size: string | number | import("@prisma/client/runtime/library").Decimal;
                    perfixPath?: any;
                    depth?: any;
                }[] | undefined;
                tags?: ({
                    id: number;
                    tag: {
                        name: string;
                        id: number;
                        createdAt: Date;
                        updatedAt: Date;
                        icon: string;
                        parent: number;
                        sortOrder: number;
                    };
                    noteId: number;
                    tagId: number;
                } | undefined)[] | null | undefined;
                account?: {
                    name?: string | undefined;
                    id?: number | undefined;
                    nickname?: string | undefined;
                    image?: string | undefined;
                } | null | undefined;
                _count?: {
                    comments: number;
                } | undefined;
                originURL?: string | undefined;
            }[];
        }>;
        follow: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                siteUrl: string;
                mySiteUrl: string;
            };
            output: {
                success: boolean;
                data?: any;
            };
        }>;
        followFrom: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                siteName: string;
                siteUrl: string;
                siteAvatar: string;
                mySiteAccountId: number;
            };
            output: {
                success: boolean;
                data?: any;
            };
        }>;
        unfollow: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                siteUrl: string;
                mySiteUrl: string;
            };
            output: boolean;
        }>;
        unfollowFrom: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                siteUrl: string;
                mySiteAccountId: number;
            };
            output: boolean;
        }>;
        followList: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                userId?: number | null | undefined;
            };
            output: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                accountId: number;
                siteUrl: string;
                followType: string;
                description?: string | undefined;
                siteName?: string | undefined;
                siteAvatar?: string | undefined;
            }[] | undefined;
        }>;
        followerList: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                userId?: number | null | undefined;
            };
            output: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                accountId: number;
                siteUrl: string;
                followType: string;
                description?: string | undefined;
                siteName?: string | undefined;
                siteAvatar?: string | undefined;
            }[] | undefined;
        }>;
        isFollowing: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                siteUrl: string;
            };
            output: {
                data: boolean;
                success: boolean;
            };
        }>;
    }>>;
    notifications: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        list: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                size?: number | undefined;
                page?: number | undefined;
            };
            output: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                type: string;
                content: string;
                accountId: number;
                title: string;
                isRead: boolean;
                metadata?: any;
            }[];
        }>;
        create: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                type: string;
                content: string;
                title: string;
                metadata?: any;
            };
            output: boolean;
        }>;
        markAsRead: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id?: number | undefined;
                all?: boolean | undefined;
            };
            output: boolean;
        }>;
        unreadCount: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: number;
        }>;
        delete: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: boolean;
        }>;
    }>>;
    plugin: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        getAllPlugins: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                name: string;
                url: string;
                version: string;
                author: string;
                minAppVersion: string;
                downloads: number;
                description?: any;
                displayName?: any;
                readme?: any;
            }[];
        }>;
        getPluginCssContents: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                pluginName: string;
            };
            output: {
                content: string;
                fileName: string;
            }[];
        }>;
        saveDevPlugin: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                code: string;
                fileName: string;
                metadata?: any;
            };
            output: any;
        }>;
        saveAdditionalDevFile: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                content: string;
                filePath: string;
            };
            output: any;
        }>;
        installPlugin: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                name: string;
                url: string;
                version: string;
                author: string;
                minAppVersion: string;
                description?: any;
                displayName?: any;
            };
            output: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                metadata: import("@prisma/client/runtime/library").JsonValue;
                path: string;
                isUse: boolean;
                isDev: boolean;
            };
        }>;
        getInstalledPlugins: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                path: string;
                isUse: boolean;
                isDev: boolean;
                metadata?: any;
            }[];
        }>;
        uninstallPlugin: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: {
                success: boolean;
            };
        }>;
    }>>;
    conversation: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        create: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                title?: string | undefined;
            };
            output: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                accountId: number;
                title: string;
            };
        }>;
        clearMessages: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: {
                success: boolean;
            };
        }>;
        list: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                size?: number | undefined;
                page?: number | undefined;
            };
            output: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                accountId: number;
                title: string;
            }[];
        }>;
        detail: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                id: number;
            };
            output: ({
                messages: {
                    id: number;
                    role: string;
                    createdAt: Date;
                    updatedAt: Date;
                    content: string;
                    metadata: import("@prisma/client/runtime/library").JsonValue | null;
                    conversationId: number;
                }[];
            } & {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                accountId: number;
                title: string;
            }) | null;
        }>;
        update: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
                title?: string | undefined;
            };
            output: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                accountId: number;
                title: string;
            };
        }>;
        delete: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                accountId: number;
                title: string;
            };
        }>;
    }>>;
    message: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: import("trpc-to-openapi").OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        create: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                role: "user" | "system" | "assistant";
                content: string;
                conversationId: number;
                metadata?: any;
            };
            output: {
                id: number;
                role: string;
                createdAt: Date;
                updatedAt: Date;
                content: string;
                metadata: import("@prisma/client/runtime/library").JsonValue | null;
                conversationId: number;
            };
        }>;
        list: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                conversationId: number;
                size?: number | undefined;
                page?: number | undefined;
            };
            output: {
                id: number;
                role: string;
                createdAt: Date;
                updatedAt: Date;
                content: string;
                metadata: import("@prisma/client/runtime/library").JsonValue | null;
                conversationId: number;
            }[];
        }>;
        update: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
                content: string;
            };
            output: {
                id: number;
                role: string;
                createdAt: Date;
                updatedAt: Date;
                content: string;
                metadata: import("@prisma/client/runtime/library").JsonValue | null;
                conversationId: number;
            };
        }>;
        delete: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: void;
        }>;
    }>>;
}>>;
export type AppRouter = typeof appRouter;
export type RouterOutput = inferRouterOutputs<AppRouter>;
export type RouterInput = inferRouterInputs<AppRouter>;
