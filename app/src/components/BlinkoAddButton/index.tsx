import { useState } from 'react';
import { motion } from 'motion/react';
import { Icon } from '@/components/Common/Iconify/icons';
import { observer } from 'mobx-react-lite';
import { ShowEditBlinkoModel } from '../BlinkoRightClickMenu';
import { FocusEditorFixMobile } from '../Common/Editor/editorUtils';

export const BlinkoAddButton = observer(() => {
  const ICON_SIZE = {
    ACTION: 16,    // Icon size for action buttons
    CENTER: 26     // Icon size for center button
  };
  const BUTTON_SIZE = {
    ACTION: 35,    // Size for action buttons
    CENTER: 50     // Size for center button
  };
  const [isDragging, setIsDragging] = useState(false);
  // Handle write action
  const handleWriteAction = () => {
    ShowEditBlinkoModel('2xl', 'create')
    FocusEditorFixMobile()
  };

  const handleClick = () => {
    handleWriteAction();
  };

  return (<div style={{
    width: BUTTON_SIZE.CENTER,
    height: BUTTON_SIZE.CENTER,
    position: 'fixed',
    right: 40,
    bottom: 110,
    zIndex: 50
  }}>
    <motion.div
      onClick={handleClick}
      animate={{
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