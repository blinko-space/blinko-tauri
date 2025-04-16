import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef } from 'react';

interface PluginRenderProps {
  content: (data?: any) => HTMLElement;
  data?: any;
}

export const PluginRender: React.FC<PluginRenderProps> = observer(({ content, data }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Clear previous content
      containerRef.current.innerHTML = '';
      // Add new content with data
      const contentElement = content(data);
      containerRef.current.appendChild(contentElement);
    }
    
    // Clean up on unmount or before re-render
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [content, data]);

  return <div ref={containerRef} />;
})