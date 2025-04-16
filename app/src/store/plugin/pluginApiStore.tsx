import { RootStore } from "../root";
import { DialogStandaloneStore } from "../module/DialogStandalone";
import { Store } from "../standard/base";
import { PluginRender } from "./pluginRender";
import { Note } from "@shared/lib/types";
import { makeAutoObservable } from "mobx";
import { eventBus } from "@/lib/event";
import { EditorStore } from "@/components/Common/Editor/editorStore";

export type EditorFooterSlot = {
  name: string;
  content: (mode?: 'create' | 'edit' | 'comment') => HTMLElement;
  order?: number;
  isHidden?: boolean;
  className?: string;
  showCondition?: (mode: 'create' | 'edit' | 'comment') => boolean;
  hideCondition?: (mode: 'create' | 'edit' | 'comment') => boolean;
  style?: React.CSSProperties;
  maxWidth?: number;
  onClick?: () => void;
  onHover?: () => void;
  onLeave?: () => void;
  data?: any;
}

export type CardFooterSlot = {
  name: string;
  content: (note?: Note) => HTMLElement;
  order?: number;
  isHidden?: boolean;
  className?: string;
  showCondition?: (note: Note) => boolean;
  hideCondition?: (note: Note) => boolean;
  style?: React.CSSProperties;
  maxWidth?: number;
  onClick?: () => void;
  onHover?: () => void;
  onLeave?: () => void;
  data?: any;
}

export type ToolbarIcon = {
  name: string;
  icon: string;
  tooltip: string;
  content?: (mode?: 'create' | 'edit' | 'comment') => HTMLElement;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  maxWidth?: number;
  onClick?: () => void;
}

export type RightClickMenu = {
  name: string;
  label: string;
  icon?: string;
  onClick: (note: Note) => void;
  disabled?: boolean;
}

export type DialogOptions = {
  title: string;
  size: "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "xs" | "3xl" | "4xl" | "5xl" | 'full';
  content: () => HTMLElement;
}

export class PluginApiStore implements Store {
  sid = 'pluginApiStore';
  autoObservable = true

  customToolbarIcons: ToolbarIcon[] = [];
  customRightClickMenus: RightClickMenu[] = [];
  customAiPrompts: { name: string; prompt: string; icon?: string }[] = [];
  customCardFooterSlots: CardFooterSlot[] = [];
  customEditorFooterSlots: EditorFooterSlot[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getActiveEditorStore(): EditorStore | null {
    const editorElement = document.getElementById('global-editor');
    if (!editorElement) return null;
    //@ts-ignore
    const editorInstance = editorElement.__storeInstance;
    return editorInstance;
  }

  getEditorMetadata() {
    const editorStore = this.getActiveEditorStore();
    return editorStore?.metadata || {};
  }

  setEditorMetadata(metadata) {
    const editorStore = this.getActiveEditorStore();
    if (editorStore) {
      editorStore.metadata = { ...(editorStore.metadata || {}), ...metadata };
      return true;
    }
    return false;
  }

  closeToolBarContent(name: string) {
    eventBus.emit('plugin:closeToolBarContent', name);
  }

  addToolBarIcon(options: ToolbarIcon) {
    const sameNameIndex = this.customToolbarIcons.findIndex(item => item.name === options.name);
    if (sameNameIndex !== -1) {
      this.customToolbarIcons[sameNameIndex] = {
        ...options,
        placement: options.placement || 'top',
        maxWidth: options.maxWidth || 300,
      };
      return;
    }
    this.customToolbarIcons.push({
      name: options.name,
      icon: options.icon,
      content: options.content,
      placement: options.placement || 'top',
      maxWidth: options.maxWidth || 300,
      tooltip: options.tooltip,
      onClick: options.onClick
    });
  }

  addRightClickMenu(options: RightClickMenu) {
    const sameNameIndex = this.customRightClickMenus.findIndex(item => item.name === options.name);
    if (sameNameIndex !== -1) {
      this.customRightClickMenus[sameNameIndex] = options;
      console.log('this.customRightClickMenus', this.customRightClickMenus);
      return;
    }
    this.customRightClickMenus.push(options);
    console.log('this.customRightClickMenus', this.customRightClickMenus);
  }

  showDialog(options: DialogOptions) {
    RootStore.Get(DialogStandaloneStore).setData({
      isOpen: true,
      title: options.title,
      size: options.size as any,
      content: <PluginRender content={options.content} />,
    });
  }

  closeDialog() {
    RootStore.Get(DialogStandaloneStore).setData({
      isOpen: false,
    });
  }

  addAiWritePrompt(name: string, prompt: string, icon?: string) {
    const existingIndex = this.customAiPrompts.findIndex(p => p.name === name);
    if (existingIndex !== -1) {
      this.customAiPrompts[existingIndex] = { name, prompt, icon };
    } else {
      this.customAiPrompts.push({ name, prompt, icon });
    }
  }

  addCardFooterSlot(options: CardFooterSlot) {
    const sameNameIndex = this.customCardFooterSlots.findIndex(item => item.name === options.name);
    if (sameNameIndex !== -1) {
      this.customCardFooterSlots[sameNameIndex] = {
        ...options,
        order: options.order || 0,
      };
      return;
    }
    this.customCardFooterSlots.push({
      name: options.name,
      content: options.content,
      order: options.order || 0,
    });
  }

  addEditorFooterSlot(options: EditorFooterSlot) {
    const sameNameIndex = this.customEditorFooterSlots.findIndex(item => item.name === options.name);
    if (sameNameIndex !== -1) {
      this.customEditorFooterSlots[sameNameIndex] = {
        ...options,
        order: options.order || 0,
      };
      return;
    }
    this.customEditorFooterSlots.push({
      name: options.name,
      content: options.content,
      order: options.order || 0,
    });
  }
}