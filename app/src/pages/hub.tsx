import { BlinkoCard } from "@/components/BlinkoCard";
import { ScrollArea } from "@/components/Common/ScrollArea";
import { RootStore } from "@/store";
import { Icon } from '@/components/Common/Iconify/icons';
import { Button } from "@heroui/react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Masonry from "react-masonry-css";
import { GradientBackground } from "@/components/Common/GradientBackground";
import { UserStore } from "@/store/user";
import { UserAvatar } from "@/components/BlinkoCard/commentButton";
import { useMediaQuery } from "usehooks-ts";
import { BlinkoStore } from "@/store/blinkoStore";
import { DialogStore } from "@/store/module/Dialog";
import { BlinkoFollowDialog, BlinkoFollowingDialog } from "@/components/BlinkoFollowDialog";
import { HubStore } from "@/store/hubStore";
import { LoadingAndEmpty } from "@/components/Common/LoadingAndEmpty";
import { _ } from "@/lib/lodash";
import { ScrollableTabs } from "@/components/Common/ScrollableTabs";

const Hub = observer(({ className }: { className?: string }) => {
  const { t } = useTranslation()
  const blinko = RootStore.Get(BlinkoStore)
  const user = RootStore.Get(UserStore)
  const isPc = useMediaQuery('(min-width: 768px)')
  const store = RootStore.Get(HubStore)
  const debounceLoadData = _.debounce(() => {
    store.loadAllData()
  }, 1000)

  useEffect(() => {
    store.loadAllData()
  }, [])

  useEffect(() => {
    store.loadAllData()
  }, [blinko.updateTicker])

  useEffect(() => {
    debounceLoadData()
  }, [blinko.searchText])

  return <ScrollArea className={'h-full bg-background'} onBottom={() => store.shareNoteList.callNextPage({})}>
    <GradientBackground className="flex flex-col gap-2 bg-background md:h-[300px] h-[150px]">
      <div className="flex flex-col gap-2 h-full md:px-6">
        <div className="border-2 border-hover w-full h-full md:h-fit md:max-w-screen-xl glass-effect mx-auto md:mt-[70px] md:rounded-2xl p-4 md:p-6">
          <div className="flex items-start gap-2 md:gap-6">
            <UserAvatar
              account={{
                image: store.siteInfo.value?.image,
              }}
              guestName={store.siteInfo.value?.name}
              size={isPc ? 100 : 80} />

            <div className="flex flex-col gap-2 md:gap-4 flex-1">
              <div className="flex items-center justify-between">
                <div className="flex gap-1 md:items-center md:w-full md:flex-row flex-col">
                  <div className="md:text-2xl text-md font-bold">{store.siteInfo.value?.name}</div>
                  {
                    store.siteInfo.value?.role == 'superadmin' &&
                    <div className="flex items-center gap-1 bg-primary text-primary-foreground rounded-full w-fit px-2 py-1 text-xs">
                      <div>{t('admin')}</div>
                      <Icon icon="ri:vip-crown-2-fill" width="15" height="15" className="text-yellow-500" />
                    </div>
                  }
                </div>

                <div className="flex items-center gap-4 md:flex-row flex-col">
                  {
                    user.isLogin && <Button
                      onPress={() => {
                        window.open("https://github.com/blinko-space/blinko-hub/new/main/sites?filename=my-site.yml&value=title%3A%20%22Your%20Site%20Name%22%0Aurl%3A%20%22https%3A%2F%2Fyour-site-domain%22%0Atags%3A%20%0A%20%20-%20english%20%20%20%20%23%20main%20language%0A%20%20-%20blog%20%20%20%20%20%20%20%23%20site%20type%0Acreated_at%3A%20%222024-01-14%22%20%20%23%20creation%20date")
                      }}
                      size={isPc ? 'md' : 'sm'}
                      radius="full"
                      className="px-4 py-2 rounded-full ">
                      {t('join-hub')}
                    </Button>
                  }
                  {user.isLogin && user.userInfo.value?.id == store.siteInfo.value?.id &&
                    (
                      <Button
                        onPress={() => {
                          RootStore.Get(DialogStore).setData({
                            isOpen: true,
                            title: t('follow'),
                            size: 'lg',
                            content: <BlinkoFollowDialog onConfirm={() => {
                              store.loadAllData()
                            }} />,
                          })
                        }}
                        size={isPc ? 'md' : 'sm'} color="primary" radius="full" startContent={<Icon icon="fluent:people-add-32-regular" className="w-4 h-4" />}
                        className="px-4 py-2 rounded-full ">
                        {t('follow')}
                      </Button>
                    )
                  }
                </div>
              </div>

              <div className="flex items-center gap-8 text-sm text-desc">
                <div className="flex items-center gap-1 cursor-pointer" onClick={() => {
                  RootStore.Get(DialogStore).setData({
                    isOpen: true,
                    title: t('following'),
                    content: <BlinkoFollowingDialog isFollowing={false} data={store.followList.value ?? []} onConfirm={() => {
                      store.loadAllData()
                    }} />,
                  })
                }}>
                  <span className="font-medium">{store.followList.value?.length ?? 0}</span>
                  <span>{t('follower')}</span>
                </div>
                <div className="flex items-center gap-1 cursor-pointer"
                  onClick={() => {
                    RootStore.Get(DialogStore).setData({
                      isOpen: true,
                      title: t('following'),
                      content: <BlinkoFollowingDialog isFollowing={true} data={store.followingList.value ?? []} onConfirm={() => {
                        store.loadAllData()
                      }} />,
                    })
                  }}>
                  <span className="font-medium">{store.followingList.value?.length ?? 0}</span>
                  <span>{t('following')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GradientBackground>

    <div className="max-w-screen-xl mx-auto p-4 md:p-0">
      <div className='flex items-center justify-between gap-2 mb-4 md:mb-6 md:my-6 rounded-2xl overflow-hidden'>
        <div className="flex-1 min-w-0">
          <ScrollableTabs
            items={[
              { key: "site", title: t("home-site") },
              ...(store.followingList.value?.length ?? 0 > 0 ? [{ key: "recommand", title: t("recommand") }] : []),
              ...(store.followingList.value?.map(item => ({
                key: item.siteUrl,
                title: item.siteName
              })) || [])
            ]}
            selectedKey={store.currentListType === 'home' ? 'site' : store.currentListType === 'site' ? store.currentSiteURL : store.currentListType}
            onSelectionChange={(e) => {
              if (e == 'site') {
                store.currentSiteURL = ''
                store.currentListType = 'home'
              } else if (e == 'recommand') {
                store.currentListType = 'recommand'
              } else {
                store.currentListType = 'site'
                store.currentSiteURL = store.followingList.value?.find(item => item.siteUrl == e)?.siteUrl ?? ''
              }
              //add to next tick
              setTimeout(() => {
                store.shareNoteList.value = []
                store.shareNoteList.resetAndCall({})
              }, 0)
            }}
            color="primary"
            classNames={{
              base: "w-full",
              tabList: "gap-2 relative p-2 w-full bg-transparent text-foreground overflow-x-auto scroll-smooth",
              tab: "max-w-fit px-2 h-8 text-sm md:px-3 md:h-10 md:text-base"
            }}
          />
        </div>

        <Button variant="faded" color="primary" isIconOnly onPress={() => {
          store.forceBlog.save(!store.forceBlog.value)
        }} className="shrink-0">
          <Icon icon="fluent:arrow-expand-all-16-filled" width="20" height="20" className={`transition-transform duration-300 ${store.forceBlog.value ? "rotate-180" : ""}`} />
        </Button>
      </div>
      <LoadingAndEmpty
        isLoading={store.shareNoteList.isLoading}
        isEmpty={store.shareNoteList.isEmpty}
      />
      <Masonry
        breakpointCols={{
          default: 3,
          500: 1
        }}
        className="blog-masonry-grid"
        columnClassName="blog-masonry-grid_column">
        {
          store.shareNoteList?.value?.map(i => {
            return <BlinkoCard
              className='border-1 border-hover rounded-2xl'
              key={i.id}
              blinkoItem={i}
              isShareMode={
                RootStore.Get(UserStore).userInfo.value?.id != i.accountId || store.currentSiteURL != '' || i.originURL
              }
              account={i.account ?? undefined} forceBlog={store.forceBlog.value} />
          })
        }
      </Masonry>
    </div>
  </ScrollArea>
});

export default Hub