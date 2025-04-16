import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { PhotoProvider, PhotoView } from 'react-photo-view';

interface MermaidWrapperProps {
  content: string;
}

export const MermaidWrapper: React.FC<MermaidWrapperProps> = ({ content }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [svgUrl, setSvgUrl] = useState<string>('');

  useEffect(() => {
    if (elementRef.current) {
      mermaid.initialize({
        startOnLoad: true,
        theme: 'neutral',
        securityLevel: 'loose',
      });

      try {
        mermaid.render('mermaid-svg', content).then(({ svg }) => {
          const svgBlob = new Blob([svg], { type: 'image/svg+xml' });
          const url = URL.createObjectURL(svgBlob);
          setSvgUrl(url);
        });
      } catch (e) {
        console.error('Mermaid render error:', e);
      }
    }

    return () => {
      if (svgUrl) {
        URL.revokeObjectURL(svgUrl);
      }
    };
  }, [content]);

  return (
    <div className="mermaid-wrapper">
      {svgUrl && (
        <PhotoProvider>
          <PhotoView src={svgUrl}>
            <img src={svgUrl} alt="mermaid diagram" style={{ width: '100%' }} />
          </PhotoView>
        </PhotoProvider>
      )
      }
      <div ref={elementRef} className="mermaid" style={{ display: 'none' }}>
        {content}
      </div>
    </div >
  );
}; 