import { useDropzone } from "react-dropzone";
import { Button } from "@heroui/react";
import { Icon } from '@/components/Common/Iconify/icons';
import { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { RootStore } from "@/store";
import { ToastPlugin } from "@/store/module/Toast/Toast";
import { BlinkoStore } from "@/store/blinkoStore";
import { observer } from "mobx-react-lite";

type IProps = {
  onUpload?: ({ filePath, fileName }) => void
  children?: React.ReactNode
  acceptImage?: boolean
}

export const UploadFileWrapper = observer(({ onUpload, children, acceptImage = false }: IProps) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const blinko = RootStore.Get(BlinkoStore)
  const {
    getRootProps,
    getInputProps,
    open
  } = useDropzone({
    multiple: false,
    noClick: true,
    accept: acceptImage ? {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    } : undefined,
    onDrop: async acceptedFiles => {
      setIsLoading(true)
      try {
        const file = acceptedFiles[0]!
        const formData = new FormData();
        formData.append('file', file)

        const { onUploadProgress } = RootStore.Get(ToastPlugin)
          .setSizeThreshold(40)
          .uploadProgress(file);

        const response = await axios.post('/api/file/upload', formData, {
          onUploadProgress
        });

        onUpload?.(response.data)
      } catch (error) {
        console.error('Upload failed:', error);
      } finally {
        setIsLoading(false)
      }
    }
  });

  return <div {...getRootProps()}>
    <input {...getInputProps()} />
    {children ?
      <div onClick={open}>{children}</div>
      : <Button
        isDisabled={blinko.config.value?.objectStorage === 's3'}
        onPress={open}
        isLoading={isLoading}
        color='primary'
        startContent={<Icon icon="tabler:upload" width="24" height="24" />}
      >
        {t('upload')}
      </Button>}
  </div>
})