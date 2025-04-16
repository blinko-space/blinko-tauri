import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Card } from '@heroui/react';
import { motion } from "motion/react"
import { useMediaQuery } from 'usehooks-ts'

interface PopoverFloatProps {
  children: React.ReactNode;
  show: boolean;
  onHide: () => void;
  anchorRect: DOMRect | null;
  maxHeight?: number;
  maxWidth?: number;
  closeOnClickOutside?: boolean;
}

const PopoverFloat = observer(({
  children,
  show,
  onHide,
  anchorRect,
  maxHeight = 200,
  maxWidth = 250,
  closeOnClickOutside = true
}: PopoverFloatProps) => {
  const isPc = useMediaQuery('(min-width: 768px)')
  const popRef: any = useRef(null)

  const getPosition = () => {
    if (!anchorRect || typeof window === 'undefined') return { top: 0, left: 0 }
    let top = anchorRect.bottom || anchorRect.top
    let left = anchorRect.left

    const popHeight = popRef.current?.clientHeight ?? maxHeight
    const popWidth = popRef.current?.clientWidth ?? maxWidth
    const viewportHeight = window.innerHeight
    const viewportWidth = window.innerWidth

    if (top + popHeight > viewportHeight) {
      top = Math.max(10, anchorRect.top - popHeight)
    } else {
      top += 5
    }

    if (left + popWidth > viewportWidth) {
      left = Math.max(10, viewportWidth - popWidth - 10)
    }

    left = Math.max(10, left)

    return { top, left }
  }

  const position = getPosition()

  useEffect(() => {
    if (!show || !closeOnClickOutside) return

    const handleClickOutside = (event: MouseEvent) => {
      if (popRef.current && !popRef.current.contains(event.target as Node)) {
        onHide()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [show, onHide, closeOnClickOutside])

  return (
    <motion.div
      id='tag-select-popup'
      ref={popRef}
      animate={show ? 'enter' : 'exit'}
      variants={{
        enter: {
          opacity: 1,
          transition: { type: 'spring', bounce: 0.5, duration: 0.4 },
          zIndex: 3000,
          y: 5,
          x: 0
        },
        exit: {
          opacity: 0,
          y: -5,
          transition: { type: 'spring', bounce: 0.5, duration: 0.3 },
          transitionEnd: {
            zIndex: -99
          }
        },
      }}
      style={{
        position: 'fixed',
        opacity: 0,
        top: position.top,
        left: position.left,
        zIndex: -99
      }}>
      <Card
        shadow='lg'
        radius='md'
        style={{
          maxHeight: maxHeight + 'px',
          maxWidth: maxWidth + 'px',
          minWidth: '150px'
        }}
        className={`p-2 rounded-md overflow-y-scroll overflow-x-hidden`}
      >
        {children}
      </Card>
    </motion.div>
  );
});

export default PopoverFloat;