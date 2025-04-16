import { IconButton } from '../IconButton';
import { useTranslation } from 'react-i18next';
import { NoteType } from '@shared/lib/types';
import { Div } from '@/components/Common/Div';
import { useEffect, useState } from 'react';

export const NoteTypeButton = ({ noteType, setNoteType}: {
  noteType: NoteType,
  setNoteType: (noteType: NoteType) => void
}) => {
  const { t } = useTranslation();
  const [type, setType] = useState(noteType);

  useEffect(() => {
    setType(noteType);
  }, [noteType]);
  
  return (
    <Div
      onTap={() => {
        const newType = type == NoteType.BLINKO ? NoteType.NOTE : NoteType.BLINKO;
        setType(newType);
        setNoteType(newType);
      }}>
      <IconButton
        icon={type == NoteType.BLINKO ? 'basil:lightning-solid' : 'solar:notes-minimalistic-bold-duotone'}
        classNames={{
          icon: type == NoteType.BLINKO ? '!text-[#FFD700]' : '!text-[#3B82F6]'
        }}
        tooltip={type == NoteType.BLINKO ? t('blinko') : t('note')}
      />
    </Div>

  );
}; 