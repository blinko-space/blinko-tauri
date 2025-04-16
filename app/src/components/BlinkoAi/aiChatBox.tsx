import { Icon } from '@/components/Common/Iconify/icons';
import { observer } from "mobx-react-lite";
import { Button } from "@heroui/react";
import { ScrollArea, ScrollAreaHandles } from "../Common/ScrollArea";
import { motion, AnimatePresence } from "framer-motion";
import { MarkdownRender } from "../Common/MarkdownRender";
import { AiStore, AssisantMessageMetadata } from "@/store/aiStore";
import { RootStore } from "@/store";
import { useEffect } from "react";
import { useRef } from "react";
import { BlinkoCard, BlinkoItem } from "../BlinkoCard";
import { DialogStandaloneStore } from "@/store/module/DialogStandalone";
import { IconButton } from "../Common/Editor/Toolbar/IconButton";
import copy from "copy-to-clipboard";
import { ToastPlugin } from "@/store/module/Toast/Toast";
import i18n from "@/lib/i18n";
import { BlinkoStore } from "@/store/blinkoStore";
import { NoteType } from "@shared/lib/types";
import { ToolUsageChip } from "./ToolComponents";

const UserMessage = ({ content, time }: { content: string; time: string }) => (
  <motion.div
    className="flex flex-col w-full gap-2"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="text-center text-desc mt-2 text-xs">{time}</div>
    <div className="ml-auto max-w-[80%] mb-2 bg-primary text-primary-foreground p-2 rounded-xl">
      {content}
    </div>
  </motion.div>
);

const AiMessage = ({ content, withoutAnimation = false, withStreamAnimation = false, id, metadata }:
  {
    content: string, withoutAnimation?: boolean, withStreamAnimation?: boolean, id?: number,
    metadata?: AssisantMessageMetadata
  }) => (
  <motion.div
    className="group"
    initial={withoutAnimation ? {} : { opacity: 0, y: 20 }}
    exit={withoutAnimation ? {} : { opacity: 0, y: -20 }}
    animate={withoutAnimation ? {} : { opacity: 1, y: 0 }}
    transition={withoutAnimation ? {} : { duration: 0.3, ease: "easeOut" }}
  >
    <div className="max-w-[80%] bg-sencondbackground px-2 py-1 rounded-xl">
      <MarkdownRender content={content} />
    </div>
    <>
      {
        !!metadata?.notes?.length && metadata?.notes?.length > 0 && <div className="mt-2 flex flex-col gap-2">
          <div className="text-desc text-xs font-bold ml-1 select-none line-clamp-1 ">{i18n.t('ai-chat-box-notes')}</div>
          {
            //@ts-ignore
            metadata?.notes?.map((item: BlinkoItem) => (
              <Button
                key={item.id}
                size="sm"
                className="w-fit max-w-[400px] text-truncate"
                onPress={async () => {
                  RootStore.Get(DialogStandaloneStore).setData({
                    isOpen: true,
                    onlyContent: true,
                    showOnlyContentCloseButton: true,
                    size: '4xl',
                    content: <BlinkoCard blinkoItem={item!} withoutHoverAnimation />
                  })
                }}
                endContent={<Icon icon="hugeicons:arrow-right-02" className='ml-auto' width="16" height="16" />}
              >
                <div className="text-xs font-bold ml-1 select-none line-clamp-1 text-truncate">{!!item.content ? item.content : i18n.t('no-title')}</div>
              </Button>
            ))
          }
        </div>
      }
    </>

    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 mb-4">
      <div className="flex gap-2 bg-background/50 backdrop-blur-sm rounded-full p-1 items-center">
        <IconButton
          tooltip={i18n.t('add-to-blinko')}
          icon="basil:lightning-solid"
          classNames={{
            icon: 'text-yellow-500'
          }}
          onClick={() => {
            RootStore.Get(BlinkoStore).upsertNote.call({
              content: content,
              type: NoteType.BLINKO,
            })
          }}
          size={20}
          containerSize={25}
        />

        <IconButton
          tooltip={i18n.t('add-to-note')}
          icon="solar:notes-minimalistic-bold-duotone"
          classNames={{
            icon: 'text-blue-500'
          }}
          onClick={() => {
            RootStore.Get(BlinkoStore).upsertNote.call({
              content: content,
              type: NoteType.NOTE
            })
          }}
          size={20}
          containerSize={25}
        />

        <IconButton
          tooltip={i18n.t('copy')}
          icon="hugeicons:copy-01"
          onClick={() => {
            copy(content)
            RootStore.Get(ToastPlugin).success(i18n.t('operation-success'))
          }}
          size={20}
          containerSize={25}
        />
        {
          !!id && <IconButton
            tooltip={i18n.t('refresh')}
            icon="solar:refresh-outline"
            onClick={() => {
              RootStore.Get(AiStore).regenerate(id)
            }}
            size={20}
            containerSize={25}
          />
        }
        {
          !!metadata?.usage?.totalTokens && <div className="ml-auto text-desc text-xs font-bold ml-1 select-none line-clamp-1">
            {i18n.t('total-tokens')}: {metadata?.usage?.totalTokens} | {i18n.t('first-char-delay')}: {metadata?.fristCharDelay}ms
          </div>
        }

      </div>
    </div>
  </motion.div>
);

export const BlinkoChatBox = observer(() => {
  const aiStore = RootStore.Get(AiStore)
  const scrollAreaRef = useRef<ScrollAreaHandles>(null)
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollToBottom()
    }
  }, [aiStore.currentConversation.value, aiStore.currentMessageResult.content])
  return (
    <ScrollArea
      ref={scrollAreaRef}
      onBottom={() => {}}
      className="h-full"
    >
      <div className="flex flex-col p-0 md:p-2 relative h-full w-[95%] md:w-[78%] mx-auto">
        <AnimatePresence>
          {
            aiStore.currentConversation.value?.messages.find((item) => item.role == 'system') && (
              <div className="mx-auto text-desc text-xs text-center font-bold select-none line-clamp-1 p-3 border-2 border-ignore rounded-lg">
                {aiStore.currentConversation.value?.messages.find((item) => item.role == 'system')?.content}
              </div>
            )
          }
          {
            aiStore.currentConversation.value?.messages.map((item, index) => (
              <>
                {item.role == 'user' && (
                  <UserMessage key={item.content} content={item.content} time={item.createdAt.toLocaleString()} />
                )}
                {item.role == 'assistant' && (
                  <AiMessage
                    key={item.content}
                    id={item.id}
                    metadata={item.metadata as AssisantMessageMetadata}
                    content={item.content}
                  />
                )}
              </>
            ))
          }

          {
            aiStore.isAnswering && !aiStore.currentMessageResult.content && (
              <Icon className="text-desc" icon="eos-icons:three-dots-loading" width="40" height="40" />
            )
          }

          {
            aiStore.currentMessageResult.toolcall.length > 0 && (
              <div className="my-2 flex flex-wrap">
                {aiStore.currentMessageResult.toolcall.map((item, index) => (
                  <ToolUsageChip key={`active-${item}-${index}`} toolName={item} index={index} />
                ))}
              </div>
            )
          }

          <AiMessage
            key="streaming-message"
            content={aiStore.currentMessageResult.content}
            withStreamAnimation
            metadata={aiStore.currentMessageResult}
            id={aiStore.currentMessageResult.id}
          />
        </AnimatePresence>
      </div>
    </ScrollArea>
  )
})