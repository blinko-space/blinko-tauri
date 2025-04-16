import i18n from '@/lib/i18n'
import { api } from '@/lib/trpc'
import { type ProgressResult } from '@/server/plugins/memos'
import { RootStore } from '@/store'
import { BlinkoStore } from '@/store/blinkoStore'
import { ToastPlugin } from '@/store/module/Toast/Toast'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/Common/Iconify/icons'
import { Progress } from "@heroui/react"
import { DialogStandaloneStore } from '@/store/module/DialogStandalone'

export const ImportProgress = observer(({ force }: { force: boolean }) => {
  const { t } = useTranslation()
  const blinko = RootStore.Get(BlinkoStore)
  const store = RootStore.Local(() => ({
    progress: 0,
    total: 0,
    message: [] as ProgressResult[],
    status: '',
    isPolling: false,
    pollingInterval: null as NodeJS.Timeout | null,

    get value() {
      const v = Math.round((store.progress / store.total) * 100)
      return isNaN(v) ? 0 : v
    },
    get isSuccess() {
      return store.status === 'success'
    },
    get isError() {
      return store.status === 'error'
    },

    startPolling() {
      if (store.isPolling) return;

      store.isPolling = true;
      store.fetchProgress();

      store.pollingInterval = setInterval(() => {
        store.fetchProgress();
      }, 2000);
    },

    stopPolling() {
      if (store.pollingInterval) {
        clearInterval(store.pollingInterval);
        store.pollingInterval = null;
      }
      store.isPolling = false;
    },

    async fetchProgress() {
      try {
        const result = await api.ai.rebuildEmbeddingProgress.query();
        if (result) {
          store.progress = result.current || 0;
          store.total = result.total || 0;

          if (!result.isRunning && store.progress > 0) {
            store.status = 'success';
            store.stopPolling();
          } else if (result.isRunning) {
            store.status = 'running';
          }

          if (result.results && result.results.length > 0) {
            const newMessages = result.results.map((item: any) => ({
              type: item.type as any,
              content: item.content,
              error: item.error
            }));

            if (store.message.length === 0) {
              store.message = newMessages.reverse();
            } else {
              const existingContents = new Set(store.message.map(m => `${m.type}:${m.content}`));
              const newUniqueMessages = newMessages.filter(
                m => !existingContents.has(`${m.type}:${m.content}`)
              );

              if (newUniqueMessages.length > 0) {
                store.message = [...newUniqueMessages.reverse(), ...store.message];
              }
            }
          }

          blinko.updateTicker++;
        }
      } catch (err) {
        console.error("Error fetching rebuild progress:", err);
        RootStore.Get(ToastPlugin).error(err?.message || "Failed to fetch progress");
      }
    },

    async handleStart() {
      try {
        await api.ai.rebuildEmbeddingStart.mutate({ force });

        store.startPolling();

        store.message.unshift({
          type: 'info',
          content: t('rebuild-started'),
        });

        blinko.updateTicker++;
      } catch (err) {
        RootStore.Get(ToastPlugin).error(err?.message || "Failed to start rebuild task");
      }
    },

    async stopTask() {
      try {
        await api.ai.rebuildEmbeddingStop.mutate();
        
        const result = await api.ai.rebuildEmbeddingProgress.query();
        if (result) {
          store.progress = result.current || 0;
          store.total = result.total || 0;
          store.status = 'success';
        }
        
        store.message.unshift({
          type: 'info',
          content: t('rebuild-stopped-by-user'),
        });
        
        blinko.updateTicker++;
        store.stopPolling();
        RootStore.Get(DialogStandaloneStore).close()
      } catch (err) {
        RootStore.Get(ToastPlugin).error(err?.message || "Failed to stop rebuild task");
      }
    }
  }))

  useEffect(() => {
    store.handleStart();

    return () => {
      store.stopPolling();
    }
  }, []);

  const getStatusIcon = (type: string) => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'skip':
        return '🔄';
      case 'info':
        return 'ℹ️';
      default:
        return '•';
    }
  };

  return <div>
    <Progress
      size="sm"
      radius="sm"
      color="warning"
      label="Progress"
      value={store.value}
      showValueLabel={true}
    />

    <div className="flex justify-between mt-4 text-sm">
      <span>{store.progress} / {store.total}</span>
      {store.status === 'running' && (
        <button
          onClick={store.stopTask}
          className="ml-auto p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          title={t('stop-task')}
        >
          <Icon icon="mdi:stop-circle" className="text-danger" width={20} height={20} />
        </button>
      )}
    </div>

    <div className='flex flex-col max-h-[400px] overflow-y-auto mt-2'>
      {store.message.map((item, index) => (
        <div key={index} className='flex gap-2 mb-1'>
          <div className={`${item.type === 'success' ? 'text-green-500' :
            item.type === 'error' ? 'text-red-500' :
              item.type === 'info' ? 'text-blue-500' : ''
            }`}>
            {getStatusIcon(item.type)}
          </div>
          <div className='flex justify-center flex-col'>
            <div className={`truncate text-gray-500`}>{item?.content}</div>
            {item.error as unknown as string && <div className="text-red-500 text-xs">{String(item.error as unknown as string)}</div>}
          </div>

        </div>
      ))}

      {store.message.length === 0 && (
        <div className="text-center py-4 text-gray-400">
          {t('loading')}...
        </div>
      )}
    </div>
  </div>
})

export const ShowRebuildEmbeddingProgressDialog = async (force = false) => {
  RootStore.Get(DialogStandaloneStore).setData({
    title: i18n.t('rebuilding-embedding-progress'),
    content: <ImportProgress force={force} />,
    isOpen: true,
    size: 'lg',
  })
}