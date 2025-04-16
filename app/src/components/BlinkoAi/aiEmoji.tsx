import React from 'react';
import { Button } from "@heroui/react";
import { useTranslation } from 'react-i18next';

interface AiEmojiProps {
  emojis: string[];
  defaultSelected?: string;
  onSelect: (selected: string) => void;
  label?: string;
}

export const AiEmoji: React.FC<AiEmojiProps> = ({
  emojis,
  defaultSelected = "",
  onSelect,
}) => {
  const [selected, setSelected] = React.useState<string>(defaultSelected);
  const { t } = useTranslation()

  const handleConfirm = () => {
    onSelect(selected);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2 items-center justify-center">
        {emojis.map((emoji) => (
          <Button
            size='lg'
            key={emoji}
            isIconOnly
            className='text-2xl'
            variant={selected === emoji ? "solid" : "bordered"}
            onPress={() => setSelected(emoji)}
          >
            {emoji}
          </Button>
        ))}
      </div>
      <div className='flex mt-2 gap-2 items-center'>
        <Button
          color="primary"
          onPress={handleConfirm}
          className="w-fit ml-auto"
        >
          {t('confirm')}
        </Button>
      </div>
    </div>
  );
};