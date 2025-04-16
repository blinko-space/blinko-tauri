import React, { useState, useRef, useEffect } from 'react';

const DraggableDiv = ({ children }) => {
  const [position, setPosition] = useState(() => {
    const savedPosition = localStorage.getItem('draggableDivPosition');
    if (savedPosition) {
      return JSON.parse(savedPosition);
    } else {
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
      return { top: windowHeight - 200, left: windowWidth - 50 };
    }
  });

  const isDragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    isDragging.current = true;
    offset.current = {
      x: e.clientX - position.left,
      y: e.clientY - position.top,
    };
  };

  const handleTouchStart = (e) => {
    isDragging.current = true;
    const touch = e.touches[0];
    offset.current = {
      x: touch.clientX - position.left,
      y: touch.clientY - position.top,
    };
  };

  const handleMove = (e) => {
    if (!isDragging.current) return;

    const clientX = e.clientX ?? e.touches[0].clientX;
    const clientY = e.clientY ?? e.touches[0].clientY;

    const newTop = clientY - offset.current.y;
    const newLeft = clientX - offset.current.x;
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const topLimit = newTop > 50;
    const bottomLimit = newTop < windowHeight - 50;
    const leftLimit = newLeft > 50;
    const rightLimit = newLeft < windowWidth - 50;

    setPosition((prev) => {
      const updatedPosition = {
        top: topLimit && bottomLimit ? newTop : prev.top,
        left: leftLimit && rightLimit ? newLeft : prev.left,
      };
      localStorage.setItem('draggableDivPosition', JSON.stringify(updatedPosition));
      return updatedPosition;
    });
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      className='w-fit h-fit'
      style={{
        position: 'fixed',
        top: position.top,
        left: position.left,
        cursor: 'pointer',
        userSelect: 'none',
        zIndex: 10,
      }}
    >
      {children}
    </div>
  );
};

export default DraggableDiv;
