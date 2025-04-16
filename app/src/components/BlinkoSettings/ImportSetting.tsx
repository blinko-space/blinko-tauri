import { observer } from "mobx-react-lite";
import { RootStore } from "@/store";
import { Item, ItemWithTooltip } from "./Item";
import { useTranslation } from "react-i18next";
import { UploadFileWrapper } from "../Common/UploadFile";
import { ToastPlugin } from "@/store/module/Toast/Toast";
import { useMediaQuery } from "usehooks-ts";
import { ShowMemosProgressDialog } from "../Common/ImportMemosProgress";
import { ShowBlinkoProgressDialog } from "../Common/ImportBlinkoProgress";
import { CollapsibleCard } from "../Common/CollapsibleCard";


export const ImportSetting = observer(() => {
  const isPc = useMediaQuery('(min-width: 768px)')
  const { t } = useTranslation()

  return <CollapsibleCard
    icon="tabler:file-import"
    title={t('import')}
  >
    <Item
      leftContent={<ItemWithTooltip content={t('import-from-bko')} toolTipContent={<div>{t('import-from-bko-tip')}</div>} />}
      rightContent={<>
        <UploadFileWrapper onUpload={async ({ filePath, fileName }) => {
          if (!fileName.endsWith('.bko')) {
            return RootStore.Get(ToastPlugin).error(t('not-a-bko-file'))
          }
          ShowBlinkoProgressDialog(filePath)
        }}>
        </UploadFileWrapper>
      </>} />

    <Item
      type={isPc ? 'row' : 'col'}
      leftContent={<div className="flex flex-col  gap-2">
        <div>{t('import-from-memos-memos_prod-db')}</div>
        <div className="text-desc text-xs">{t('when-exporting-memos_prod-db-please-close-the-memos-container-to-avoid-partial-loss-of-data')}</div>
      </div>}
      rightContent={<div className="flex w-full ml-auto justify-end">
        <UploadFileWrapper onUpload={async ({ filePath, fileName }) => {
          if (!fileName.endsWith('.db')) {
            return RootStore.Get(ToastPlugin).error('Not a Memos database file')
          }
          ShowMemosProgressDialog(filePath)
        }}>
        </UploadFileWrapper>
      </div>} />
  </CollapsibleCard>
})