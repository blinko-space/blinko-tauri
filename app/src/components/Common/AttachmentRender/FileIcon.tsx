import { helper } from '@/lib/helper';
import { Icon } from '@/components/Common/Iconify/icons';
import { observer } from 'mobx-react-lite';
import { FileIcon, defaultStyles } from 'react-file-icon';
import { useMediaQuery } from 'usehooks-ts';

//path xxx.png
export const FileIcons = observer(({ path, size = 15, className, isLoading = false }: { path: string, size?: number, className?: string, isLoading?: boolean }) => {
  const extension = helper.getFileExtension(path)
  const isPc = useMediaQuery('(min-width: 768px)')
  return <div style={{ width: isPc ? size + 'px' : size - 2 + 'px', minWidth: isPc ? size + 'px' : size - 2 + 'px' }} className={`${className ?? ''}`}>
    <div className='w-full h-full relative'>
      {isLoading && <div className='absolute inset-0 flex items-center justify-center w-full h-full'>
        <Icon icon="line-md:uploading-loop" width="24" height="24" className='!text-green-500' />
      </div>}
      <div className={`${isLoading ? 'opactiy-10 ' : ''}`}><FileIcon extension={extension} {...defaultStyles[extension ?? '']} /></div>
    </div>
  </div>
})