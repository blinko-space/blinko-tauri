// ... existing imports ...
import { useState, useRef, TouchEvent } from 'react';
import { motion } from 'motion/react';
import { RootStore } from '@/store';
import { BlinkoStore } from '@/store/blinkoStore';
import { Icon } from '@/components/Common/Iconify/icons';
import { observer } from 'mobx-react-lite';
import { useMediaQuery } from 'usehooks-ts';
import { ShowEditBlinkoModel } from '../BlinkoRightClickMenu';
import { FocusEditorFixMobile } from '../Common/Editor/editorUtils';
import { useNavigate } from 'react-router-dom';
export const BlinkoAddButton = observer(() => {
  // Constants for button spacing and icon sizes
  const BUTTON_SPACING = {
    TOP: 55,    // Top button spacing
    BOTTOM: 70  // Bottom button spacing
  };
  const ICON_SIZE = {
    ACTION: 16,    // Icon size for action buttons
    CENTER: 26     // Icon size for center button
  };
  const BUTTON_SIZE = {
    ACTION: 35,    // Size for action buttons
    CENTER: 50     // Size for center button
  };

  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

  // fix #619 Temporarily hide the top and bottom icons
  // const [showActions, setShowActions] = useState(false);

  const [isDragging, setIsDragging] = useState(false);
  const [activeButton, setActiveButton] = useState<'none' | 'top' | 'bottom'>('none');
  const isPc = useMediaQuery('(min-width: 768px)');
  // const router = useRouter()
  const navigate = useNavigate()

  // Add touch-related states
  const touchStartRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const [lastActiveButton, setLastActiveButton] = useState<'none' | 'top' | 'bottom'>('none');

  // Vibration function
  const vibrate = () => {
    if (typeof navigator.vibrate === 'function') {
      navigator.vibrate(50); // Vibrate for 50ms
    }
  };

  // Handle touch start
  const handleTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return;

    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY
    };
    isDraggingRef.current = true;
    setIsDragging(true);
  };

  // Handle touch move
  const handleTouchMove = (e: TouchEvent) => {
    if (!isDraggingRef.current) return;

    const touch = e.touches[0];
    if (!touch) return;

    const deltaY = touch.clientY - touchStartRef.current.y;

    let newActiveButton: 'none' | 'top' | 'bottom' = 'none';

    // Detect if the touch is in the top button area
    if (deltaY < -30) {
      newActiveButton = 'top';
    } else if (deltaY > 30) {
      newActiveButton = 'bottom';
    }
    // fix #619 Temporarily hide the top and bottom icons
    // setShowActions(true);

    // Vibrate when sliding to a new button area
    if (newActiveButton !== 'none' && newActiveButton !== lastActiveButton) {
      vibrate();
    }

    setLastActiveButton(newActiveButton);
    setActiveButton(newActiveButton);
  };

  // Handle AI action
  const handleAiAction = () => {
    navigate('/ai')
    // fix #619 Temporarily hide the top and bottom icons
    // setShowActions(false);
  };

  // Handle write action
  const handleWriteAction = () => {
    ShowEditBlinkoModel('2xl', 'create')
    FocusEditorFixMobile()
    // fix #619 Temporarily hide the top and bottom icons
    // setShowActions(false);
  };

  // Handle touch end
  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
    // fix #619 Temporarily hide the top and bottom icons
    // When clicking the button, open the writing dialog
    // When holding and sliding up or down, open the AI dialog
    switch (activeButton) {
      case 'top':
      case 'bottom':
        const blinko = RootStore.Get(BlinkoStore)
        blinko.config.value?.isUseAI && handleAiAction();
        break;
      default:
        handleWriteAction();
        break;
    }
    setActiveButton('none');
    setLastActiveButton('none');
  };

  // temporarily hide the top and bottom icons
  // Handle click event
  // const handleClick = () => {
  //   // Only toggle showActions if not dragging
  //   if (!isDragging) {
  //     setShowActions(prev => !prev);
  //   }
  // };

  return (<div style={{
    width: BUTTON_SIZE.CENTER,
    height: BUTTON_SIZE.CENTER,
    position: 'fixed',
    right: 40,
    bottom: 110,
    zIndex: 50
  }}>

    {/* fix #619 Temporarily hide the top and bottom icons */}
    {/* Writing icon button (Top) */}
    {/* <motion.div
      onClick={handleWriteAction}
      initial={{ y: 0, opacity: 0 }}
      animate={{
        y: showActions ? -BUTTON_SPACING.TOP : 0,
        opacity: showActions ? 1 : 0,
        scale: activeButton === 'top' ? 1.2 : 1
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        position: 'absolute',
        left: (BUTTON_SIZE.CENTER - BUTTON_SIZE.ACTION) / 2,
        width: BUTTON_SIZE.ACTION,
        height: BUTTON_SIZE.ACTION
      }}
      className="bg-foreground rounded-full flex items-center justify-center cursor-pointer text-background box-shadow-[0_0_10px_2px_rgba(255,204,0,0.5)]"
    >
      <Icon icon="icon-park-outline:write" width={ICON_SIZE.ACTION} height={ICON_SIZE.ACTION} />
    </motion.div> */}
    {/* AI icon button (Bottom) */}
    {/* <motion.div
      onClick={handleAiAction}
      initial={{ y: 0, opacity: 0 }}
      animate={{
        y: showActions ? BUTTON_SPACING.BOTTOM : 0,
        opacity: showActions ? 1 : 0,
        scale: activeButton === 'bottom' ? 1.2 : 1
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        position: 'absolute',
        left: (BUTTON_SIZE.CENTER - BUTTON_SIZE.ACTION) / 2,
        width: BUTTON_SIZE.ACTION,
        height: BUTTON_SIZE.ACTION
      }}
      className="bg-foreground rounded-full flex items-center justify-center cursor-pointer text-background box-shadow-[0_0_10px_2px_rgba(255,204,0,0.5)]"
    >
      <Icon icon="mingcute:ai-line" width={ICON_SIZE.ACTION} height={ICON_SIZE.ACTION} />
    </motion.div> */}

    {/* Center add button */}
    <motion.div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      // fix #619 Temporarily hide the top and bottom icons
      // onClick={handleClick}
      animate={{
        // This animation is not necessary for now
        // rotate: showActions ? 45 : 0,
        scale: isDragging ? 1.1 : 1,
      }}
      transition={{
        duration: 0.3,
        scale: {
          type: "spring",
          stiffness: 300,
          damping: 20
        }
      }}
      className="absolute inset-0 flex items-center justify-center bg-[#FFCC00] text-black rounded-full cursor-pointer"
      style={{
        boxShadow: '0 0 10px 2px rgba(255, 204, 0, 0.5)'
      }}
    >
      <Icon icon="material-symbols:add" width={ICON_SIZE.CENTER} height={ICON_SIZE.CENTER} />
    </motion.div>
  </div>
  );
});