import { Prisma } from '@prisma/client';
import { NoteType } from '../../shared/lib/types';
import { Context } from '../context';
export declare const noteRouter: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
    ctx: import("../context").User;
    meta: import("trpc-to-openapi").OpenApiMeta;
    errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
    transformer: true;
}, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
    list: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            orderBy?: "asc" | "desc" | undefined;
            type?: NoteType | -1 | undefined;
            isArchived?: boolean | null | undefined;
            isRecycle?: boolean | undefined;
            isShare?: boolean | null | undefined;
            tagId?: number | null | undefined;
            page?: number | undefined;
            size?: number | undefined;
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
                size: string | number | Prisma.Decimal;
                depth?: any;
                perfixPath?: any;
            }[];
            id: number;
            type: number;
            content: string;
            isArchived: boolean;
            isRecycle: boolean;
            isShare: boolean;
            isTop: boolean;
            isReviewed: boolean;
            sharePassword: string;
            accountId: number | null;
            createdAt: Date;
            updatedAt: Date;
            tags: {
                tag: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    icon: string;
                    parent: number;
                    sortOrder: number;
                };
                id: number;
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
                    content?: string | undefined;
                    createdAt?: Date | undefined;
                    updatedAt?: Date | undefined;
                } | undefined;
            }[] | undefined;
            references?: {
                toNoteId: number;
                toNote?: {
                    content?: string | undefined;
                    createdAt?: Date | undefined;
                    updatedAt?: Date | undefined;
                } | undefined;
            }[] | undefined;
            owner?: {
                id: number;
                name: string;
                nickname: string;
                image: string;
            } | null | undefined;
            isSharedNote?: boolean | undefined;
            canEdit?: boolean | undefined;
            isInternalShared?: boolean | undefined;
        }[];
    }>;
    publicList: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            page?: number | undefined;
            size?: number | undefined;
            searchText?: string | undefined;
        };
        output: {
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
                size: string | number | Prisma.Decimal;
                depth?: any;
                perfixPath?: any;
            }[];
            id: number;
            type: number;
            content: string;
            isArchived: boolean;
            isRecycle: boolean;
            isShare: boolean;
            isTop: boolean;
            isReviewed: boolean;
            sharePassword: string;
            accountId: number | null;
            createdAt: Date;
            updatedAt: Date;
            tags: {
                tag: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    icon: string;
                    parent: number;
                    sortOrder: number;
                };
                id: number;
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
                id?: number | undefined;
                name?: string | undefined;
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
                size: string | number | Prisma.Decimal;
                depth?: any;
                perfixPath?: any;
            }[];
            id: number;
            type: number;
            content: string;
            isArchived: boolean;
            isRecycle: boolean;
            isShare: boolean;
            isTop: boolean;
            isReviewed: boolean;
            sharePassword: string;
            accountId: number | null;
            createdAt: Date;
            updatedAt: Date;
            tags: {
                tag: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    icon: string;
                    parent: number;
                    sortOrder: number;
                };
                id: number;
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
                    content?: string | undefined;
                    createdAt?: Date | undefined;
                    updatedAt?: Date | undefined;
                } | undefined;
            }[] | undefined;
            references?: {
                toNoteId: number;
                toNote?: {
                    content?: string | undefined;
                    createdAt?: Date | undefined;
                    updatedAt?: Date | undefined;
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
                    size: string | number | Prisma.Decimal;
                    depth?: any;
                    perfixPath?: any;
                }[];
                id: number;
                type: number;
                content: string;
                isArchived: boolean;
                isRecycle: boolean;
                isShare: boolean;
                isTop: boolean;
                isReviewed: boolean;
                sharePassword: string;
                accountId: number | null;
                createdAt: Date;
                updatedAt: Date;
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
                    id?: number | undefined;
                    name?: string | undefined;
                    nickname?: string | undefined;
                    image?: string | undefined;
                } | null | undefined;
                referencedBy?: {
                    fromNoteId: number;
                    fromNote?: {
                        content?: string | undefined;
                        createdAt?: Date | undefined;
                        updatedAt?: Date | undefined;
                    } | undefined;
                }[] | undefined;
                references?: {
                    toNoteId: number;
                    toNote?: {
                        content?: string | undefined;
                        createdAt?: Date | undefined;
                        updatedAt?: Date | undefined;
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
                size: string | number | Prisma.Decimal;
                depth?: any;
                perfixPath?: any;
            }[];
            id: number;
            type: number;
            content: string;
            isArchived: boolean;
            isRecycle: boolean;
            isShare: boolean;
            isTop: boolean;
            isReviewed: boolean;
            sharePassword: string;
            accountId: number | null;
            createdAt: Date;
            updatedAt: Date;
            tags: {
                tag: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    icon: string;
                    parent: number;
                    sortOrder: number;
                };
                id: number;
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
                    content?: string | undefined;
                    createdAt?: Date | undefined;
                    updatedAt?: Date | undefined;
                } | undefined;
            }[] | undefined;
            references?: {
                toNoteId: number;
                toNote?: {
                    content?: string | undefined;
                    createdAt?: Date | undefined;
                    updatedAt?: Date | undefined;
                } | undefined;
            }[] | undefined;
        } | null;
    }>;
    dailyReviewNoteList: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: {
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
                size: string | number | Prisma.Decimal;
                depth?: any;
                perfixPath?: any;
            }[];
            id: number;
            type: number;
            content: string;
            isArchived: boolean;
            isRecycle: boolean;
            isShare: boolean;
            isTop: boolean;
            isReviewed: boolean;
            sharePassword: string;
            accountId: number | null;
            createdAt: Date;
            updatedAt: Date;
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
                size: string | number | Prisma.Decimal;
                depth?: any;
                perfixPath?: any;
            }[];
            id: number;
            type: number;
            content: string;
            isArchived: boolean;
            isRecycle: boolean;
            isShare: boolean;
            isTop: boolean;
            isReviewed: boolean;
            sharePassword: string;
            accountId: number | null;
            createdAt: Date;
            updatedAt: Date;
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
                size: string | number | Prisma.Decimal;
                depth?: any;
                perfixPath?: any;
            }[];
            id: number;
            type: number;
            content: string;
            isArchived: boolean;
            isRecycle: boolean;
            isShare: boolean;
            isTop: boolean;
            isReviewed: boolean;
            sharePassword: string;
            accountId: number | null;
            createdAt: Date;
            updatedAt: Date;
            tags: {
                tag: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    icon: string;
                    parent: number;
                    sortOrder: number;
                };
                id: number;
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
                    content?: string | undefined;
                    createdAt?: Date | undefined;
                    updatedAt?: Date | undefined;
                } | undefined;
            }[] | undefined;
            references?: {
                toNoteId: number;
                toNote?: {
                    content?: string | undefined;
                    createdAt?: Date | undefined;
                    updatedAt?: Date | undefined;
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
            type: number;
            content: string;
            isArchived: boolean;
            isRecycle: boolean;
            isShare: boolean;
            isTop: boolean;
            isReviewed: boolean;
            sharePassword: string;
            accountId: number | null;
            createdAt: Date;
            updatedAt: Date;
            shareEncryptedUrl?: string | null | undefined;
            shareExpiryDate?: Date | null | undefined;
            shareMaxView?: number | null | undefined;
            shareViewCount?: number | null | undefined;
            metadata?: any;
        } | null;
    }>;
    upsert: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            attachments?: {
                type: string;
                name: string;
                path: string;
                size: string | number;
            }[] | undefined;
            id?: number | undefined;
            type?: NoteType | -1 | undefined;
            content?: string | null | undefined;
            isArchived?: boolean | null | undefined;
            isRecycle?: boolean | null | undefined;
            isShare?: boolean | null | undefined;
            isTop?: boolean | null | undefined;
            metadata?: any;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
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
            type: number;
            content: string;
            isArchived: boolean;
            isRecycle: boolean;
            isShare: boolean;
            isTop: boolean;
            isReviewed: boolean;
            sharePassword: string;
            accountId: number | null;
            createdAt: Date;
            updatedAt: Date;
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
            type?: NoteType | -1 | undefined;
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
            toNoteId: number;
            fromNoteId: number;
        };
        output: any;
    }>;
    noteReferenceList: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            noteId: number;
            type?: "referencedBy" | "references" | undefined;
        };
        output: {
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
                size: string | number | Prisma.Decimal;
                depth?: any;
                perfixPath?: any;
            }[];
            id: number;
            type: number;
            content: string;
            isArchived: boolean;
            isRecycle: boolean;
            isShare: boolean;
            isTop: boolean;
            isReviewed: boolean;
            sharePassword: string;
            accountId: number | null;
            createdAt: Date;
            updatedAt: Date;
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
            content: string;
            accountId: number | null;
            createdAt: Date;
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
            content: string;
            createdAt: Date;
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
            id: number;
            name: string;
            nickname: string;
            image: string;
            loginType: string;
            canEdit: boolean;
        }[];
    }>;
    internalSharedWithMe: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            orderBy?: "asc" | "desc" | undefined;
            page?: number | undefined;
            size?: number | undefined;
        };
        output: {
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
                size: string | number | Prisma.Decimal;
                depth?: any;
                perfixPath?: any;
            }[];
            id: number;
            type: number;
            content: string;
            isArchived: boolean;
            isRecycle: boolean;
            isShare: boolean;
            isTop: boolean;
            isReviewed: boolean;
            sharePassword: string;
            accountId: number | null;
            createdAt: Date;
            updatedAt: Date;
            tags: {
                tag: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    icon: string;
                    parent: number;
                    sortOrder: number;
                };
                id: number;
                noteId: number;
                tagId: number;
            }[];
            _count: {
                comments: number;
                histories: number;
            };
            owner: {
                id: number;
                name: string;
                nickname: string;
                image: string;
            } | null;
            canEdit: boolean;
            shareEncryptedUrl?: string | null | undefined;
            shareExpiryDate?: Date | null | undefined;
            shareMaxView?: number | null | undefined;
            shareViewCount?: number | null | undefined;
            metadata?: any;
        }[];
    }>;
}>>;
export declare function deleteNotes(ids: number[], ctx: Context): Promise<{
    ok: boolean;
}>;
