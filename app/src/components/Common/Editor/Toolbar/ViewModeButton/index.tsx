import { IconButton } from '../IconButton';
import { useTranslation } from 'react-i18next';
import { eventBus } from '@/lib/event';
import { useMediaQuery } from 'usehooks-ts';

interface Props {
  viewMode: "wysiwyg" | "sv" | "ir";
}

export const ViewModeButton = ({ viewMode }: Props) => {
  const { t } = useTranslation();
  
  const isPc = useMediaQuery('(min-width: 768px)')

  const getNextMode = () => {
    if (!isPc) {
      return viewMode === 'sv' ? 'ir' : 'sv';
    } else {
      return viewMode === 'ir' ? 'sv' : 'ir';
    }
  };

  const getButtonIcon = () => {
    if (!isPc) {
      return viewMode === 'sv' ? 'tabler:source-code' : 'grommet-icons:form-view';
    } else {
      return viewMode === 'ir' ? 'grommet-icons:form-view' : 'tabler:source-code';
    }
  };

  const getTooltipText = () => {
    if (!isPc) {
      return viewMode === 'sv' ? t('preview-mode') : t('source-code');
    } else {
      return viewMode === 'ir' ? t('preview-mode') : t('source-code');
    }
  };

  return (
    <div className=''
      onClick={() => {
        const nextMode = getNextMode();
        eventBus.emit('editor:setViewMode', nextMode);
      }}
    >
      <IconButton
        tooltip={getTooltipText()}
        icon={getButtonIcon()}
      />
    </div>
  );
}; 