import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Icon } from '@/components/Common/Iconify/icons';
import { Button, Slider } from '@heroui/react';
import { RootStore } from '@/store';
import { ToastPlugin } from '@/store/module/Toast/Toast';
import dayjs from '@/lib/dayjs';
import { useTranslation } from 'react-i18next';
import { api } from '@/lib/trpc';
import { PromiseState } from '@/store/standard/PromiseState';
import { MarkdownRender } from '../Common/MarkdownRender';
import { ScrollArea } from '../Common/ScrollArea';
import { BlinkoStore } from '@/store/blinkoStore';
import { DialogStore } from '@/store/module/Dialog';
import { LoadingAndEmpty } from '../Common/LoadingAndEmpty';

interface HistoryItem {
  id: number;
  version: number;
  content: string;
  createdAt: Date;
  metadata: any;
}

interface NoteHistoryModalProps {
  noteId: number;
}

const NoteHistoryModal = observer(({ noteId }: NoteHistoryModalProps) => {
  const { t } = useTranslation();
  const toast = RootStore.Get(ToastPlugin);
  const [sliderValue, setSliderValue] = useState<number>(0);

  const Store = RootStore.Local(() => ({
    loading: true,
    restoring: false,
    currentHistoryIndex: 0,
    get currentHistory() {
      return Store.historyList.value?.[Store.currentHistoryIndex];
    },
    historyList: new PromiseState({
      function: async (params: { noteId: number }) => {
        return await api.notes.getNoteHistory.query(params);
      },
    }),
    noteDetail: new PromiseState({
      function: async (params: { id: number }) => {
        return await api.notes.detail.mutate(params);
      },
    }),
    restoreNoteVersion: new PromiseState({
      function: async (params: { noteId: number; content: string }) => {
        await api.notes.upsert.mutate({
          id: params.noteId,
          content: params.content,
        });

        return true;
      },
    }),
    fetchData: async () => {
      if (noteId > 0) {
        Store.loading = true;
        try {
          await Store.historyList.call({
            noteId,
          });

          setSliderValue(0);
          Store.currentHistoryIndex = 0;
        } catch (error) {
          toast.error(error.message);
        } finally {
          Store.loading = false;
        }
      }
    },

    // Handle restore button click
    handleRestore: async () => {
      if (!Store.historyList.value || Store.historyList.value.length === 0) {
        return;
      }

      const historyItem = Store.historyList.value[Store.currentHistoryIndex];
      if (!historyItem) return;

      Store.restoring = true;
      try {
        await Store.restoreNoteVersion.call({
          noteId,
          content: historyItem.content,
        });
      } catch (error) {
        toast.error(error.message);
      } finally {
        Store.restoring = false;
        RootStore.Get(BlinkoStore).updateTicker++;
        RootStore.Get(DialogStore).close();
      }
    },

    // Gets the version label for display
    getVersionLabel: () => {
      if (!Store.historyList.value || Store.historyList.value.length === 0) {
        return '';
      }

      const item = Store.historyList.value[Store.currentHistoryIndex];
      if (!item) return '';

      return `${t('version')} ${item.version} (${dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss')})`;
    },

    getContentSummary: (content: string, maxLength: number = 150) => {
      if (!content) return '';
      const plainText = content.replace(/<[^>]*>/g, '');
      return plainText.length > maxLength ? plainText.slice(0, maxLength) + '...' : plainText;
    },
  }));

  // Load note history
  useEffect(() => {
    Store.fetchData();
  }, [noteId]);

  // Called when slider changes
  const handleSliderChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setSliderValue(value[0]);
      Store.currentHistoryIndex = value[0];
    } else {
      setSliderValue(value);
      Store.currentHistoryIndex = value;
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      <LoadingAndEmpty className="mb-4" isLoading={Store.loading} isEmpty={!Store.historyList.value || Store.historyList.value.length === 0} />
      {Store.historyList.value && Store.historyList.value.length > 0 && (
        <>
          <div className="flex flex-col items-center mb-4 px-4">
            <div className="w-full flex justify-between items-center mb-2">
              <span className="text-sm flex items-center text-desc">
                <Icon icon="carbon:time" className="mr-1 text-desc" />
                {t('newer')}
              </span>
              <span className="text-sm font-medium text-primary">{Store.getVersionLabel()}</span>
              <span className="text-sm flex items-center text-desc">
                {t('older')}
                <Icon icon="carbon:time-filled" className="ml-1 text-desc" />
              </span>
            </div>

            <Slider
              color="primary"
              step={1}
              maxValue={Math.max(0, (Store.historyList.value?.length || 1) - 1)}
              minValue={0}
              value={sliderValue}
              onChange={handleSliderChange}
              className="w-full"
              showSteps={true}
              size="sm"
            />

            <div className="w-full mt-2">
              <p className="text-xs text-amber-500 flex items-center">
                <Icon icon="carbon:information" className="mr-1" width={14} height={14} />
                {t('history-note-only')}
              </p>
            </div>
          </div>

          <ScrollArea className="flex-1 w-full p-4 max-h-[400px]" onBottom={() => {}}>
            <MarkdownRender content={Store.currentHistory?.content || ''} />
          </ScrollArea>

          <div className="flex justify-end mt-4">
            <Button color="primary" isLoading={Store.restoring} onPress={Store.handleRestore} startContent={<Icon icon="material-symbols:settings-backup-restore-rounded" />}>
              {t('restore-this-version')}
            </Button>
          </div>
        </>
      )}
    </div>
  );
});

export default NoteHistoryModal;
