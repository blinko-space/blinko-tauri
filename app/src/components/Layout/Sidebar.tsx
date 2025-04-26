import { Icon } from '@/components/Common/Iconify/icons';
import { observer } from 'mobx-react-lite';
import { Button, ScrollShadow } from '@heroui/react';
import { RootStore } from '@/store';
import { BaseStore } from '@/store/baseStore';
import { SideBarItem } from './index';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'usehooks-ts';
import { UserAvatarDropdown } from '../Common/UserAvatarDropdown';
import { TagListPanel } from '../Common/TagListPanel';
import { useEffect } from 'react';
import { BlinkoStore } from '@/store/blinkoStore';
import { useLocation, useSearchParams, Link, useNavigate } from 'react-router-dom';
import { eventBus } from '@/lib/event';

interface SidebarProps {
  onItemClick?: () => void;
}

export const Sidebar = observer(({ onItemClick }: SidebarProps) => {
  const isPc = useMediaQuery('(min-width: 768px)');
  const { t } = useTranslation();
  const base = RootStore.Get(BaseStore);
  const navigate = useNavigate();
  const blinkoStore = RootStore.Get(BlinkoStore);
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const routerInfo = {
    pathname: location.pathname,
    searchParams
  };

  useEffect(() => {
    console.log('router.query');
    if (!isPc) {
      base.collapseSidebar();
    }
  }, [isPc]);

  return (
    <div
      style={{ width: isPc ? `${base.sideBarWidth}px` : '100%' }}
      className={`flex h-full flex-1 flex-col p-4 relative bg-background 
        ${!base.isDragging ? '!transition-all duration-300' : 'transition-none'} 
        group/sidebar`}
    >
      {!base.isSidebarCollapsed && (
        <div
          className={`absolute right-0 top-0 h-full w-2 cursor-col-resize z-49
            ${base.isResizing ? 'bg-primary/40' : ''}`}
          onMouseDown={base.startResizing}
          onClick={(e) => e.stopPropagation()}
          style={{ touchAction: 'none' }}
        />
      )}

      <div className={`flex items-center ${base.isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
        <div className={`flex w-full ${base.isSidebarCollapsed ? 'flex-col-reverse gap-2 justify-center items-center mr-2 mb-2' : 'items-center '}`}>
          {/* Mobile: Display avatar dropdown at the top */}
          <div className={`${base.isSidebarCollapsed ? 'w-full flex justify-center' : ''}`}>
            <UserAvatarDropdown onItemClick={onItemClick} collapsed={base.isSidebarCollapsed} />
          </div>

          {/* Toggle sidebar button for PC */}
          {isPc ? (
            <Button
              isIconOnly
              variant="light"
              className={`opacity-0 group-hover/sidebar:opacity-100 ml-auto ${!base.isSidebarCollapsed ? 'group-hover/sidebar:-translate-x-1 ' : 'opacity-100 translate-x-0'}`}
              onPress={base.toggleSidebar}
            >
              <Icon icon={base.isSidebarCollapsed ? 'mdi:chevron-right' : 'mdi:chevron-left'} width="20" height="20" />
            </Button>
          ) : (
            <Button
              isIconOnly
              variant="light"
              className="ml-auto"
              onPress={() => {
                navigate('/settings')
                eventBus.emit('close-sidebar')
              }}
            >
              <Icon icon="hugeicons:settings-01" width="20" height="20" />
            </Button>
          )}
        </div>
      </div>

      <ScrollShadow className="-mr-[16px] mt-[-5px] h-full max-h-full pr-6 hide-scrollbar">
        <div className={`flex flex-col gap-2 mt-4 font-semibold ${base.isSidebarCollapsed ? 'items-center gap-4' : ''}`}>
          {base.routerList
            .filter((i) => !i.hiddenSidebar)
            .map((i) => (
              <Link
                key={i.title}
                to={i.href}
                onClick={() => {
                  base.currentRouter = i;
                  onItemClick?.();
                }}
                className={`flex items-center gap-2 group ${SideBarItem} ${base.isSideBarActive(routerInfo, i) ? '!bg-primary  !text-primary-foreground' : ''}`}
              >
                <Icon className={`${base.isSidebarCollapsed ? 'mx-auto' : ''}`} icon={i.icon} width="20" height="20" />
                {!base.isSidebarCollapsed && <span className="!transition-all">{t(i.title)}</span>}
              </Link>
            ))}
          {!base.isSidebarCollapsed && blinkoStore.tagList.value?.listTags.length != 0 && blinkoStore.tagList.value?.listTags && <TagListPanel />}
        </div>
      </ScrollShadow>

      {/* ***** background *****  */}
      <div className="halation absolute inset-0 h-[250px] w-[250px] overflow-hidden blur-3xl z-[0] pointer-events-none">
        <div className="w-full h-[100%] bg-[#ffc65c] opacity-20" style={{ clipPath: 'circle(35% at 50% 50%)' }} />
      </div>
    </div>
  );
});
