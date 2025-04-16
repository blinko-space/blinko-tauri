import { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Input, Button } from '@heroui/react';
import { useTranslation } from 'react-i18next';
import { eventBus } from '@/lib/event';
import PopoverFloat from '.';
import { RootStore } from '@/store';
import { AiStore } from '@/store/aiStore';
import { BlinkoStore } from '@/store/blinkoStore';
import { Icon } from '@/components/Common/Iconify/icons';
import { SendIcon } from '../Icons';
import { MarkdownRender } from '../MarkdownRender';
import { ScrollArea, ScrollAreaHandles } from '../ScrollArea';
import { useMediaQuery } from 'usehooks-ts';
import ReactDOM from 'react-dom';

export const showAiWriteSuggestions = () => {
  setTimeout(() => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      eventBus.emit('aiwrite:update', { rect })
    }
  })
}

const AiWritePop = observer(() => {
  const { t } = useTranslation()
  const isPc = useMediaQuery('(min-width: 768px)')
  const ai = RootStore.Get(AiStore)
  const scrollRef = useRef<ScrollAreaHandles>(null)
  const blinko = RootStore.Get(BlinkoStore)
  const store = RootStore.Local(() => ({
    rect: null as DOMRect | null,
    show: false,
    hidden() {
      store.show = false
    },

    setData(args: { rect: DOMRect }) {
      store.rect = args.rect
      store.show = true
    },

    async handleSubmit() {
      if (!ai.writeQuestion.trim()) return
      try {
        ai.writeStream('custom', blinko.isCreateMode ? blinko.noteContent : blinko.curSelectedNote!.content)
      } catch (error) {
        console.error('error:', error)
      } finally {
      }
    }
  }))

  useEffect(() => {
    eventBus.on('aiwrite:update', store.setData)
    eventBus.on('aiwrite:hidden', store.hidden)

    return () => {
      eventBus.off('aiwrite:update', store.setData)
      eventBus.off('aiwrite:hidden', store.hidden)
    }
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollToBottom()
  }, [ai.writingResponseText])

  const isInsideDialog = () => {
    if (!store.rect) return false;
    const dialogElement = document.querySelector('.modal-content');
    if (!dialogElement) return false;
    
    const dialogRect = dialogElement.getBoundingClientRect();
    return (
      store.rect.top >= dialogRect.top &&
      store.rect.bottom <= dialogRect.bottom &&
      store.rect.left >= dialogRect.left &&
      store.rect.right <= dialogRect.right
    );
  };

  const renderPopover = () => {
    const popover = (
      <PopoverFloat
        show={store.show}
        onHide={store.hidden}
        anchorRect={store.rect}
        maxWidth={isPc ? 700 : 400}
        maxHeight={isPc ? 600 : 400}
        closeOnClickOutside={false}
      >
        <div className="flex flex-col gap-3 min-w-[300px]">
          <div className="flex gap-2">
            <Input
              className='border-none'
              value={ai.writeQuestion}
              onChange={(e) => ai.writeQuestion = e.target.value}
              placeholder={'Prompt...'}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  store.handleSubmit()
                }
              }}
              startContent={<Icon className='text-primary' icon="mingcute:ai-line" width="16" height="16" />}
              endContent={<>
                {ai.isLoading ?
                  <Icon icon="mingcute:loading-line" width="16" height="16" /> :
                  <SendIcon onClick={store.handleSubmit} className='cursor-pointer primary-foreground group-hover:rotate-[-35deg] transition-all' />}
              </>}
            />
          </div>
          {
            ai.writingResponseText != '' && <ScrollArea ref={scrollRef} className='p-2 max-h-[200px]' onBottom={() => { }}>
              {ai.isLoading ? <div className='text-sm'>{ai.writingResponseText}</div> : <MarkdownRender content={ai.writingResponseText} />}
            </ScrollArea>
          }
          {ai.isWriting && (
            <div id='ai-write-suggestions' className='flex gap-2 items-center'>
              <Button onPress={() => {
                ai.isWriting = false;
                eventBus.emit('editor:insert', ai.writingResponseText)
                ai.writingResponseText = ''
                store.hidden()
              }} startContent={<Icon icon="ic:sharp-check" className='green' />} size='sm' variant='light' color='success'>{t('accept')}</Button>
              <Button onPress={() => {
                ai.isWriting = false;
                ai.writingResponseText = ''
                store.hidden()
              }} startContent={<Icon icon="ic:sharp-close" className='red' />} size='sm' variant='light' color='danger'>{t('reject')}</Button>
              <Button onPress={() => {
                ai.abortAiWrite();
              }} startContent={<Icon icon="mynaui:stop" className='blinko' />} size='sm' variant='light' color='warning'>{t('stop')} </Button>
            </div>
          )}

          <div className='flex items-center gap-2'>
            <Button startContent={<Icon icon="proicons:text-expand" width="16" height="16" />} variant='flat' color='warning' size='sm' onPress={e => {
              ai.writeStream('expand', blinko.isCreateMode ? blinko.noteContent : blinko.curSelectedNote!.content)
              // store.hidden()
            }}>{t('ai-expand')}</Button>
            <Button startContent={<Icon icon="lucide:scan-text" width="16" height="16" />} variant='flat' color='warning' size='sm' onPress={e => {
              ai.writeStream('polish', blinko.isCreateMode ? blinko.noteContent : blinko.curSelectedNote!.content)
              // store.hidden()
            }}>{t('ai-polish')}</Button>
            <Button className='ml-auto' isLoading={ai.isLoading} isIconOnly size='sm' onPress={e => {
              store.hidden()
            }}>
              <Icon icon="ic:sharp-close" />
            </Button>
          </div>
        </div>
      </PopoverFloat>
    );

    if (isInsideDialog()) {
      return ReactDOM.createPortal(
        popover,
        document.querySelector('.modal-content')!
      );
    }

    return ReactDOM.createPortal(
      popover,
      document.body
    );
  };

  return renderPopover();
});

export default AiWritePop;