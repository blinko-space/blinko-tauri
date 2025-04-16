import { streamApi } from '@/lib/trpc'
import { type ProgressResult } from '@shared/lib/types'
import { RootStore } from '@/store'
import { BlinkoStore } from '@/store/blinkoStore'
import { DialogStore } from '@/store/module/Dialog'
import { Progress } from '@heroui/react'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'


export const ImportProgress = observer(({ filePath }: { filePath: string }) => {
  const { t } = useTranslation()
  const blinko = RootStore.Get(BlinkoStore)
  const store = RootStore.Local(() => ({
    progress: 0,
    total: 0,
    message: [] as ProgressResult[],
    status: '',
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
    handleAsyncGenerator: async () => {
      const asyncGeneratorRes = await streamApi.task.importFromMemos.mutate({ filePath })
      for await (const item of asyncGeneratorRes) {
        store.progress = item.progress?.current ?? 0
        store.total = item.progress?.total ?? 0
        store.message.unshift(item)
        store.status = item.type === 'success' ? 'success' : 'error'
      }
      store.message.unshift({
        type: 'success',
        content: t('import-done'),
      })
      blinko.updateTicker++
    }
  }))

  useEffect(() => {
    store.handleAsyncGenerator()
  }, [])

  return <div >
    <Progress
      size="sm"
      radius="sm"
      color="warning"
      label="Progress"
      value={store.value}
      showValueLabel={true}
    />
    <div className='flex flex-col max-h-[400px] overflow-y-auto mt-2' >
      {store.message.map((item, index) => (
        <div className='flex gap-2'>
          <div className={`${item.type === 'success' ? 'text-green-500' : item.type === 'error' ? 'text-red-500' : ''}`}>
            {item.type == 'skip' ? '🔄' : item.type == 'success' ? '✅' : '❌'}
          </div>
          <div key={index} className={`truncate text-gray-500`}>{item?.content}</div>
        </div>
      ))}
    </div>
  </div>
})

export const ShowMemosProgressDialog = async (filePath: string) => {
  RootStore.Get(DialogStore).setData({
    title: 'Import Progress',
    content: <ImportProgress filePath={filePath} />,
    isOpen: true,
    size: 'lg',
  })
}