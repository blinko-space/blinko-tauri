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
                size: string | number | Prisma.Decimal;
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
                size: string | number | Prisma.Decimal;
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
                size: string | number | Prisma.Decimal;
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
                    size: string | number | Prisma.Decimal;
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
                size: string | number | Prisma.Decimal;
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
                size: string | number | Prisma.Decimal;
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
                size: string | number | Prisma.Decimal;
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
                size: string | number | Prisma.Decimal;
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
            type?: NoteType | -1 | undefined;
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
                size: string | number | Prisma.Decimal;
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
                size: string | number | Prisma.Decimal;
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
export declare function deleteNotes(ids: number[], ctx: Context): Promise<{
    ok: boolean;
}>;
