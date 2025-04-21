import { Icon } from '@/components/Common/Iconify/icons';
import { observer } from "mobx-react-lite";
import { RootStore } from "@/store";
import { BaseStore } from "@/store/baseStore";
import { BlinkoStore } from "@/store/blinkoStore";
import { SideBarItem } from "./index";
import { useTranslation } from "react-i18next";
import { useSwiper } from "@/lib/hooks";
import { motion } from "framer-motion";
import { Link, useLocation, useSearchParams } from 'react-router-dom';

interface MobileNavBarProps {
  onItemClick?: () => void;
}

export const MobileNavBar = observer(({ onItemClick }: MobileNavBarProps) => {
  const base = RootStore.Get(BaseStore);
  const { t } = useTranslation();
  const blinkoStore = RootStore.Get(BlinkoStore);
  const isVisible = useSwiper();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  if (blinkoStore.config.value?.isHiddenMobileBar) {
    return null;
  }

  const routerInfo = {
    pathname: location.pathname,
    searchParams
  };

  // Get all visible items for mobile, including those that might be hidden in sidebar
  // Make sure to include items even if they have hiddenSidebar=true but hiddenMobile=false
  const mobileItems = base.routerList.filter(i => !i.hiddenMobile);

  return (
    <motion.div
      className="h-[70px] flex w-full px-4 py-2 gap-2 bg-background block md:hidden overflow-hidden fixed bottom-0 z-50"
      animate={{ y: isVisible ? 0 : 100 }}
      transition={{
        type: "tween",
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      {mobileItems.map(i => (
        <Link
          className={`flex-1 items-center justify-center flex !flex-col group ${SideBarItem} ${base.isSideBarActive(routerInfo, i) ? '!text-foreground' : '!text-desc'
            }`}
          key={i.title}
          to={i.href}
          onClick={() => {
            base.currentRouter = i;
            onItemClick?.();
          }}
        >
          <Icon className={`text-center`} icon={i.icon} width="20" height="20" />
          <div className="text-center text-[10px] mt-[-4px]">{t(i.title)}</div>
        </Link>
      ))}
    </motion.div>
  );
});