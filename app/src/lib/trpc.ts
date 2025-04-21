import { createTRPCClient, httpBatchLink, httpLink, splitLink, httpBatchStreamLink } from '@trpc/client';
import type { AppRouter } from '../../../server/routerTrpc/_app';
import superjson from 'superjson';
import { getBlinkoEndpoint } from './blinkoEndpoint';
import { RootStore } from '@/store';
import { UserStore } from '@/store/user';

const getLinks = (useStream = false) => {
  const headers = () => {
    const userStore = RootStore.Get(UserStore);
    const token = userStore.token;
    const baseHeaders: Record<string, string> = {};
    
    if (token) {
      baseHeaders['Authorization'] = `Bearer ${token}`;
    }
    
    return baseHeaders;
  };

  if (useStream) {
    return httpBatchStreamLink({
      url: getBlinkoEndpoint('/api/trpc'),
      transformer: superjson,
      headers
    });
  }

  return splitLink({
    condition(op) {
      return op.context.skipBatch === true;
    },
    true: httpLink({
      url: getBlinkoEndpoint('/api/trpc'),
      transformer: superjson,
      headers
    }),
    // when condition is false, use batching
    false: httpBatchLink({
      url: getBlinkoEndpoint('/api/trpc'),
      transformer: superjson,
      headers
    }),
  });
};

//@ts-ignore
export const api = createTRPCClient<AppRouter>({
  links: [getLinks(false)],
});

//@ts-ignore
export const streamApi = createTRPCClient<AppRouter>({
  links: [getLinks(true)],
});

