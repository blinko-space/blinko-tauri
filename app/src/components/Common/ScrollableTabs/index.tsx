import { Button } from '@heroui/react';
import { Tabs, Tab } from '@heroui/react';
import { Icon } from '@/components/Common/Iconify/icons';
import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';

export type TabItem = {
  key: string;
  title: string | React.ReactNode;
  icon?: string;
};

interface ScrollableTabsProps {
  items: TabItem[];
  selectedKey: string;
  onSelectionChange: (key: string) => void;
  color?: 'primary' | 'secondary' | 'default' | 'success' | 'warning' | 'danger';
  classNames?: {
    base?: string;
    tabList?: string;
    tab?: string;
    cursor?: string;
  };
}

export const ScrollableTabs = ({ items, selectedKey, onSelectionChange, color = 'primary', classNames = {} }: ScrollableTabsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const { t } = useTranslation();
  const checkScroll = () => {
    if (!containerRef.current) return;
    const tabList = containerRef.current.querySelector('[role="tablist"]');
    if (!tabList) return;

    const { scrollLeft, scrollWidth, clientWidth } = tabList as HTMLElement;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const timer = setTimeout(checkScroll, 100);

    const tabList = containerRef.current?.querySelector('[role="tablist"]');
    if (tabList) {
      tabList.addEventListener('scroll', checkScroll);
    }

    window.addEventListener('resize', checkScroll);

    return () => {
      clearTimeout(timer);
      if (tabList) {
        tabList.removeEventListener('scroll', checkScroll);
      }
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    const tabList = containerRef.current.querySelector('[role="tablist"]');
    if (!tabList) return;

    const scrollAmount = 200;
    (tabList as HTMLElement).scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative" ref={containerRef}>
      {showLeftArrow && (
        <Button isIconOnly variant="light" className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/60 backdrop-blur-sm" size="sm" onPress={() => scroll('left')}>
          <Icon icon="tabler:chevron-left" width="18" />
        </Button>
      )}
      <Tabs
        aria-label="Scrollable tabs"
        color={color}
        selectedKey={selectedKey}
        onSelectionChange={(key) => onSelectionChange(key as string)}
        classNames={{
          base: 'w-full ' + (classNames.base || ''),
          tabList: 'gap-2 relative p-2 w-full bg-transparent text-foreground overflow-x-auto scroll-smooth ' + (classNames.tabList || ''),
          cursor: 'shadow-medium rounded-xl ' + (classNames.cursor || ''),
          tab: 'max-w-fit px-3 h-10 rounded-xl ' + (classNames.tab || ''),
        }}
      >
        {items.map((item) => (
          <Tab
            key={item.key}
            title={
              typeof item.title === 'string' && item.icon ? (
                <div className="flex items-center space-x-2">
                  <Icon icon={item.icon} width="18" />
                  <span className="text-sm">{t(item.title)}</span>
                </div>
              ) : (
                t(item.title as any)
              )
            }
          />
        ))}
      </Tabs>
      {showRightArrow && (
        <Button isIconOnly variant="light" className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/60 backdrop-blur-sm" size="sm" onPress={() => scroll('right')}>
          <Icon icon="tabler:chevron-right" width="18" />
        </Button>
      )}
    </div>
  );
};
