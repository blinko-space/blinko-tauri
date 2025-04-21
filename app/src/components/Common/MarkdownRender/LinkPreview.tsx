import { useEffect } from 'react';
import { Card, Image } from '@heroui/react';
import { api } from '@/lib/trpc';
import { LinkInfo } from '@shared/lib/types';
import { RootStore } from '@/store';
import { StorageState } from '@/store/standard/StorageState';

interface LinkPreviewProps {
  href: any;
  text: any;
}

export const LinkPreview = ({ href, text }: LinkPreviewProps) => {
  const store = RootStore.Local(() => ({
    previewData: new StorageState<LinkInfo | null>({ key: href, default: null })
  }))
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!store.previewData.value) {
          const info = await api.public.linkPreview.query({ url: href }, { context: { skipBatch: true } })
          store.previewData.setValue(info)
        }
      } catch (error) {
        console.error('Error fetching preview data:', error);
      }
    };
    fetchData();
  }, [href]);

  const handleCardClick = () => {
    window.open(href, '_blank');
  };

  return (
    <div className="link-preview-container">
      <a href={href} target="_blank" rel="noopener noreferrer">{text}</a>
      {store.previewData?.value?.title && (
        <div 
          onClick={handleCardClick} 
          className='p-2 my-1 bg-sencondbackground rounded-xl select-none cursor-pointer'
        >
          <div className='flex items-center gap-2 w-full'>
            <div className='font-bold truncate text-sm'>{store.previewData.value?.title}</div>
            {store.previewData.value?.favicon && 
              <Image 
                fallbackSrc="/fallback.png" 
                className='flex-1 rounded-full ml-auto min-w-[16px]' 
                src={store.previewData.value.favicon} 
                width={16} 
                height={16}
              />
            }
          </div>
          <div className='text-desc truncate text-xs'>{store.previewData.value?.description}</div>
        </div>
      )}
    </div>
  );
}; 