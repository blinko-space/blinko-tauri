import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface EchartsWrapperProps {
  options: string;
}

export const EchartsWrapper = ({ options }: EchartsWrapperProps) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    try {
      const parsedOptions = JSON.parse(options);
      chartInstance.current.setOption(parsedOptions);
    } catch (error) {
      console.error('Failed to parse echarts options:', error);
    }

    const handleResize = () => {
      chartInstance.current?.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstance.current?.dispose();
      chartInstance.current = null;
    };
  }, [options]);

  return (
    <div 
      ref={chartRef} 
      className="w-full h-96 my-4 rounded-lg border border-gray-200 dark:border-gray-800"
    ></div>
  );
}; 