import express from 'express';
import cors from 'cors';
import { createContext } from './context';
import { appRouter } from './routerTrpc/_app';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { generateOpenApiDocument, createOpenApiExpressMiddleware } from 'trpc-to-openapi';
import ViteExpress from 'vite-express';
import path from 'path';
import { setupAuth } from './routerExpress/auth';
import fileRouter from './routerExpress/file/file';
import uploadRouter from './routerExpress/file/upload';
import deleteRouter from './routerExpress/file/delete';

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