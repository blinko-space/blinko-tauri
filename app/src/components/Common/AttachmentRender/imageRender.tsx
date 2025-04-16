import { useEffect, useMemo, useState } from 'react';
import { FileType } from '../Editor/type';
import { Image } from '@heroui/react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { Icon } from '@/components/Common/Iconify/icons';
import { DeleteIcon, DownloadIcon, InsertConextButton } from './icons';
import { observer } from 'mobx-react-lite';
import { useMediaQuery } from 'usehooks-ts';
import { DraggableFileGrid } from './DraggableFileGrid';

type IProps = {
  files: FileType[]
  preview?: boolean
  columns?: number
  onReorder?: (newFiles: FileType[]) => void
}
export const ImageThumbnailRender = ({ src, className }: { src: string, className?: string }) => {
  const [isOriginalError, setIsOriginalError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(
    `${src}?thumbnail=true`
  );

  useEffect(() => {
    if (isOriginalError) {
      setCurrentSrc('/image-fallback.svg')
    }
  }, [isOriginalError])

  return <Image
    src={currentSrc}
    classNames={{
      wrapper: '!max-w-full',
    }}
    draggable={false}
    onError={() => {
      if (src === currentSrc) {
        return setIsOriginalError(true)
      }
      setCurrentSrc(src)
    }}
    className={`object-cover w-full ${className}`}
  />
}

const ImageRender = observer((props: IProps) => {
  const { files, preview = false, columns } = props
  const isPc = useMediaQuery('(min-width: 768px)')

  const imageRenderClassName = useMemo(() => {
    if (!preview) {
      return 'flex flex-row gap-2 overflow-x-auto pb-2'
    }
    return 'flex flex-wrap gap-2'
  }, [preview, columns])

  const imageHeight = useMemo(() => {
    if (!preview) {
      return 'h-[160px] w-[160px]'
    }
    return 'md:h-[180px] md:w-[180px] h-[120px] w-[120px] object-cover'
  }, [preview, columns])

  const renderImage = (file: FileType) => (
    <div className={`relative group ${!preview ? 'min-w-[160px] flex-shrink-0' : ''} ${imageHeight}`}>
      {file.uploadPromise?.loading?.value && (
        <div className='absolute inset-0 flex items-center justify-center w-full h-full'>
          <Icon icon="line-md:uploading-loop" width="40" height="40" />
        </div>
      )}
      <div className='w-full'>
        <PhotoView src={file.preview}>
          <div>
            <ImageThumbnailRender
              src={file.preview}
              className={`mb-4 ${imageHeight} object-cover md:w-[1000px]`}
            />
          </div>
        </PhotoView>
      </div>
      {!file.uploadPromise?.loading?.value && !preview &&
        <InsertConextButton className='absolute z-10 left-[5px] top-[5px]' files={files} file={file} />
      }
      {!file.uploadPromise?.loading?.value && !preview &&
        <DeleteIcon className='absolute z-10 right-[5px] top-[5px]' files={files} file={file} />
      }
      {preview && <DownloadIcon file={file} />}
    </div>
  )

  return (
    <PhotoProvider>
      <DraggableFileGrid
        files={files}
        preview={preview}
        columns={columns}
        type="image"
        className={imageRenderClassName}
        renderItem={renderImage}
        onReorder={props.onReorder}
      />
    </PhotoProvider>
  )
})

export { ImageRender }