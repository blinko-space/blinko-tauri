import { ReactNode } from 'react';
import { useMediaQuery } from 'usehooks-ts';

interface ClickWrapperProps {
  children: ReactNode;
  onTap: () => void;
  className?: string;
}

export const Div = ({ children, onTap, className = '' }: ClickWrapperProps) => {
  const isPc = useMediaQuery('(min-width: 768px)')
  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isPc) {
      e.preventDefault();
    }
    onTap();
  };

  return (
    <div
      className={className}
      onClick={isPc ? handleClick : undefined}
      onTouchEnd={!isPc ? handleClick : undefined}
    >
      {children}
    </div>
  );
};