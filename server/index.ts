import express from 'express';
import cors from 'cors';
import path from 'path';
import authRoutes from './routerExpress/auth';
import { configureSession } from './routerExpress/auth/config';

// tRPC related imports
import { createContext } from './context';
import { appRouter } from './routerTrpc/_app';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { createOpenApiExpressMiddleware } from 'trpc-to-openapi';

// API documentation
import swaggerUi from 'swagger-ui-express';
import { openApiDocument } from './swagger';

// Express router imports
import fileRouter from './routerExpress/file/file';
import uploadRouter from './routerExpress/file/upload';
import deleteRouter from './routerExpress/file/delete';
import s3fileRouter from './routerExpress/file/s3file';
import pluginRouter from './routerExpress/file/plugin';
import rssRouter from './routerExpress/rss';
import openaiRouter from './routerExpress/openai';

// Vite integration
import ViteExpress from 'vite-express';

// Process error handling
process.on('uncaughtException', (error) => {
  console.error('uncaughtException:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('unhandledRejection:', reason);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM');
});

process.on('SIGINT', () => {
  console.log('SIGINT');
});

process.on('exit', (code) => {
  console.log(`process exit, code: ${code}`);
});

// Server configuration
const app = express();
const PORT = 1111;
const appRootDev = path.resolve(__dirname, '../app');
const appRootProd = path.resolve(__dirname, '../server');
let server: any = null;

if (process.env.NODE_ENV === 'production') {
  // Vite configuration
  ViteExpress.config({
    mode: 'production',
    inlineViteConfig: {
      //docker production dir /dist not development dir
      root: appRootProd,
      build: { outDir: "public" }
    }
  });
} else {
  ViteExpress.config({
    viteConfigFile: path.resolve(appRootDev, 'vite.config.ts'),
    inlineViteConfig: {
      root: appRootDev,
    }
  });
}

// Global error handler
const errorHandler = (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('express error:', err);
  res.status(500).json({
    error: {
      message: 'Internal Server Error',
      ...(process.env.NODE_ENV !== 'production' ? { details: err.message, stack: err.stack } : {})
    }
  });
};

/**
 * Setup all API routes for the application
 */
async function setupApiRoutes(app: express.Application) {
  // Authentication routes
  app.use('/api/auth', authRoutes);

  // tRPC endpoint with adapter for Express
  app.use('/api/trpc',
    createExpressMiddleware({
      router: appRouter,
      createContext: ({ req, res }) => {
        return createContext(req, res);
      },
      onError: ({ error }) => {
        console.error('tRPC error:', error);
      }
    })
  );

  // File handling endpoints
  app.use('/api/file', fileRouter);
  app.use('/api/file/upload', uploadRouter);
  app.use('/api/file/delete', deleteRouter);
  app.use('/api/s3file', s3fileRouter);
  app.use('/dist/js/lute/lute.min.js', (req, res) => {
    res.set({
      'Cache-Control': 'public, max-age=604800, immutable',
      'Expires': new Date(Date.now() + 604800000).toUTCString()
    });
    res.sendFile(path.resolve(__dirname, './lute.min.js'));
  });
  app.use('/plugins', pluginRouter);

  // Other API endpoints
  app.use('/api/rss', rssRouter);
  app.use('/v1', openaiRouter);

  // OpenAPI integration
  app.use('/api',
    // @ts-ignore
    createOpenApiExpressMiddleware({
      router: appRouter,
      createContext: ({ req, res }: { req: express.Request; res: express.Response }) => {
        return createContext(req, res);
      }
    })
  );

  // OpenAPI documentation endpoints
  app.get('/api/openapi.json', (req, res) => {
    res.json(openApiDocument);
  });

  // Swagger UI configuration
  app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(openApiDocument, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Blinko API Document',
    customfavIcon: '/favicon.ico',
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'list',
      filter: true
    }
  }));

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });
}

/**
 * Bootstrap the server
 * Sets up middleware, auth, API routes and starts the server
 */
async function bootstrap() {
  console.log('bootstrap');
  try {
    app.use(cors({
      origin: true,
      credentials: true
    }));

    if (process.env.TRUST_PROXY === '1') {
      app.set('trust proxy', 1);
    }

    const staticOptions = {
      maxAge: '7d',
      immutable: true,
      setHeaders: (res: express.Response, path: string) => {
        const ext = path.split('.').pop()?.toLowerCase();
        if (['png', 'webp', 'svg', 'json', 'ico', 'gif', 'mp4'].includes(ext || '')) {
          res.setHeader('Cache-Control', 'public, max-age=604800, immutable');
          res.setHeader('Expires', new Date(Date.now() + 604800000).toUTCString());
        }
      }
    };

    const publicPath = path.resolve(appRootProd, 'public');
    app.use(express.static(publicPath, staticOptions));

    // Add body parsers for JSON and form data
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ extended: true, limit: '50mb' }));

    await configureSession(app);

    // Setup API routes
    await setupApiRoutes(app);
    //@ts-ignore
    app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      errorHandler(err, req, res, next);
    });

    // Start or update server
    if (!server) {
      server = ViteExpress.listen(app, PORT, () => {
        console.log(`🎉server start on port http://localhost:${PORT} - env: ${process.env.NODE_ENV || 'development'}`);
      });
    } else {
      console.log(`API routes updated - env: ${process.env.NODE_ENV || 'development'}`);
    }
  } catch (err) {
    console.error('start server error:', err);
    try {
      // Attempt to start server even if route setup fails
      if (!server) {
        server = ViteExpress.listen(app, PORT, () => {
          console.log(`🎉server start on port http://localhost:${PORT} - env: ${process.env.NODE_ENV || 'development'}`);
        });
      }
    } catch (startupError) {
      console.error('start server error:', startupError);
    }
  }
}

// Start the server
bootstrap(); 