import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { useTranslation } from 'react-i18next';
import PopoverFloat from './index';
import { eventBus } from '@/lib/event';
import { RootStore } from '@/store';
import { BlinkoStore } from '@/store/blinkoStore';
import { DialogStore } from '@/store/module/Dialog';

export const IsTagSelectVisible = () => {
  const tagSelectPopup = document.getElementById('tag-select-popup')
  const isTagSelectVisible = tagSelectPopup && window.getComputedStyle(tagSelectPopup).opacity !== '0'
  return isTagSelectVisible
}

export const showTagSelectPop = (text: string = '', _rect: DOMRect | null = null) => {
  setTimeout(() => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const rect = _rect ?? selection.getRangeAt(0).getBoundingClientRect();
      eventBus.emit('tagselect:update', { rect, text })
    }
  })
}

const TagSelect = observer(() => {
  const blinko = RootStore.Get(BlinkoStore)
  const { t } = useTranslation()

  const store = RootStore.Local(() => ({
    rect: null as DOMRect | null,
    show: false,
    searchText: '',
    selectedIndex: 0,

    get tagList() {
      if (!store.searchText) {
        return blinko.tagList?.value?.pathTags
      }
      return blinko.tagList?.value?.pathTags.filter(i =>
        i.toLowerCase().includes(store.searchText.toLowerCase().replace("#", ''))
      )
    },

    hidden() {
      store.show = false
      store.selectedIndex = 0
      RootStore.Get(DialogStore).preventClose = false
    },

    setData(args: { rect: DOMRect, text: string }) {
      store.rect = args.rect
      store.show = true
      store.searchText = args.text
      store.selectedIndex = 0
      RootStore.Get(DialogStore).preventClose = true
    },

    handleKeyDown(e: KeyboardEvent) {
      if (!store.show || !store.tagList?.length) return
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          store.selectedIndex = (store.selectedIndex + 1) % store.tagList.length
          break
        case 'ArrowUp':
          e.preventDefault()
          store.selectedIndex = (store.selectedIndex - 1 + store.tagList.length) % store.tagList.length
          break
        case 'Enter':
          e.stopPropagation()
          e.preventDefault()
          const selectedTag = store.tagList[store.selectedIndex]
          if (selectedTag) {
            store.hidden()
            console.log('selectedTag', selectedTag)
            eventBus.emit('editor:replace', selectedTag, true)
          }
          break
      }
    }
  }))

  useEffect(() => {
    if (store.tagList?.length == 0) {
      store.hidden()
    }
  }, [store.tagList])

  useEffect(() => {
    eventBus.on('tagselect:update', store.setData)
    eventBus.on('tagselect:hidden', store.hidden)

    return () => {
      eventBus.off('tagselect:update', store.setData)
      eventBus.off('tagselect:hidden', store.hidden)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', store.handleKeyDown)
    return () => window.removeEventListener('keydown', store.handleKeyDown)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const selectedElement = document.querySelector(`[data-index="${store.selectedIndex}"]`);
      selectedElement?.scrollIntoView({ block: 'nearest' });
    };

    if (store.show) {
      requestAnimationFrame(handleScroll);
    }
  }, [store.selectedIndex, store.show]);

  return (
    <PopoverFloat
      show={store.show}
      onHide={store.hidden}
      anchorRect={store.rect}
    >
      {store.tagList?.map((i, index) => (
        <div
          key={i}
          data-index={index}
          className={`cursor-pointer hover:bg-hover transition-all px-2 py-1 rounded-lg
            ${index === store.selectedIndex ? 'bg-hover' : ''}`}
          onClick={e => {
            store.hidden()
            eventBus.emit('editor:replace', i)
          }}
        >
          #{i}
        </div>
      ))}
      {store.tagList?.length == 0 && (
        <div className='text-ignore font-bold text-sm'>
          {t('no-tag-found')}
        </div>
      )}
    </PopoverFloat>
  )
})

export default TagSelect;