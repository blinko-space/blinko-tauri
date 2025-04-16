import { generateOpenApiDocument } from 'trpc-to-openapi';
import { appRouter } from './routers/_app';

const fileApiPaths = {
  '/file/upload': {
    post: {
      tags: ['File'],
      summary: 'Upload File',
      operationId: 'uploadFile',
      requestBody: {
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object' as const,
              properties: {
                file: {
                  type: 'string' as const,
                  format: 'binary',
                  description: 'Upload File'
                }
              },
              required: ['file']
            }
          }
        }
      },
      responses: {
        '200': {
          description: 'Upload Success',
          content: {
            'application/json': {
              schema: {
                type: 'object' as const,
                properties: {
                  Message: { type: 'string' as const },
                  status: { type: 'number' as const },
                  path: { type: 'string' as const },
                  type: { type: 'string' as const },
                  size: { type: 'number' as const }
                }
              }
            }
          }
        },
        '401': {
          description: 'UNAUTH',
          content: {
            'application/json': {
              schema: {
                type: 'object' as const,
                properties: {
                  error: { type: 'string' as const }
                }
              }
            }
          }
        }
      },
      security: [{ bearer: [] }]
    }
  },

  '/file/delete': {
    post: {
      tags: ['File'],
      summary: 'Delete File',
      operationId: 'deleteFile',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object' as const,
              properties: {
                attachment_path: {
                  type: 'string' as const,
                  description: 'File path, e.g.: /api/file/123.png'
                }
              },
              required: ['attachment_path']
            }
          }
        }
      },
      responses: {
        '200': {
          description: 'Delete Success',
          content: {
            'application/json': {
              schema: {
                type: 'object' as const,
                properties: {
                  Message: { type: 'string' as const },
                  status: { type: 'number' as const }
                }
              }
            }
          }
        }
      },
      security: [{ bearer: [] }]
    }
  },

  '/file/upload-by-url': {
    post: {
      tags: ['File'],
      summary: 'Upload File by URL',
      operationId: 'uploadFileByUrl',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object' as const,
              properties: {
                url: {
                  type: 'string' as const,
                  description: 'URL of the file to upload'
                }
              },
              required: ['url']
            }
          }
        }
      },
      responses: {
        '200': {
          description: 'Upload Success',
          content: {
            'application/json': {
              schema: {
                type: 'object' as const,
                properties: {
                  Message: { type: 'string' as const },
                  status: { type: 'number' as const },
                  path: { type: 'string' as const },
                  type: { type: 'string' as const },
                  size: { type: 'number' as const },
                  originalURL: { type: 'string' as const }
                }
              }
            }
          }
        },
        '400': {
          description: 'Bad Request',
          content: {
            'application/json': {
              schema: {
                type: 'object' as const,
                properties: {
                  error: { type: 'string' as const }
                }
              }
            }
          }
        },
        '401': {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: {
                type: 'object' as const,
                properties: {
                  error: { type: 'string' as const }
                }
              }
            }
          }
        },
        '500': {
          description: 'Server Error',
          content: {
            'application/json': {
              schema: {
                type: 'object' as const,
                properties: {
                  error: { type: 'string' as const }
                }
              }
            }
          }
        }
      },
      security: [{ bearer: [] }]
    }
  }
};

export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: 'Blinko CRUD API V1',
  description: 'blinko api for public endpoints',
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

// @ts-ignore 
openApiDocument.paths = {
  ...openApiDocument.paths,
  ...fileApiPaths
};
