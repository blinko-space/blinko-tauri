import { observer } from "mobx-react-lite";
import {
  Input,
  Select,
  SelectItem,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Progress,
} from "@heroui/react";
import { RootStore } from "@/store";
import { BlinkoStore } from "@/store/blinkoStore";
import { PromiseCall } from "@/store/standard/PromiseState";
import { helper } from "@/lib/helper";
import dayjs from "@/lib/dayjs";
import { Icon } from '@/components/Common/Iconify/icons';
import { api } from "@/lib/trpc";
import { Item } from "./Item";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { _ } from "@/lib/lodash";
import { CollapsibleCard } from "../Common/CollapsibleCard";

const UpdateDebounceCall = _.debounce((v) => {
  return PromiseCall(api.config.update.mutate({ key: 'autoArchivedDays', value: Number(v) }))
}, 500)

export const TaskSetting = observer(() => {
  const blinko = RootStore.Get(BlinkoStore)
  const [autoArchivedDays, setAutoArchivedDays] = useState("90")
  const [polling, setPolling] = useState(false);

  useEffect(() => {
    if (blinko.config.value?.autoArchivedDays) {
      setAutoArchivedDays(String(blinko.config.value?.autoArchivedDays))
    }
  }, [blinko.config.value?.autoArchivedDays])

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (polling) {
      timer = setInterval(() => {
        blinko.task.call();
      }, 1000);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [polling]);

  const { t } = useTranslation()
  return (
    <CollapsibleCard
      icon="tabler:clock"
      title={t('schedule-task')}
    >
      <Item
        leftContent={<>{t('schedule-back-up')}</>}
        rightContent={
          <Switch
            thumbIcon={blinko.updateDBTask.loading.value ? <Icon icon="eos-icons:three-dots-loading" width="24" height="24" /> : null}
            isDisabled={blinko.updateDBTask.loading.value}
            isSelected={blinko.DBTask?.isRunning}
            onChange={async e => {
              setPolling(true);
              await blinko.updateDBTask.call(e.target.checked);
              setPolling(false);
            }}
          />} />
      <Item
        leftContent={<>{t('schedule-archive-blinko')}</>}
        rightContent={
          <div className="flex gap-4">
            <Input
              value={autoArchivedDays}
              onChange={e => {
                setAutoArchivedDays(e.target.value)
                UpdateDebounceCall(e.target.value)
              }}
              className="w-[120px]"
              labelPlacement="outside"
              endContent={t('days')}
              type="number"
              min={1}
            />
            <Switch
              thumbIcon={blinko.updateArchiveTask.loading.value ? <Icon icon="eos-icons:three-dots-loading" width="24" height="24" /> : null}
              isDisabled={blinko.updateArchiveTask.loading.value}
              isSelected={blinko.ArchiveTask?.isRunning}
              onChange={async e => {
                await blinko.updateArchiveTask.call(e.target.checked)
              }}
            />
          </div>} />
      <TasksPanel />
    </CollapsibleCard>
  );
})

const TasksPanel = observer(() => {
  const { t } = useTranslation()
  const blinko = RootStore.Get(BlinkoStore)
  return <> {blinko.task.value && <Table shadow="none" className="mb-2">
    <TableHeader>
      <TableColumn>{t('name-db')}</TableColumn>
      <TableColumn>{t('schedule')}</TableColumn>
      <TableColumn>{t('last-run')}</TableColumn>
      <TableColumn>{t('backup-file')}</TableColumn>
      <TableColumn>{t('status')}</TableColumn>
    </TableHeader>
    <TableBody>
      {
        blinko.task.value!.filter(i => i.name != 'rebuildEmbedding').map(i => {
          const progress = i.output?.progress;
          return <TableRow>
            <TableCell>{i.name}</TableCell>
            <TableCell>
              <Select
                selectedKeys={[i.schedule]}
                onChange={async e => {
                  await PromiseCall(api.task.upsertTask.mutate({
                    time: e.target.value,
                    type: 'update',
                    task: i.name as any
                  }))
                  blinko.task.call()
                }}
                size="sm"
                className="w-[200px]"
              >
                {helper.cron.cornTimeList.map((item) => (
                  <SelectItem key={item.value}>
                    {t(item.label)}
                  </SelectItem>
                ))}
              </Select>
            </TableCell>
            <TableCell>{dayjs(i?.lastRun).fromNow()}</TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                {
                  i.output?.filePath && <>
                    {/* @ts-ignore  */}
                    {i.output?.filePath}
                    {/* @ts-ignore  */}
                    <Icon className='cursor-pointer' onClick={e => helper.download.downloadByLink(i?.output?.filePath)} icon="tabler:download" width="24" height="24" />
                  </>
                }
                {progress && !i.output?.filePath && (
                  <div className="w-full max-w-[200px]">
                    <Progress
                      size="sm"
                      value={progress.percent}
                      color="primary"
                      className="max-w-md"
                      showValueLabel={true}
                    />
                    <div className="text-xs text-gray-500">
                      {`${(progress.processedBytes / (1024 * 1024)).toFixed(2)} MB`}
                    </div>
                  </div>
                )}
              </div>
            </TableCell>
            <TableCell>
              <div className={`${i?.isRunning ? 'text-green-500' : 'text-red-500'} flex items-center `}>
                <Icon icon="bi:dot" width="24" height="24" />
                <div className="min-w-[50px]">
                  {i?.isRunning ? (
                    progress ? `${t('running')}` : t('running')
                  ) : t('stopped')}
                </div>
              </div>
            </TableCell>
          </TableRow>
        })
      }
    </TableBody>
  </Table>
  } </>
})
