import "vditor/dist/index.css";
import '@/styles/vditor.css';
import { RootStore } from '@/store';
import React, { ReactElement, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { FileType, OnSendContentType } from './type';
import { BlinkoStore } from '@/store/blinkoStore';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'usehooks-ts';
import { type Attachment } from '@shared/lib/types';
import { Card, Popover, PopoverTrigger, PopoverContent } from '@heroui/react';
import { AttachmentsRender, ReferenceRender } from '../AttachmentRender';
import { UploadButtons } from './Toolbar/UploadButtons';
import { ReferenceButton } from './Toolbar/ReferenceButton';
import { NoteTypeButton } from './Toolbar/NoteTypeButton';
import { HashtagButton } from './Toolbar/HashtagButton';
import { ViewModeButton } from './Toolbar/ViewModeButton';
import { SendButton } from './Toolbar/SendButton';
import {
  useEditorInit,
  useEditorEvents,
  useEditorFiles,
  useEditorHeight
} from './hooks/useEditor';
import { EditorStore } from "./editorStore";
import { AIWriteButton } from "./Toolbar/AIWriteButton";
import { FullScreenButton } from "./Toolbar/FullScreenButton";
import { eventBus } from "@/lib/event";
import { PluginApiStore } from "@/store/plugin/pluginApiStore";
import { PluginRender } from '@/store/plugin/pluginRender';
import { IconButton } from "./Toolbar/IconButton";
import { ResourceReferenceButton } from "./Toolbar/ResourceReferenceButton";

//https://ld246.com/guide/markdown
type IProps = {
  mode: 'create' | 'edit' | 'comment',
  content: string,
  onChange?: (content: string) => void,
  onHeightChange?: () => void,
  onSend: (args: OnSendContentType) => Promise<any>,
  isSendLoading?: boolean,
  bottomSlot?: ReactElement<any, any>,
  originFiles?: Attachment[],
  originReference?: number[],
  hiddenToolbar?: boolean
}

const Editor = observer(({ content, onChange, onSend, isSendLoading, originFiles, originReference = [], mode, onHeightChange, hiddenToolbar = false }: IProps) => {
  const cardRef = React.useRef(null)
  const isPc = useMediaQuery('(min-width: 768px)')
  const store = useLocalObservable(() => new EditorStore())
  const pluginApi = RootStore.Get(PluginApiStore)
  const blinko = RootStore.Get(BlinkoStore)
  const { t } = useTranslation()
  const [openPopover, setOpenPopover] = useState<string | null>(null);

  useEffect(() => {
    const handleClosePopover = (name: string) => {
      if (openPopover === name) {
        setOpenPopover(null);
      }
    };
    eventBus.on('plugin:closeToolBarContent', handleClosePopover);
    return () => {
      eventBus.off('plugin:closeToolBarContent', handleClosePopover);
    };
  }, [openPopover]);

  useEditorInit(store, onChange, onSend, mode, originReference, content);
  useEditorEvents(store);
  useEditorFiles(store, blinko, originFiles);
  useEditorHeight(onHeightChange, blinko, content, store);

  const {
    getRootProps,
    isDragAccept,
    getInputProps,
    open
  } = useDropzone({
    multiple: true,
    noClick: true,
    onDrop: acceptedFiles => {
      store.uploadFiles(acceptedFiles)
    },
    onDragOver: (e) => {
      e.preventDefault();
      e.stopPropagation();
    },
    onDragEnter: (e) => {
      e.preventDefault();
      e.stopPropagation();
    }
  });

  const { onDrop, ...rootProps } = getRootProps();

  const handleFileReorder = (newFiles: FileType[]) => {
    store.updateFileOrder(newFiles);
  };

  const handleFullScreenToggle = () => {
    eventBus.emit('editor:setFullScreen', !store.isFullscreen);
  };

  return (
    <div {...getRootProps()} className={isDragAccept ? 'border-2 border-green-500 border-dashed' : ''}>
      <Card
        shadow='none'
        className={`p-2 relative border-2 border-border !transition-all overflow-visible 
        ${store.isFullscreen ? 'fixed inset-0 z-[9999] m-0 rounded-none border-none bg-background' : ''}`}
        ref={el => {
          if (el) {
            //@ts-ignore
            el.__storeInstance = store;
          }
        }}>

        <div ref={cardRef}
          className="overflow-visible relative"
          onKeyDown={e => {
            onHeightChange?.()
            if (isPc) return
            store.adjustMobileEditorHeight()
          }}>

          <div id={`vditor-${mode}`} className="vditor" />
          {store.files.length > 0 && (
            <div className='w-full my-2 attachment-container'>
              <AttachmentsRender files={store.files} onReorder={handleFileReorder} />
            </div>
          )}

          <div className='w-full mb-2 reference-container'>
            <ReferenceRender store={store} />
          </div>

          {/* Editor Footer Slots */}
          {pluginApi.customEditorFooterSlots
            .filter(slot => {
              if (slot.isHidden) return false;
              if (slot.showCondition && !slot.showCondition(mode)) return false;
              if (slot.hideCondition && slot.hideCondition(mode)) return false;
              return true;
            })
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map((slot) => (
              <div
                key={slot.name}
                className={`mb-2 ${slot.className || ''}`}
                style={slot.style}
                onClick={slot.onClick}
                onMouseEnter={slot.onHover}
                onMouseLeave={slot.onLeave}
              >
                <div style={{ maxWidth: slot.maxWidth }}>
                  <PluginRender content={slot.content} data={mode} />
                </div>
              </div>
            ))}

          <div className='flex w-full items-center gap-1 mt-auto'>
            {!hiddenToolbar && (
              <>
                <NoteTypeButton
                  noteType={store.noteType}
                  setNoteType={(noteType) => {
                    store.noteType = noteType
                  }}
                />
                <HashtagButton store={store} content={content} />
                <ReferenceButton store={store} />
                <ResourceReferenceButton store={store} />
                {blinko.config.value?.isUseAI && (
                  <AIWriteButton />
                )}
                <UploadButtons
                  getInputProps={getInputProps}
                  open={open}
                  onFileUpload={store.uploadFiles}
                />
                {pluginApi.customToolbarIcons
                  .map((item) => (
                    item.content ? (
                      <Popover
                        key={item.name}
                        placement={item.placement}
                        isOpen={openPopover === item.name}
                        onOpenChange={(open) => {
                          setOpenPopover(open ? item.name : null);
                        }}
                      >
                        <PopoverTrigger>
                          <div className="hover:bg-default-100 rounded-md">
                            <IconButton icon={item.icon} tooltip={item.tooltip} onClick={item.onClick} />
                          </div>
                        </PopoverTrigger>
                        <PopoverContent>
                          <PluginRender content={item.content} data={mode} />
                        </PopoverContent>
                      </Popover>
                    ) : (
                      <div key={item.name} className="hover:bg-default-100 rounded-md">
                        <IconButton icon={item.icon} tooltip={item.tooltip} onClick={item.onClick} />
                      </div>
                    )
                  ))}
              </>
            )}
            <div className='flex items-center gap-1 ml-auto'>
              {store.showIsEditText && <div className="text-red-500 text-xs mr-2">{t('edited')}</div>}
              {isPc && <FullScreenButton isFullscreen={store.isFullscreen} onClick={handleFullScreenToggle} />}
              <ViewModeButton viewMode={store.viewMode} />
              <SendButton store={store} isSendLoading={isSendLoading} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
});

export default Editor