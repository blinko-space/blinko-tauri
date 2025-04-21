/// <reference types="systemjs" />
import 'systemjs/dist/system.js';
import { api } from "@/lib/trpc";
import { BasePlugin } from ".";
import { Store } from "../standard/base";
import { eventBus } from "@/lib/event";
import i18n from "@/lib/i18n";
import { PluginApiStore } from './pluginApiStore';
import { RootStore } from "../root";
import { ToastPlugin } from "../module/Toast/Toast";
import { makeAutoObservable } from "mobx";
import { PromisePageState, PromiseState } from "../standard/PromiseState";
import { type PluginInfo } from "@shared/lib/types";
import { StorageState } from "../standard/StorageState";
import { BlinkoStore } from "../blinkoStore";
import { BaseStore } from "../baseStore";
import { ResourceStore } from "../resourceStore";
import { HubStore } from "../hubStore";
import copy from "copy-to-clipboard";
import { UserStore } from "../user";

export class PluginManagerStore implements Store {
  sid = 'pluginManagerStore';
  private plugins: Map<string, BasePlugin> = new Map();
  ws: WebSocket | null = null;
  devPluginMetadata!: PluginInfo & { withSettingPanel?: boolean };
  latestDevFileName: string = '';
  public isLoading: boolean = false;
  public wsConnectionStatus: 'connected' | 'disconnected' | 'error' = 'disconnected';
  devWebscoketUrl = new StorageState<string>({
    key: 'blinko_dev_plugin_ws_url',
    value: ''
  });
  private loadedCssFiles: Map<string, HTMLStyleElement[]> = new Map();

  constructor() {
    makeAutoObservable(this);
    this.initBlinkoContext();
    this.autoConnectDevPlugin();
  }

  private autoConnectDevPlugin() {
    const savedUrl = this.devWebscoketUrl.value;
    if (savedUrl) {
      this.connectDevPlugin(savedUrl).catch(() => {
        // Ignore connection errors
      });
    }
  }

  marketplacePlugins = new PromiseState({
    function: async () => {
      const plugins = await api.plugin.getAllPlugins.query();
      return plugins
    }
  })

  installedPlugins = new PromiseState({
    function: async () => {
      const plugins = await api.plugin.getInstalledPlugins.query();
      return plugins;
    }
  })

  isIntalledPluginWithSettingPanel(pluginName: string) {
    return this.plugins.get(pluginName)?.withSettingPanel;
  }

  async loadAllPlugins() {
    this.marketplacePlugins.call();
    this.installedPlugins.call();
  }

  /**
   * Load CSS files for a plugin
   */
  private async loadCssFiles(pluginName: string) {
    try {
      // Remove previously loaded CSS files
      this.removeCssFiles(pluginName);
      
      // Use API to get CSS content
      const cssContents = await api.plugin.getPluginCssContents.query({ pluginName });
      
      if (cssContents.length > 0) {
        const styleElements: HTMLStyleElement[] = [];
        
        for (const cssData of cssContents) {
          // Create style element
          const styleElement = document.createElement('style');
          styleElement.type = 'text/css';
          styleElement.dataset.pluginName = pluginName;
          styleElement.dataset.fileName = cssData.fileName;
          
          // Set CSS content
          styleElement.textContent = cssData.content;
          
          // Add to document
          document.head.appendChild(styleElement);
          styleElements.push(styleElement);
        }
        
        this.loadedCssFiles.set(pluginName, styleElements);
      }
    } catch (error) {
      console.error(`Failed to load CSS files for plugin ${pluginName}:`, error);
    }
  }

  private removeCssFiles(pluginName: string) {
    const styleElements = this.loadedCssFiles.get(pluginName);
    if (styleElements) {
      for (const styleElement of styleElements) {
        document.head.removeChild(styleElement);
      }
      this.loadedCssFiles.delete(pluginName);
    }
  }

  async initInstalledPlugins() {
    const plugins = await this.installedPlugins.getOrCall();
    if (plugins) {
      for (const plugin of plugins) {
        console.log('initInstalledPlugins', plugin.path);
        this.loadPlugin(plugin.path);
      }
    }
  }

  /**
   * Connect to development plugin WebSocket
   */
  async connectDevPlugin(url: string) {
    try {
      this.disconnectDevPlugin(); // Ensure previous connection is closed
      
      this.devWebscoketUrl.save(url);
      this.wsConnectionStatus = 'disconnected';

      this.ws = new WebSocket(url.replace('http', 'ws'));
      this.setupWebSocketHandlers();

      return new Promise<void>((resolve, reject) => {
        // Set connection timeout
        const timeout = setTimeout(() => {
          if (this.wsConnectionStatus !== 'connected') {
            reject(new Error('Connection timeout'));
            this.disconnectDevPlugin();
          }
        }, 10000);

        // Add one-time connection success event
        const onOpen = () => {
          clearTimeout(timeout);
          resolve();
          this.ws?.removeEventListener('open', onOpen);
        };
        this.ws?.addEventListener('open', onOpen);
      });
    } catch (error) {
      console.error('Connect dev plugin error:', error);
      this.wsConnectionStatus = 'error';
      throw error;
    }
  }

  /**
   * Setup WebSocket event handlers
   */
  private setupWebSocketHandlers() {
    if (!this.ws) return;

    this.ws.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      try {
        if (this.latestDevFileName) {
          await this.destroyPlugin(this.latestDevFileName);
        }
        
        // Handle multi-file message format
        if (data.type === "code" && Array.isArray(data.files)) {
          await this.handleMultiFileDevPlugin(data);
        } else {
          // Handle legacy format
          await this.handleLegacyDevPlugin(data);
        }
      } catch (error) {
        console.error('Plugin update error:', error);
        this.wsConnectionStatus = 'error';
        RootStore.Get(ToastPlugin).error(i18n.t('plugin-update-failed'));
      }
    };

    this.ws.onopen = () => {
      this.wsConnectionStatus = 'connected';
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.wsConnectionStatus = 'error';
      RootStore.Get(ToastPlugin).error(i18n.t('plugin-connection-failed'));
    };

    this.ws.onclose = () => {
      this.ws = null;
      this.wsConnectionStatus = 'disconnected';
    };
  }

  /**
   * Handle multi-file format development plugin
   */
  private async handleMultiFileDevPlugin(data: any) {
    // Save metadata
    this.devPluginMetadata = data.metadata;
    this.wsConnectionStatus = 'connected';
    
    // Process file encoding
    const processedFiles = this.processDevPluginFiles(data.files);
    
    // Find main JS file
    const mainJsFile = this.findMainJsFile(processedFiles);
    if (!mainJsFile) {
      throw new Error('No valid JS entry file found');
    }
    
    this.latestDevFileName = mainJsFile.fileName;
    
    // Save all files
    await this.saveDevFiles(processedFiles);
    
    // Load plugin
    await this.loadDevPlugin(mainJsFile.fileName);
    RootStore.Get(ToastPlugin).success(i18n.t('plugin-updated'));
  }

  /**
   * Handle legacy format development plugin
   */
  private async handleLegacyDevPlugin(data: any) {
    this.latestDevFileName = data.fileName;
    this.devPluginMetadata = data.metadata;
    this.wsConnectionStatus = 'connected';
    await this.saveDevFile(data.code, data.fileName);
    await this.loadDevPlugin(data.fileName);
    RootStore.Get(ToastPlugin).success(i18n.t('plugin-updated'));
  }

  /**
   * Process development plugin file encoding
   */
  private processDevPluginFiles(files: any[]) {
    return files.map(file => {
      if (file.encoding === 'base64') {
        // Improved base64 decoding for proper Unicode character handling
        const binaryString = atob(file.content);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        return {
          fileName: file.fileName,
          fileType: file.fileType,
          content: new TextDecoder('utf-8').decode(bytes)
        };
      }
      return file; // Unchanged non-base64 encoded file
    });
  }

  initBlinkoContext() {
    if (typeof window !== 'undefined') {
      const pluginApi = RootStore.Get(PluginApiStore);
      const toast = RootStore.Get(ToastPlugin);
      const blinkoStore = RootStore.Get(BlinkoStore);
      const baseStore = RootStore.Get(BaseStore);
      const hubStore = RootStore.Get(HubStore);
      const resourceStore = RootStore.Get(ResourceStore);
      const userStore = RootStore.Get(UserStore);
      //@ts-ignore
      window.Blinko = {
        api,
        copyToClipboard: copy,
        eventBus,
        i18n,
        //@ts-ignore
        toast,
        version: '1.0.0',
        store: {
          StorageState,
          PromiseState,
          PromisePageState,
          blinkoStore,
          baseStore,
          hubStore,
          resourceStore,
          userStore
        },
        globalRefresh: () => {
          blinkoStore.updateTicker++;
        },
        addToolBarIcon: pluginApi.addToolBarIcon.bind(pluginApi),
        addRightClickMenu: pluginApi.addRightClickMenu.bind(pluginApi),
        addAiWritePrompt: pluginApi.addAiWritePrompt.bind(pluginApi),
        showDialog: pluginApi.showDialog.bind(pluginApi),
        closeDialog: pluginApi.closeDialog.bind(pluginApi),
        closeToolBarContent: pluginApi.closeToolBarContent.bind(pluginApi),
        addCardFooterSlot: pluginApi.addCardFooterSlot.bind(pluginApi),
        addEditorFooterSlot: pluginApi.addEditorFooterSlot.bind(pluginApi),
        getEditorMetadata: pluginApi.getEditorMetadata.bind(pluginApi),
        setEditorMetadata: pluginApi.setEditorMetadata.bind(pluginApi),
        getActiveEditorStore: pluginApi.getActiveEditorStore.bind(pluginApi),
      };
    }
  }

  /**
   * Find main JS file
   */
  private findMainJsFile(files: Array<{fileName: string, content: string, fileType: string}>) {
    const jsFiles = files.filter(f => f.fileType === 'js');
    return jsFiles.find(f => 
      f.fileName === 'index.js' || 
      f.fileName === 'main.js' || 
      f.fileName.endsWith('/index.js') || 
      f.fileName.endsWith('/main.js')
    ) || jsFiles[0]; // If standard name not found, use first JS file
  }

  /**
   * Save a single development plugin file
   */
  private async saveDevFile(code: string, fileName: string) {
    try {
      await api.plugin.saveDevPlugin.mutate({ 
        code, 
        fileName, 
        metadata: this.devPluginMetadata 
      });
    } catch (error) {
      console.error('Save dev plugin error:', error);
      throw error;
    }
  }

  /**
   * Save multiple development plugin files
   */
  private async saveDevFiles(files: Array<{fileName: string, content: string, fileType: string}>) {
    try {
      // Prepare main JS file
      const mainJsFile = this.findMainJsFile(files);
      
      if (!mainJsFile) {
        throw new Error('No valid JS file found');
      }
      
      // Save main JS file
      await this.saveDevFile(mainJsFile.content, mainJsFile.fileName);
      
      // Create separate requests for additional files
      const savePromises = files
        .filter(file => file !== mainJsFile) // Exclude already saved main JS file
        .map(file => {
          try {
            return api.plugin.saveAdditionalDevFile.mutate({
              filePath: file.fileName,
              content: file.content
            });
          } catch (error) {
            console.warn(`Failed to save file ${file.fileName}`, error);
            return Promise.resolve();
          }
        });
      
      // Save all other files in parallel
      await Promise.all(savePromises);
    } catch (error) {
      console.error('Save dev files error:', error);
      throw error;
    }
  }

  private async loadDevPlugin(fileName: string) {
    console.log('loadDevPlugin');
    try {
      await this.loadCssFiles("dev");
      
      const module = await System.import(`/plugins/dev/${fileName}`);
      return await this.initPlugin(module.default, "dev");
    } catch (error) {
      console.error('Load dev plugin error:', error);
    }
  }

  disconnectDevPlugin() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.wsConnectionStatus = 'disconnected';
    this.devWebscoketUrl.save('');
    this.removeCssFiles("dev");
  }

  async loadPlugin(pluginPath: string) {
    try {
      const module = await System.import(pluginPath);
      // Extract plugin name from path
      const pathSegments = pluginPath.split('/');
      const pluginName = pathSegments[pathSegments.indexOf('plugins') + 1] || '';
      
      // Load plugin CSS
      await this.loadCssFiles(pluginName);
      
      // Initialize plugin
      return await this.initPlugin(module.default, pluginName);
    } catch (error) {
      console.error(`load plugin error: ${pluginPath}`, error);
    }
  }

  getPluginInstanceByName(pluginName: string) {
    return this.plugins.get(pluginName);
  }

  async destroyPlugin(pluginName: string) {
    console.log('destroyPlugin', pluginName);
    try {
      const plugin = this.plugins.get(pluginName);
      if (plugin) {
        plugin.destroy();
        this.plugins.delete(pluginName);
      }
      this.removeCssFiles(pluginName);
    } catch (error) {
      console.error(`destroy plugin error: ${pluginName}`, error);
    }
    try {
      await System.delete(`/plugins/dev/${pluginName}`);
    } catch (error) {
      console.error(`destroy plugin error: ${pluginName}`, error);
    }
  }

  async installPlugin(plugin: PluginInfo) {
    try {
      await api.plugin.installPlugin.mutate(plugin);
      await this.marketplacePlugins.call();
      await this.initInstalledPlugins();
    } catch (error) {
      console.error('Install plugin error:', error);
      throw error;
    }
  }

  async uninstallPlugin(id: number) {
    try {
      await api.plugin.uninstallPlugin.mutate({ id });
      await this.installedPlugins.call();
      window.location.reload();
    } catch (error) {
      console.error('Uninstall plugin error:', error);
      throw error;
    }
  }

  /**
   * Initialize plugin
   */
  private async initPlugin(PluginClass: any, pluginName: string) {
    try {
      const plugin = new PluginClass();
      plugin.init();
      this.plugins.set(pluginName, plugin);
      
      if (plugin.withSettingPanel) {
        // For dev plugin, we need to update metadata
        if (pluginName === "dev") {
          this.devPluginMetadata.withSettingPanel = true;
        }
        this.plugins.get(pluginName)!.withSettingPanel = true;
      }
      
      return plugin;
    } catch (error) {
      console.error(`Failed to initialize plugin: ${pluginName}`, error);
      throw error;
    }
  }
}
