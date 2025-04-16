import { useMediaQuery } from 'usehooks-ts';
import { IconButton } from '../IconButton';
import { useTranslation } from 'react-i18next';

interface Props {
  isFullscreen: boolean;
  onClick: () => void;
}

export const FullScreenButton = ({ isFullscreen, onClick }: Props) => {
  const { t } = useTranslation();
  const isPc = useMediaQuery('(min-width: 768px)');

  return (
    <div className='' onClick={onClick}>
      <IconButton
        tooltip={isFullscreen ? t('exit-fullscreen') : t('fullscreen')}
        icon={isFullscreen ? 'radix-icons:exit-full-screen' : 'basil:expand-outline'}
      />
    </div>
  );
}; 