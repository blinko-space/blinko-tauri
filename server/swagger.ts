import swaggerJSDoc from 'swagger-jsdoc';
import { generateOpenApiDocument } from 'trpc-to-openapi';
import { appRouter } from './routerTrpc/_app';
import path from 'path';

const trpcOpenApiDocument = generateOpenApiDocument(appRouter, {
  title: 'Blinko TRPC API',
  description: 'blinko tRPC API',
  version: '1.0.0',
  baseUrl: '/api',
  tags: ['Note', 'User', 'Task', 'Tag', 'Public', 'Config', 'File'],
  securitySchemes: {
    bearer: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT'
    }
  }
});

const expressSwaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blinko Express API',
      version: '1.0.0',
      description: 'Blinko Express API Documentation',
    },
    servers: [
      {
        url: '/api',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearer: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    tags: [
      {
        name: 'File',
        description: 'file related API'
      },
      {
        name: 'Plugin',
        description: 'plugin related API'
      }
    ]
  },
  apis: [path.join(__dirname, './routerExpress/**/*.ts')],
};

const expressOpenApiDocument = swaggerJSDoc(expressSwaggerOptions);

const mergedOpenApiDocument = {
  ...trpcOpenApiDocument,
  paths: {
    ...trpcOpenApiDocument.paths,
    ...expressOpenApiDocument.paths,
  },
  tags: [
    ...(trpcOpenApiDocument.tags || []),
    ...(expressOpenApiDocument.tags || []),
  ],
};

export { mergedOpenApiDocument as openApiDocument }; 