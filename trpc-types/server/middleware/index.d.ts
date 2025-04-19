/**
 * This is your entry point to setup the root configuration for tRPC on the server.
 * - `initTRPC` should only be used once per app.
 * - We export only the functionality that we use so we can enforce which base procedures should be used
 *
 * Learn how to create protected base procedures and other things below:
 * @link https://trpc.io/docs/v11/router
 * @link https://trpc.io/docs/v11/procedures
 */
import { OpenApiMeta } from 'trpc-to-openapi';
export declare const t: {
    _config: import("@trpc/server/unstable-core-do-not-import").RootConfig<{
        ctx: import("../context").User;
        meta: OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }>;
    procedure: import("@trpc/server/unstable-core-do-not-import").ProcedureBuilder<import("../context").User, OpenApiMeta, object, typeof import("@trpc/server/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/unstable-core-do-not-import").unsetMarker, false>;
    middleware: <$ContextOverrides>(fn: import("@trpc/server/unstable-core-do-not-import").MiddlewareFunction<import("../context").User, OpenApiMeta, object, $ContextOverrides, unknown>) => import("@trpc/server/unstable-core-do-not-import").MiddlewareBuilder<import("../context").User, OpenApiMeta, $ContextOverrides, unknown>;
    router: <TInput extends import("@trpc/server/unstable-core-do-not-import").CreateRouterOptions>(input: TInput) => import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: import("../context").User;
        meta: OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<TInput>>;
    mergeRouters: typeof import("@trpc/server/unstable-core-do-not-import").mergeRouters;
    createCallerFactory: <TRecord extends import("@trpc/server").RouterRecord>(router: Pick<import("@trpc/server/unstable-core-do-not-import").Router<{
        ctx: import("../context").User;
        meta: OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, TRecord>, "_def">) => import("@trpc/server/unstable-core-do-not-import").RouterCaller<{
        ctx: import("../context").User;
        meta: OpenApiMeta;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, TRecord>;
};
export declare const router: <TInput extends import("@trpc/server/unstable-core-do-not-import").CreateRouterOptions>(input: TInput) => import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
    ctx: import("../context").User;
    meta: OpenApiMeta;
    errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
    transformer: true;
}, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<TInput>>;
export declare const publicProcedure: import("@trpc/server/unstable-core-do-not-import").ProcedureBuilder<import("../context").User, OpenApiMeta, object, typeof import("@trpc/server/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/unstable-core-do-not-import").unsetMarker, false>;
export declare const authProcedure: import("@trpc/server/unstable-core-do-not-import").ProcedureBuilder<import("../context").User, OpenApiMeta, {
    sub: string;
    id: string;
    name: string;
    role: string;
    exp: number;
    iat: number;
    ip: string | undefined;
    userAgent: any;
    permissions: string[] | undefined;
    iss: string | undefined;
    aud: string | string[] | undefined;
    nbf: number | undefined;
    jti: string | undefined;
}, typeof import("@trpc/server/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/unstable-core-do-not-import").unsetMarker, false>;
export declare const demoAuthMiddleware: import("@trpc/server/unstable-core-do-not-import").MiddlewareBuilder<import("../context").User, OpenApiMeta, {
    sub: string;
    id: string;
    name: string;
    role: string;
    exp: number;
    iat: number;
    ip: string | undefined;
    userAgent: any;
    permissions: string[] | undefined;
    iss: string | undefined;
    aud: string | string[] | undefined;
    nbf: number | undefined;
    jti: string | undefined;
}, unknown>;
export declare const superAdminAuthMiddleware: import("@trpc/server/unstable-core-do-not-import").MiddlewareBuilder<import("../context").User, OpenApiMeta, {
    sub: string;
    id: string;
    name: string;
    role: string;
    exp: number;
    iat: number;
    ip: string | undefined;
    userAgent: any;
    permissions: string[] | undefined;
    iss: string | undefined;
    aud: string | string[] | undefined;
    nbf: number | undefined;
    jti: string | undefined;
}, unknown>;
export declare const mergeRouters: typeof import("@trpc/server/unstable-core-do-not-import").mergeRouters;
