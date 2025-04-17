import express from 'express';
import cors from 'cors';
import path from 'path';

// tRPC related imports
import { createContext } from './context';
import { appRouter } from './routerTrpc/_app';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { createOpenApiExpressMiddleware } from 'trpc-to-openapi';

// API documentation
import swaggerUi from 'swagger-ui-express';
import { openApiDocument } from './swagger';

// Express router imports
import { setupAuth } from './routerExpress/auth';
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
const blinkoFrontendAppROOT = path.resolve(__dirname, '../app');
let server: any = null;

// Vite configuration
ViteExpress.config({
  viteConfigFile: path.resolve(blinkoFrontendAppROOT, 'vite.config.ts'),
  inlineViteConfig: {
    root: blinkoFrontendAppROOT,
  }
});

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
  // tRPC endpoint
  app.use('/api/trpc', createExpressMiddleware({
    router: appRouter,
    createContext,
    onError: ({ error }) => {
      console.error('tRPC error:', error);
    }
  }));

  // File handling endpoints
  app.use('/api/file', fileRouter);
  app.use('/api/file/upload', uploadRouter);
  app.use('/api/file/delete', deleteRouter);
  app.use('/api/s3file', s3fileRouter);
  app.use('/api/plugins', pluginRouter);

  // Other API endpoints
  app.use('/api/rss', rssRouter);
  app.use('/v1', openaiRouter);

  // OpenAPI integration
  app.use('/api', createOpenApiExpressMiddleware({
    //@ts-ignore
    router: appRouter,
    createContext,
  }));

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

  // Apply global error handler
  app.use(errorHandler);
}

/**
 * Bootstrap the server
 * Sets up middleware, auth, API routes and starts the server
 */
async function bootstrap() {
  console.log('bootstrap');
  try {
    // Enable CORS
    app.use(cors());

    // Setup authentication and API routes
    await setupAuth(app);
    await setupApiRoutes(app);

    // Start or update server
    if (!server) {
      server = ViteExpress.listen(app, PORT, () => {
        console.log(`server start on port ${PORT} - env: ${process.env.NODE_ENV || 'development'}`);
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
          console.log(`server start on port ${PORT} - env: ${process.env.NODE_ENV || 'development'}`);
        });
      }
    } catch (startupError) {
      console.error('start server error:', startupError);
    }
  }
}

// Start the server
bootstrap(); 