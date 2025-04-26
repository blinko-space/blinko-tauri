import Editor from '../Common/Editor';
import { useEffect, useState } from 'react';
import { api } from '@/lib/trpc';
import { UserStore } from '@/store/user';
import { PromisePageState, PromiseState } from '@/store/standard/PromiseState';
import { type Comment } from '@shared/lib/types';
import { Icon } from '@/components/Common/Iconify/icons';
import { Button, Tooltip, Chip, Image } from '@heroui/react';
import { BlinkoStore } from '@/store/blinkoStore';
import { Note } from '@shared/lib/types';
import { RootStore } from '@/store';
import dayjs from '@/lib/dayjs';
import { useTranslation } from 'react-i18next';
import { useIsIOS } from '@/lib/hooks';
import { DialogStore } from '@/store/module/Dialog';
import { observer } from 'mobx-react-lite';
import { ScrollArea } from '../Common/ScrollArea';
import { MarkdownRender } from '../Common/MarkdownRender';
import { AnimatePresence, motion } from 'framer-motion';
import Avatar from "boring-avatars";
import { HubStore } from '@/store/hubStore';
import axios from 'axios';
import i18n from '@/lib/i18n';
import { Spinner } from '@heroui/react';
import { ToastPlugin } from '@/store/module/Toast/Toast';
import { BlinkoItem } from '.';

export type AvatarAccount = { image?: string; nickname?: string; name?: string; id?: any | number; };

export const UserAvatar = observer(({ account, guestName, isAuthor, blinkoItem, withoutName, size = 20 }: {
  account?: AvatarAccount;
  guestName?: string;
  isAuthor?: boolean;
  blinkoItem?: BlinkoItem;
  withoutName?: boolean;
  size?: number;
}) => {
  const { t } = useTranslation();
  const displayName = account ? (account.nickname || account.name) : (guestName || '');
  return (
    <div className="flex items-center gap-2">
      {account ? (
        <>
          {account.image ? (
            <Image src={blinkoItem?.originURL ? blinkoItem.originURL + account.image : account.image} radius="full" alt="" width={size} height={size} />
          ) : (
            <Avatar
              size={size}
              name={displayName}
              variant="beam"
            />
          )}
          {!withoutName && <span className="text-sm font-medium">{displayName}</span>}
          {isAuthor && blinkoItem && String(account.id) === String(blinkoItem.accountId) && (
            <Chip size="sm" color="warning" variant="flat">{t('author')}</Chip>
          )}
        </>
      ) : (
        <>
          <Avatar
            size={size}
            name={displayName}
            variant="beam"
          />
          {!withoutName && <span className="text-sm font-medium">{displayName}</span>}
        </>
      )}
    </div>
  );
});

export const CommentDialog = observer(({ blinkoItem }: { blinkoItem: BlinkoItem }) => {
  const { t } = useTranslation();
  const blinko = RootStore.Get(BlinkoStore);
  const [content, setContent] = useState('');
  const user = RootStore.Get(UserStore);
  const hubStore = RootStore.Get(HubStore);

  const Store = RootStore.Local(() => ({
    reply: {
      id: null as number | null,
      name: ''
    },
    commentList: new PromisePageState({
      function: async ({ page, size }) => {
        if (blinkoItem.originURL) {
          const res = await axios.post(blinkoItem.originURL + '/api/v1/comment/list', {
            noteId: blinkoItem.id,
            page,
            size,
            orderBy: 'desc'
          })
          return res.data.items
        }

        const res = await api.comments.list.query({
          noteId: blinkoItem.id!,
          page,
          size,
          orderBy: 'desc'
        })
        return res.items
      }
    }),
    handleReply: (commentId: number, commentName: string) => {
      Store.reply = {
        id: commentId,
        name: commentName
      }
    },
    handleSendComment: new PromiseState({
      function: async ({ content }: { content: string }) => {
        if (!content.trim()) return;
        const params: any = {
          content,
          noteId: blinkoItem.id
        }
        if (Store.reply.id) {
          params.parentId = Store.reply.id
        }

        if (blinkoItem.originURL) {
          await axios.post(blinkoItem.originURL + '/api/v1/comment/create', {
            ...params,
            guestName: user.userInfo.value?.nickName ?? user.userInfo.value?.name
          });
        } else {
          await api.comments.create.mutate(params);
        }

        await Store.commentList.resetAndCall({});
        setContent('');
        blinko.updateTicker++
      }
    }),
    handleDelete: new PromiseState({
      function: async (commentId: number) => {
        if (blinkoItem.originURL) {
          await axios.post(blinkoItem.originURL + '/api/v1/comment/delete', {
            id: commentId
          });
        } else {
          await api.comments.delete.mutate({ id: commentId });
        }
        await Store.commentList.resetAndCall({});
        blinko.updateTicker++
      }
    }),
    safeUA: (ua: string) => {
      try {
        const _ua = JSON.parse(ua)
        return _ua.os.name + ' ' + _ua.browser.name
      } catch (error) {
        return ""
      }
    }
  }));

  useEffect(() => {
    Store.commentList.resetAndCall({});
  }, []);

  return (
    <div>
      {/* Comment List */}
      {Store.commentList.isEmpty ? (
        <div className="text-center text-gray-500 py-4">{t('no-comments-yet')}</div>
      ) : (
        <ScrollArea className="md:max-h-[550px] max-h-[400px] overflow-y-auto -mt-4" onBottom={async () => {
          await Store.commentList.callNextPage({});
        }}>
          {Store.commentList.value?.map((comment: Comment['items'][0]) => (
            <div key={comment.id} className="mb-2 border-divider p-2 rounded-2xl bg-background">
              <div className="flex items-center justify-between">
                <UserAvatar
                  account={comment.account || undefined}
                  guestName={comment.guestName || undefined}
                  isAuthor={true}
                  blinkoItem={blinkoItem}
                />
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="light"
                    isIconOnly
                    onPress={() => Store.handleReply(comment.id, comment.account?.nickname || comment.account?.name || comment.guestName || '')}
                  >
                    <Icon icon="akar-icons:comment" width="16" height="16" />
                  </Button>
                  {(user.id === String(comment.note?.account?.id) || user.id === String(comment.account?.id)) && !blinkoItem.originURL && (
                    <Button
                      size="sm"
                      variant="light"
                      color="danger"
                      isIconOnly
                      onPress={() => Store.handleDelete.call(comment.id)}
                    >
                      <Icon icon="akar-icons:trash" width="16" height="16" />
                    </Button>
                  )}
                </div>
              </div>
              <div className="p-2 -mt-2">
                <MarkdownRender content={comment.content} />
                <div className="text-xs text-desc mt-1 flex items-center gap-2">
                  <span>{dayjs(comment.createdAt).fromNow()}</span>
                  {Store.safeUA(comment?.guestUA ?? '') && (
                    <>
                      <span>·</span>
                      <span>{t('from')} {Store.safeUA(comment?.guestUA ?? '')}</span>
                    </>
                  )}
                </div>
              </div>

              {comment.replies && comment.replies.length > 0 && (
                <div className="ml-8 mt-2 space-y-2">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="pl-4 py-1">
                      <div className="flex items-center justify-between">
                        <UserAvatar
                          account={reply.account || undefined}
                          guestName={reply.guestName || undefined}
                          isAuthor={true}
                          blinkoItem={blinkoItem}
                        />
                        {user.id === String(reply.accountId) && (
                          <Button
                            size="sm"
                            color="danger"
                            variant="light"
                            isIconOnly
                            onPress={() => Store.handleDelete.call(reply.id)}
                          >
                            <Icon icon="akar-icons:trash" width="16" height="16" />
                          </Button>
                        )}
                      </div>
                      <div className="text-sm mt-1">
                        {reply.content}
                        <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                          <span>{dayjs(reply.createdAt).fromNow()}</span>
                          {Store.safeUA(reply?.guestUA ?? '') && (
                            <>
                              <span>·</span>
                              <span>{t('from')} {Store.safeUA(reply?.guestUA ?? '')}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </ScrollArea>
      )}

      {/* Reply UI */}
      <AnimatePresence>
        {Store.reply.id && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center justify-between mt-3 p-2 bg-background rounded-lg"
          >
            <div className="text-sm text-yellow-500 font-bold">
              {t('reply-to')} <span>@{Store.reply.name}</span>
            </div>
            <Icon
              icon="material-symbols:close"
              className="cursor-pointer text-default-400 hover:text-default-500"
              width="18"
              onClick={() => Store.reply = { id: null, name: '' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Editor */}
      <div className="pt-3">
        <Editor
          mode='comment'
          content={content}
          onChange={setContent}
          onSend={async ({ content }) => {
            await Store.handleSendComment.call({ content })
          }}
          isSendLoading={Store.handleSendComment.loading.value}
          originFiles={[]}
          originReference={[]}
          hiddenToolbar
        />
      </div>
    </div>
  );
});

export const ShowCommentDialog = async (noteId: number) => {
  const blinko = RootStore.Get(BlinkoStore);
  const dialog = RootStore.Get(DialogStore);

  try {
    dialog.setData({
      isOpen: true,
      size: 'lg',
      title: i18n.t('comment'),
      content: <div className="flex justify-center py-4"><Spinner /></div>
    });

    const noteDetail = await blinko.noteDetail.call({ id: noteId });

    if (!noteDetail) {
      RootStore.Get(ToastPlugin).error(i18n.t('note-not-found'));
      dialog.setData({ isOpen: false });
      return;
    }

    dialog.setData({
      isOpen: true,
      size: 'lg',
      title: `${i18n.t('comment')} ${noteDetail._count?.comments ? `(${noteDetail._count.comments})` : ''}`,
      content: <CommentDialog blinkoItem={noteDetail} />
    });

  } catch (error) {
    console.error('Failed to load note detail:', error);
    RootStore.Get(ToastPlugin).error(i18n.t('failed-to-load-comments'));
    dialog.setData({ isOpen: false });
  }
};

export const CommentButton = observer(({ blinkoItem, alwaysShow = false }: { blinkoItem: Note, alwaysShow?: boolean }) => {
  const { t } = useTranslation();
  const isIOSDevice = useIsIOS();
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    RootStore.Get(DialogStore).setData({
      isOpen: true,
      size: 'lg',
      title: `${i18n.t('comment')} ${blinkoItem._count?.comments ? `(${blinkoItem._count.comments})` : ''}`,
      content: <CommentDialog blinkoItem={blinkoItem} />
    });
  };

  return (
    <Tooltip content={t('comment')}>
      <div className="flex items-center gap-2">
        <Icon
          icon="akar-icons:comment"
          width="15"
          height="15"
          className={`cursor-pointer ml-2 ${isIOSDevice
            ? 'opacity-60'
            : `${alwaysShow ? '!text-ignore' : '!text-desc opacity-0 group-hover/card:opacity-100 group-hover/card:translate-x-0 translate-x-1'}`
            }`}
          onClick={handleClick}
        />
      </div>
    </Tooltip>
  );
});

export const CommentCount = observer(({ blinkoItem }: { blinkoItem: Note }) => {
  if (blinkoItem?._count?.comments == 0) return null;
  return (
    <div className="flex items-center gap-1">
      <CommentButton blinkoItem={blinkoItem} alwaysShow={true} />
      <span className="text-sm text-ignore">{blinkoItem?._count?.comments}</span>
    </div>
  );
});
