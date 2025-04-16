import { Image } from '@heroui/react';
import { PhotoProvider, PhotoView } from 'react-photo-view';

interface ImageWrapperProps {
  src?: string;
  width?: number | string;
  height?: number | string;
  alt?: string;
}

export const ImageWrapper = ({ src = '', width, height, alt }: ImageWrapperProps) => {
  const props = { width, height, alt }
  if (!src) return null;
  
  return (
    <div className='markdown-image-wrapper w-full'>
      <PhotoProvider>
        <PhotoView src={src} >
          <Image src={src} {...props}
            classNames={{
              wrapper: '!max-w-fit !m-auto',
            }} className='w-full max-h-[200px] object-cover' />
        </PhotoView>
      </PhotoProvider>
    </div>
  );
}; 