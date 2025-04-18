import { Router, RequestHandler } from 'express';

declare module 'express' {
  interface Request {
    user?: any;
  }
}

declare module 'express-serve-static-core' {
  interface Response {
    send: (body?: any) => this;
    json: (body?: any) => this;
    status: (code: number) => this;
    set: (field: any) => this;
  }

  type AsyncRequestHandler<P = any, ResBody = any, ReqBody = any, ReqQuery = any> = (
    req: Request<P, ResBody, ReqBody, ReqQuery>,
    res: Response<ResBody>,
    next: NextFunction
  ) => Promise<any>;

  interface Router {
    get(path: string, ...handlers: (RequestHandler | AsyncRequestHandler)[]): this;
    post(path: string, ...handlers: (RequestHandler | AsyncRequestHandler)[]): this;
    put(path: string, ...handlers: (RequestHandler | AsyncRequestHandler)[]): this;
    delete(path: string, ...handlers: (RequestHandler | AsyncRequestHandler)[]): this;
    patch(path: string, ...handlers: (RequestHandler | AsyncRequestHandler)[]): this;
    options(path: string, ...handlers: (RequestHandler | AsyncRequestHandler)[]): this;
    head(path: string, ...handlers: (RequestHandler | AsyncRequestHandler)[]): this;
    all(path: string, ...handlers: (RequestHandler | AsyncRequestHandler)[]): this;
  }
} 