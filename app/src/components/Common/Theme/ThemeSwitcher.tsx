import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { observer } from 'mobx-react-lite';
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { Icon } from '@/components/Common/Iconify/icons';
import { useTranslation } from 'react-i18next';

interface ThemeSwitcherProps {
  onChange?: (theme: string) => Promise<any>;
}

const ThemeSwitcher = observer(({ onChange }: ThemeSwitcherProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="flex items-center gap-2">
      <Dropdown>
        <DropdownTrigger>
          <Button
            variant="flat"
            isIconOnly
            type="button"
            className="py-2 transition duration-300 ease-in-out cursor-pointer"
          >
            {theme === 'dark' ? (
              <Icon icon="line-md:moon-alt-loop" width="24" height="24" />
            ) : (
              <Icon icon="line-md:sun-rising-loop" width="24" height="24" />
            )}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          onAction={async (key) => {
            await onChange?.(key.toString());
            if (key === 'system') {
              setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
            } else {
              setTheme(key.toString())
            }
          }}
        >
          <DropdownItem key="light" startContent={<Icon icon="line-md:sun-rising-loop" />}>
            {t('light-mode')}
          </DropdownItem>
          <DropdownItem key="dark" startContent={<Icon icon="line-md:moon-alt-loop" />}>
            {t('dark-mode')}
          </DropdownItem>
          <DropdownItem key="system" startContent={<Icon icon="mdi:theme-light-dark" />}>
            {t('follow-system')}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
});

export default ThemeSwitcher;
