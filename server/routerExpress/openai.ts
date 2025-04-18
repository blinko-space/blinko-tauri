import express from 'express';
import { createTRPCClient, httpBatchStreamLink } from '@trpc/client';
import superjson from 'superjson';
import { getTokenFromRequest } from '../lib/helper';
import { getGlobalConfig } from '../routerTrpc/config';

const router = express.Router();

const createServerStreamClient = (req) => {
  const origin = `${req.protocol}://${req.get('host')}`;
  return createTRPCClient({
    links: [
      httpBatchStreamLink({
        url: `${origin}/api/trpc`,
        headers: () => ({
          authorization: req.headers.authorization || '',
        }),
        transformer: superjson
      }),
    ],
  }) as any;
};

router.options('/chat/completions', (req, res) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400'
  });
  return res.status(200).end();
});

router.post('/chat/completions', async (req, res) => {
  try {
    const token = await getTokenFromRequest(req);
    if (!token) {
      return res.status(401).json({
        error: { message: 'No valid authorization token provided' }
      });
    }

    const config = await getGlobalConfig({ ctx: token });

    const withRAG = !!config.embeddingModel;
    const withTools = !!config.tavilyApiKey;
    const withOnline = !!config.tavilyApiKey;
    console.log('req.body', req.body);
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({
        error: { message: 'Invalid request body' }
      });
    }

    const { messages = [], stream = false, model = '' } = req.body;

    if (!Array.isArray(messages)) {
      return res.status(400).json({
        error: { message: 'Messages must be an array' }
      });
    }

    const conversations = messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    const question = conversations.filter(msg => msg.role === 'user').pop()?.content || '';

    const trpcClient = createServerStreamClient(req);

    if (stream) {
      res.set({
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*'
      });

      let id = `chatcmpl-${Math.random().toString(36).substring(2, 12)}`;
      
      res.write(`data: ${JSON.stringify({
        id,
        object: 'chat.completion.chunk',
        created: Math.floor(Date.now() / 1000),
        model: model || 'blinko-default',
        choices: [{ delta: { role: 'assistant' }, index: 0, finish_reason: null }]
      })}\n\n`);

      try {
        const resStream = await trpcClient.ai.completions.mutate({
          question,
          conversations,
          withRAG,
          withTools,
          withOnline
        });

        for await (const item of resStream) {
          if (item.notes) {
          } else if (item.chunk?.type === 'text-delta') {
            res.write(`data: ${JSON.stringify({
              id,
              object: 'chat.completion.chunk',
              created: Math.floor(Date.now() / 1000),
              model: model || 'blinko-default',
              choices: [{ delta: { content: item.chunk.textDelta }, index: 0, finish_reason: null }]
            })}\n\n`);
          }
        }

        res.write(`data: ${JSON.stringify({
          id,
          object: 'chat.completion.chunk',
          created: Math.floor(Date.now() / 1000),
          model: model || 'blinko-default',
          choices: [{ delta: {}, index: 0, finish_reason: 'stop' }]
        })}\n\n`);
        
        res.write('data: [DONE]\n\n');
        return res.end();
      } catch (error) {
        res.write(`data: ${JSON.stringify({
          error: { message: error.message || 'An error occurred during processing' }
        })}\n\n`);
        return res.end();
      }
    } else {
      let fullResponse = '';
      const resStream = await trpcClient.ai.completions.mutate({
        question,
        conversations,
        withRAG,
        withTools,
        withOnline
      });

      for await (const item of resStream) {
        if (item.chunk?.type === 'text-delta') {
          fullResponse += item.chunk.textDelta;
        }
      }

      return res.set({
        'Access-Control-Allow-Origin': '*'
      }).json({
        id: `chatcmpl-${Math.random().toString(36).substring(2, 12)}`,
        object: 'chat.completion',
        created: Math.floor(Date.now() / 1000),
        model: model || 'blinko-default',
        choices: [
          {
            index: 0,
            message: {
              role: 'assistant',
              content: fullResponse
            },
            finish_reason: 'stop'
          }
        ],
        usage: {
          prompt_tokens: -1,
          completion_tokens: -1,
          total_tokens: -1
        }
      });
    }
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).set({
      'Access-Control-Allow-Origin': '*'
    }).json({
      error: { message: error.message || 'Internal server error' }
    });
  }
});

export default router; 