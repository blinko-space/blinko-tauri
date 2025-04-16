import { observer } from "mobx-react-lite";
import { Tabs, Tab, Card, Button, Chip, Input, CardBody, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { RootStore } from "@/store";
import { CollapsibleCard } from "../Common/CollapsibleCard";
import { Icon } from '@/components/Common/Iconify/icons';
import { DialogStandaloneStore } from "@/store/module/DialogStandalone";
import { useState, useEffect } from "react";
import { PluginManagerStore } from "@/store/plugin/pluginManagerStore";
import i18n from "@/lib/i18n";
import { type PluginInfo } from "@shared/lib/types";
import { LoadingAndEmpty } from "../Common/LoadingAndEmpty";
import { PromiseCall } from "@/store/standard/PromiseState";
import { I18nString } from "@/store/plugin";
import { PluginRender } from "@/store/plugin/pluginRender";
import { compareVersions } from "@/lib/utils/versionUtils";
import { api } from "@/lib/trpc";

interface PluginCardProps {
  name: string;
  version: string;
  displayName?: I18nString;
  description?: I18nString;
  author?: string;
  downloads?: number;
  actionButton: React.ReactNode;
  url?: string;
}

const PluginCard = ({ name, version, displayName, description, author, downloads, actionButton, url }: PluginCardProps) => {
  const { t } = useTranslation();
  return (
    <Card key={name} className="group relative overflow-hidden backdrop-blur-sm border border-default-200 dark:border-default-100/20">
      <div className="absolute inset-0 bg-gradient-to-r from-default-100/50 via-default-200/30 to-default-100/50 dark:from-default-50/10 dark:via-default-100/5 dark:to-default-50/10 opacity-0 transition-opacity duration-300" />

      <CardBody className="p-5">
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold hover:text-primary cursor-pointer" onClick={() => url && window.open(url, '_blank')}>
                      {displayName?.[i18n.language] || displayName?.default}
                    </h3>
                    {url && (
                      <Icon
                        icon="mdi:github"
                        className="text-lg text-default-500 hover:text-primary cursor-pointer"
                        onClick={() => window.open(url, '_blank')}
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Chip
                      size="sm"
                      variant="flat"
                      color="success"
                      className="px-2 h-5 text-xs font-medium"
                    >
                      v{version}
                    </Chip>
                    {author && (
                      <span className="text-xs text-default-500">
                        by <span className="text-default-700 dark:text-default-400">{author}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-4">
              {actionButton}
            </div>
          </div>

          <p className="text-sm text-default-600 dark:text-default-400 leading-relaxed">
            {description?.[i18n.language] || description?.default}
          </p>

          {!!downloads && downloads > 0 && (
            <div className="flex items-center gap-4 mt-1">
              <div className="flex items-center gap-1.5 text-xs text-default-500">
                <Icon icon="mdi:download" className="text-base" />
                <span>{downloads.toLocaleString()} {t('downloads')}</span>
              </div>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

const InstalledPlugins = observer(() => {
  const { t } = useTranslation();
  const pluginManager = RootStore.Get(PluginManagerStore);
  const [loadingPluginName, setLoadingPluginName] = useState<string | null>(null);
  const [currentAppVersion, setCurrentAppVersion] = useState<string>('0.0.0');
  const [upgradeModal, setUpgradeModal] = useState<{isOpen: boolean, plugin?: PluginInfo}>({isOpen: false});

  // Load all plugins and fetch app version when component mounts
  useEffect(() => {
    pluginManager.loadAllPlugins();
    
    async function fetchAppVersion() {
      try {
        const version = await api.public.version.query();
        setCurrentAppVersion(version);
      } catch (error) {
        console.error('Failed to fetch app version:', error);
      }
    }
    
    fetchAppVersion();
  }, []);

  const handleUninstall = async (id: number) => {
    await PromiseCall(pluginManager.uninstallPlugin(id));
  };

  const handleUpdate = async (plugin: PluginInfo) => {
    setLoadingPluginName(plugin.name);
    try {
      await PromiseCall(pluginManager.installPlugin(plugin), { autoAlert: true });
      // Reload plugins after update
      await Promise.all([
        pluginManager.marketplacePlugins.call(),
        pluginManager.installedPlugins.call()
      ]);
    } finally {
      setLoadingPluginName(null);
    }
  };

  // Open Blinko official website to upgrade app
  const handleUpgrade = () => {
    window.open('https://github.com/blinko-space/blinko/releases', '_blank');
    setUpgradeModal({isOpen: false});
  };

  // Show upgrade modal with plugin details
  const showUpgradeModal = (plugin: PluginInfo) => {
    setUpgradeModal({isOpen: true, plugin});
  };

  // Check if plugin requires newer app version
  const needsAppUpgrade = (plugin: PluginInfo): boolean => {
    if (!plugin.minAppVersion) return false;
    
    try {
      return compareVersions(plugin.minAppVersion, currentAppVersion) > 0;
    } catch (error) {
      console.error('Version comparison error:', error);
      return false;
    }
  };

  // Get all available plugins for version comparison
  const allPlugins = pluginManager.marketplacePlugins.value || [];
  const installedPlugins = pluginManager.installedPlugins.value || [];

  return (
    <div className="space-y-2 ">
      <LoadingAndEmpty isAbsolute={false} className='mt-2' isLoading={pluginManager.installedPlugins.loading.value} isEmpty={pluginManager.installedPlugins.value?.length === 0} />
      {installedPlugins.map((plugin) => {
        const metadata = plugin.metadata as {
          name: string;
          version: string;
          displayName: { default: string; zh_CN: string };
          description: { default: string; zh_CN: string };
          withSettingPanel?: boolean;
          minAppVersion?: string;
        };

        // Find the latest version from marketplace
        const latestPlugin = allPlugins.find(p => p.name === metadata.name);
        const hasUpdate = latestPlugin && latestPlugin.version !== metadata.version;
        
        // Check if we need app upgrade for the latest version of the plugin
        const updateRequiresAppUpgrade = latestPlugin && needsAppUpgrade(latestPlugin);

        return (
          <PluginCard
            key={plugin.id}
            {...metadata}
            actionButton={
              <div className="flex gap-2">
                {pluginManager.isIntalledPluginWithSettingPanel(metadata.name) && (
                  <Button
                    size="sm"
                    isIconOnly
                    variant="flat"
                    startContent={<Icon icon="mdi:cog" width="16" height="16" />}
                    onPress={() => {
                      const pluginInstance = pluginManager.getPluginInstanceByName(metadata.name);
                      RootStore.Get(DialogStandaloneStore).setData({
                        isOpen: true,
                        title: t('settings'),
                        size: 'lg',
                        content: <PluginRender content={pluginInstance?.renderSettingPanel!} />
                      });
                    }}
                  />
                )}
                {hasUpdate && (
                  updateRequiresAppUpgrade ? (
                    <Button
                      size="sm"
                      color="warning"
                      isIconOnly
                      startContent={<Icon icon="material-symbols:upgrade-rounded" width="16" height="16" />}
                      onPress={() => showUpgradeModal(latestPlugin)}
                      title={t('plugin-requires-app-upgrade')}
                    />
                  ) : (
                    <Button
                      size="sm"
                      color="warning"
                      isIconOnly
                      isLoading={loadingPluginName === metadata.name}
                      startContent={<Icon icon="material-symbols:upgrade-rounded" width="16" height="16" />}
                      onPress={() => handleUpdate(latestPlugin)}
                    />
                  )
                )}
                <Button
                  size="sm"
                  isIconOnly
                  color="danger"
                  startContent={<Icon icon="mdi:trash-can" width="16" height="16" />}
                  onPress={() => handleUninstall(plugin.id)}
                />
              </div>
            }
          />
        );
      })}

      {/* App upgrade modal */}
      <Modal isOpen={upgradeModal.isOpen} onClose={() => setUpgradeModal({isOpen: false})}>
        <ModalContent>
          <ModalHeader>{t('app-upgrade-required')}</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
              {upgradeModal.plugin && (
                <div className="flex flex-col gap-2 p-3 bg-default-50 dark:bg-default-100/10 rounded-md">
                  <div className="flex justify-between">
                    <span className="text-default-500">{t('name')}:</span>
                    <span className="font-medium">{upgradeModal.plugin.displayName?.[i18n.language] || upgradeModal.plugin.displayName?.default}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-default-500">{t('current-app-version')}:</span>
                    <span className="font-medium">{currentAppVersion}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-default-500">{t('required-app-version')}:</span>
                    <span className="font-medium text-warning">{upgradeModal.plugin.minAppVersion}</span>
                  </div>
                </div>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="default" variant="light" onPress={() => setUpgradeModal({isOpen: false})}>
              {t('cancel')}
            </Button>
            <Button color="primary" onPress={handleUpgrade}>
              {t('upgrade')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
});

const AllPlugins = observer(() => {
  const { t } = useTranslation();
  const pluginManager = RootStore.Get(PluginManagerStore);
  const [loadingPluginName, setLoadingPluginName] = useState<string | null>(null);
  const [currentAppVersion, setCurrentAppVersion] = useState<string>('0.0.0');
  const [upgradeModal, setUpgradeModal] = useState<{isOpen: boolean, plugin?: PluginInfo}>({isOpen: false});

  // Fetch the current app version when component mounts
  useEffect(() => {
    async function fetchAppVersion() {
      try {
        const version = await api.public.version.query();
        setCurrentAppVersion(version);
      } catch (error) {
        console.error('Failed to fetch app version:', error);
      }
    }
    
    fetchAppVersion();
  }, []);

  const handleInstall = async (plugin: PluginInfo) => {
    setLoadingPluginName(plugin.name);
    try {
      await PromiseCall(pluginManager.installPlugin(plugin), { autoAlert: true });
      pluginManager.loadAllPlugins();
    } finally {
      setLoadingPluginName(null);
    }
  };

  // Open Blinko official website to upgrade app
  const handleUpgrade = () => {
    window.open('https://github.com/blinko-space/blinko/releases', '_blank');
    setUpgradeModal({isOpen: false});
  };

  // Show upgrade modal with plugin details
  const showUpgradeModal = (plugin: PluginInfo) => {
    setUpgradeModal({isOpen: true, plugin});
  };

  // Check if plugin requires newer app version
  const needsAppUpgrade = (plugin: PluginInfo): boolean => {
    if (!plugin.minAppVersion) return false;
    
    try {
      return compareVersions(plugin.minAppVersion, currentAppVersion) > 0;
    } catch (error) {
      console.error('Version comparison error:', error);
      return false;
    }
  };

  return (
    <div className="space-y-2 relative">
      <LoadingAndEmpty isAbsolute={false} isLoading={pluginManager.marketplacePlugins.loading.value} isEmpty={pluginManager.marketplacePlugins.value?.length === 0} />

      {pluginManager.marketplacePlugins.value?.filter(plugin => !pluginManager.installedPlugins.value?.some(installedPlugin => installedPlugin.metadata.name === plugin.name)).map((plugin) => (
        <PluginCard
          key={plugin.name}
          {...plugin}
          actionButton={
            needsAppUpgrade(plugin) ? (
              <Button
                size="sm"
                color="warning"
                className="min-w-[80px]"
                startContent={<Icon icon="mdi:arrow-up-bold" width="16" height="16" />}
                onPress={() => showUpgradeModal(plugin)}
              >
                {t('upgrade')}
              </Button>
            ) : (
              <Button
                size="sm"
                color="primary"
                isLoading={loadingPluginName === plugin.name}
                className="min-w-[80px]"
                startContent={<Icon icon="mdi:download" width="16" height="16" />}
                onPress={() => handleInstall(plugin)}
              >
                {t('install')}
              </Button>
            )
          }
        />
      ))}

      {/* App upgrade modal */}
      <Modal isOpen={upgradeModal.isOpen} onClose={() => setUpgradeModal({isOpen: false})}>
        <ModalContent>
          <ModalHeader>{t('app-upgrade-required')}</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
              {upgradeModal.plugin && (
                <div className="flex flex-col gap-2 p-3 bg-default-50 dark:bg-default-100/10 rounded-md">
                  <div className="flex justify-between">
                    <span className="text-default-500">{t('name')}:</span>
                    <span className="font-medium">{upgradeModal.plugin.displayName?.[i18n.language] || upgradeModal.plugin.displayName?.default}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-default-500">{t('current-app-version')}:</span>
                    <span className="font-medium">{currentAppVersion}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-default-500">{t('required-app-version')}:</span>
                    <span className="font-medium text-warning">{upgradeModal.plugin.minAppVersion}</span>
                  </div>
                </div>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="default" variant="light" onPress={() => setUpgradeModal({isOpen: false})}>
              {t('cancel')}
            </Button>
            <Button color="primary" onPress={handleUpgrade}>
              {t('upgrade')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
});

const AddLocalPluginDialog = observer(({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation();
  const [url, setUrl] = useState('');

  const handleConfirm = () => {
    RootStore.Get(PluginManagerStore).connectDevPlugin(url);
    onClose();
  };

  return (
    <div className="flex flex-col gap-4">
      <Input
        label={t('endpoint')}
        placeholder="ws://192.168.31.100:8080"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        startContent={
          <Icon icon="mdi:link-variant" className="text-default-400 pointer-events-none flex-shrink-0" />
        }
        className="w-full"
      />
      <div className="flex justify-end gap-2">
        <Button color="danger" variant="light" onPress={onClose}>
          {t('cancel')}
        </Button>
        <Button color="primary" onPress={handleConfirm}>
          {t('confirm')}
        </Button>
      </div>
    </div>
  );
});

const LocalDevelopment = observer(() => {
  const { t } = useTranslation();
  const dialog = RootStore.Get(DialogStandaloneStore);
  const pluginManager = RootStore.Get(PluginManagerStore);

  const handleAddLocalPlugin = () => {
    dialog.setData({
      isOpen: true,
      title: t('add-local-plugin'),
      size: 'md',
      content: <AddLocalPluginDialog onClose={() => dialog.close()} />
    });
  };

  const handleDisconnect = () => {
    pluginManager.disconnectDevPlugin();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-sm text-default-500">
          {t('local-development-description')}
        </div>
        <Button
          color="primary"
          size="sm"
          className="px-4"
          startContent={<Icon icon="mdi:plus" className="text-lg" />}
          onPress={handleAddLocalPlugin}
        >
          {t('add-local-plugin')}
        </Button>
      </div>

      {pluginManager.devWebscoketUrl.value && (
        <Card className="p-4 bg-content2/40 backdrop-blur-lg border border-content3/20">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="relative flex-shrink-0 w-2">
                <div
                  className={`absolute top-2 left-0 w-2 h-2 rounded-full animate-pulse ${pluginManager.wsConnectionStatus === 'connected' ? 'bg-success' :
                    pluginManager.wsConnectionStatus === 'error' ? 'bg-danger' :
                      'bg-warning'
                    }`}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="font-medium text-foreground">
                  {pluginManager.devPluginMetadata?.displayName?.[i18n.language] ||
                    pluginManager.devPluginMetadata?.displayName?.default ||
                    t('local-plugin')}
                </div>
                <div className="text-sm text-default-500 line-clamp-2">
                  {pluginManager.devPluginMetadata?.description?.[i18n.language] ||
                    pluginManager.devPluginMetadata?.description?.default}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="flex items-center gap-1.5 text-xs text-default-400">
                    <Icon icon="mdi:link-variant" className="text-sm" />
                    <span>{pluginManager.devWebscoketUrl.value}</span>
                  </div>
                  <Button
                    size="sm"
                    color="danger"
                    variant="flat"
                    className="h-6 px-2 min-w-0"
                    startContent={<Icon icon="mdi:link-off" className="text-sm" />}
                    onPress={handleDisconnect}
                  >
                    {t('disconnect')}
                  </Button>
                </div>
              </div>
            </div>
            {pluginManager.devPluginMetadata?.withSettingPanel && (
              <Button
                size="sm"
                color="primary"
                isIconOnly
                className="h-6 px-2 min-w-0"
                startContent={<Icon icon="mdi:cog" className="text-sm" />}
                onPress={() => {
                  const pluginInstance = pluginManager.getPluginInstanceByName("dev");
                  RootStore.Get(DialogStandaloneStore).setData({
                    isOpen: true,
                    title: t('settings'),
                    size: 'lg',
                    content: <PluginRender content={pluginInstance?.renderSettingPanel!} />
                  });
                }}
              >
              </Button>
            )}
          </div>
        </Card>
      )}
    </div>
  );
});

export const PluginSetting = observer(() => {
  const { t } = useTranslation();
  useEffect(() => {
    RootStore.Get(PluginManagerStore).loadAllPlugins();
  }, []);
  return (
    <CollapsibleCard
      icon="hugeicons:plug-socket"
      title={t('plugin-settings')}
    >
      <Tabs aria-label="Plugin settings tabs">
        <Tab key="installed" title={t('installed-plugins')}>
          <InstalledPlugins />
        </Tab>
        <Tab key="all" title={t('marketplace')}>
          <AllPlugins />
        </Tab>
        <Tab key="development" title={t('local-development')}>
          <LocalDevelopment />
        </Tab>
      </Tabs>
    </CollapsibleCard>
  );
}); 