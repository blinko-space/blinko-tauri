import React from 'react';
import { CheckboxGroup, Button, Radio, RadioGroup } from "@heroui/react";
import { CustomCheckbox } from '../Common/CustomCheckbox';
import { useTranslation } from 'react-i18next';

interface AiTagProps {
  tags: string[];
  defaultSelected?: string[];
  onSelect: (selected: string[], isInsertBefore: boolean) => void;
  confirmText?: string;
  label?: string;
}

export const AiTag: React.FC<AiTagProps> = ({
  tags,
  defaultSelected = [],
  onSelect,
}) => {
  const [selected, setSelected] = React.useState<string[]>(defaultSelected);
  const [isInsertBefore, setIsInsertBefore] = React.useState(false);
  const { t } = useTranslation()
  const handleConfirm = () => {
    onSelect(selected, isInsertBefore);
  };

  const handleSelectAll = () => {
    setSelected(tags);
  };

  return (
    <div className="flex flex-col gap-4">
      <CheckboxGroup
        className="gap-1"
        orientation="horizontal"
        value={selected}
        onChange={setSelected}
      >
        {tags.map((tag) => (
          <CustomCheckbox key={tag} value={tag}>
            {tag}
          </CustomCheckbox>
        ))}
      </CheckboxGroup>
      <div className='flex mt-2 gap-2 items-center'>
        <RadioGroup
          orientation="horizontal"
          color='primary'
          className='flex-1'
          value={isInsertBefore ? 'insert-before' : 'insert-after'}
          onChange={(e) => {
            setIsInsertBefore(e.target.value === 'insert-before')
          }}
        >
          <Radio value="insert-before">{t('insert-before')}</Radio>
          <Radio value="insert-after">{t('insert-after')}</Radio>
        </RadioGroup>
        <Button onPress={handleSelectAll}>{t('select-all')}</Button>
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