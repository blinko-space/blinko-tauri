import { ReactNode, Component, ErrorInfo } from 'react';
import React from 'react'
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import * as reactSpring from '@react-spring/three'
import { RootStore } from '@/store/root';
import { BlinkoStore } from '@/store/blinkoStore';
import { cn } from '@heroui/react';

class GradientErrorBoundary extends Component<{ children: ReactNode }> {
  state = { hasError: false };
  
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('ShaderGradient error caught:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-br from-blue-500 to-purple-600" />;
    }
    
    return this.props.children;
  }
}

interface GradientBackgroundProps {
  children: ReactNode;
  className?: string;
}

export const GradientBackground = ({ children, className }: GradientBackgroundProps) => {
  const blinko = RootStore.Get(BlinkoStore)

  return (
    <div className={cn("relative w-full h-[100vh]", className)}>
      <GradientErrorBoundary>
        <ShaderGradientCanvas
          style={{
            position: 'absolute',
            top: 0,
          }}
        >
          {
            blinko.config.value?.customBackgroundUrl ?
              <ShaderGradient
                control='query'
                urlString={blinko.config.value?.customBackgroundUrl}
              />
              :
              <ShaderGradient
                type="waterPlane"
                animate={blinko.config.value?.isCloseBackgroundAnimation ? 'off' : 'on'}
                uTime={0.2}
                uSpeed={0.1}
                uStrength={2.4}
                uDensity={1.1}
                uFrequency={5.5}
                uAmplitude={0}
                positionX={-0.5}
                positionY={0.1}
                positionZ={0}
                rotationX={0}
                rotationY={0}
                rotationZ={235}
                color1="#4603ff"
                color2="#FE8989"
                color3="#000000"
                reflection={0.1}
                wireframe={false}
                cAzimuthAngle={180}
                cPolarAngle={115}
                cDistance={3.9}
                lightType="3d"
                brightness={1.1}
                envPreset="city"
                grain='off'
              />
          }
        </ShaderGradientCanvas>
      </GradientErrorBoundary>
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}; 