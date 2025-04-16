import { Button } from "@heroui/react";
import { Icon } from '@/components/Common/Iconify/icons';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Offline() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4 p-4 text-center">
        <Icon 
          icon="mdi:wifi-off" 
          className="text-warning h-16 w-16"
        />
        <h1 className="text-xl font-bold">
          {t('offline-title', 'You are offline')}
        </h1>
        <p className="text-default-500">
          {t('offline-description', 'Please check your internet connection and try again')}
        </p>
        <div className="flex gap-2">
          <Button
            color="primary"
            variant="flat"
            onPress={() => window.location.reload()}
            startContent={<Icon icon="mdi:refresh" />}
          >
            {t('retry', 'Retry')}
          </Button>
          <Button
            variant="light"
            onPress={() => navigate('/')}
            startContent={<Icon icon="mdi:home" />}
          >
            {t('back-to-home', 'Back to Home')}
          </Button>
        </div>
      </div>
    </div>
  );
}
