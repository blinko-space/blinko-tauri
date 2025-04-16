import { useState, useRef, useCallback, useEffect } from 'react';

interface ResizableWrapperProps {
  children: React.ReactNode;
  id: string;
  defaultSize?: { width: number; height: number };
}

export const ResizableWrapper: React.FC<ResizableWrapperProps> = ({ 
  children, 
  id,
  defaultSize = { width: 420, height: 420 } 
}) => {
  const getSavedSize = () => {
    const saved = localStorage.getItem(`resizable-${id}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return defaultSize;
      }
    }
    return defaultSize;
  };

  const [size, setSize] = useState(getSavedSize());
  const [isResizing, setIsResizing] = useState(false);
  const startPos = useRef({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    localStorage.setItem(`resizable-${id}`, JSON.stringify(size));
  }, [size, id]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const deltaX = e.clientX - startPos.current.x;
    const deltaY = e.clientY - startPos.current.y;

    setSize({
      width: Math.max(320, startPos.current.width - deltaX),
      height: Math.max(320, startPos.current.height - deltaY)
    });
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    startPos.current = {
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height
    };

    setIsResizing(true);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div 
      className="relative"
      style={{ 
        width: size.width, 
        height: size.height,
        minWidth: '320px',
        minHeight: '320px',
      }}
    >
      {children}
      <div
        className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize bg-primary/20 hover:bg-primary/40 z-[999]"
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};