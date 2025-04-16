import express from 'express';
import cors from 'cors';
import { createContext } from './context';
import { appRouter } from './routerTrpc/_app';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { generateOpenApiDocument, createOpenApiExpressMiddleware } from 'trpc-to-openapi';
import ViteExpress from 'vite-express';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { setupAuth } from './routerExpress/auth';
import fileRouter from './routerExpress/file/file';
import uploadRouter from './routerExpress/file/upload';
import deleteRouter from './routerExpress/file/delete';
import s3fileRouter from './routerExpress/file/s3file';
import pluginRouter from './routerExpress/file/plugin';
import rssRouter from './routerExpress/rss';
import openaiRouter from './routerExpress/openai';

const app = express();
const PORT = 1111;
const blinkoFrontendAppROOT = path.resolve(__dirname, '../app');

ViteExpress.config({
  viteConfigFile: path.resolve(blinkoFrontendAppROOT, 'vite.config.ts'),
  inlineViteConfig: {
    root: blinkoFrontendAppROOT,
  }
})

async function bootstrap() {
  console.log('bootstrap');
  try {
    app.use(cors());

    await setupAuth(app);

    app.use('/api/trpc', createExpressMiddleware({
      router: appRouter,
      createContext,
    }));

    app.use('/api/file', fileRouter);
    app.use('/api/file/upload', uploadRouter);
    app.use('/api/file/delete', deleteRouter);
    app.use('/api/s3file', s3fileRouter);
    app.use('/api/plugins', pluginRouter);
    app.use('/api/rss', rssRouter);
    app.use('/v1', openaiRouter);

    // OpenAPI
    app.use('/api', createOpenApiExpressMiddleware({
      //@ts-ignore
      router: appRouter,
      createContext,
    }));

    //@ts-ignore
    const openApiDocument = generateOpenApiDocument(appRouter, {
      title: 'Blinko API',
      version: '1.0.0',
      baseUrl: '/api',
    });

    app.get('/api/openapi.json', (req, res) => {
      res.json(openApiDocument);
    });

    // Swagger UI
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

    app.get('/health', (req, res) => {
      res.json({ status: 'ok' });
    });


    ViteExpress.listen(app, PORT, () => {
      console.log(`server start at ${PORT} - env: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

bootstrap(); 