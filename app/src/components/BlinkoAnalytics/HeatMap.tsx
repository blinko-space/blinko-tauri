import * as echarts from 'echarts'
import { useEffect, useRef } from "react"
import { useMediaQuery } from "usehooks-ts"
import dayjs from "dayjs"
import { useTranslation } from 'react-i18next'
import { useTheme } from 'next-themes'

interface HeatMapProps {
  data: Array<[string, number]>
  title?: string
  description?: string
}

export const HeatMap = ({ data, title, description }: HeatMapProps) => {
  const chartRef = useRef<HTMLDivElement>(null)
  const isPc = useMediaQuery('(min-width: 768px)')
  const { theme } = useTheme()
  const { t } = useTranslation()
  useEffect(() => {
    if (!chartRef.current) return

    const chart = echarts.init(chartRef.current)

    const handleResize = () => {
      if (!chartRef.current) return
      chart.resize()

      const width = chartRef.current.clientWidth - 30
      const height = chartRef.current.clientHeight

      const minCellSize = 14

      let cellSize
      if (!isPc) {
        cellSize = minCellSize
      } else {
        const cellSizeFromWidth = Math.floor(width / 53)
        const cellSizeFromHeight = Math.floor((height - 50) / 7)
        cellSize = Math.min(cellSizeFromWidth, cellSizeFromHeight)
      }

      chart.setOption({
        calendar: {
          cellSize: [cellSize, cellSize],
          top: 30,
          left: 0,
          right: !isPc ? 'auto' : 'auto'
        }
      })
    }
    window.addEventListener('resize', handleResize)

    const foregroundColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--foreground')
      .trim()

    const backgroundColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--card')
      .trim()

    const sencondbackground = getComputedStyle(document.documentElement)
      .getPropertyValue('--sencondbackground')
      .trim()

    const option = {
      backgroundColor: backgroundColor,
      tooltip: {
        formatter: function (params: any) {
          return `${params.value[0]}: ${params.value[1]} ${t('notes')}`
        }
      },
      visualMap: {
        show: false,
        min: 0,
        max: 10,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        top: 'top',
        textStyle: {
          color: foregroundColor
        },
        inRange: {
          color: theme === 'dark' 
          ? ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'] 
          : ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'] 
        }
      },
      calendar: {
        top: 30,
        left: 'auto',
        right: 'auto',
        aspectScale: 1,
        gap: 3,
        range: [dayjs().subtract(1, 'year').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')],
        itemStyle: {
          borderWidth: isPc ? 5 : 2,
          borderColor: backgroundColor,
          borderRadius: 5,
          color: sencondbackground
        },
        yearLabel: { show: false },
        dayLabel: {
          show: false,
          color: foregroundColor,
          nameMap: [t('sun'), t('mon'), t('tue'), t('wed'), t('thu'), t('fri'), t('sat')],
        },
        monthLabel: {
          color: foregroundColor,
          margin: 8
        },
        splitLine: {
          show: false
        }
      },
      series: [{
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: data,
        itemStyle: {
          borderRadius: 3,
          borderWidth: 1,
          borderColor: 'rgba(0, 0, 0, 0.05)'
        },
        emphasis: {
          itemStyle: {
            borderColor: 'rgba(0, 0, 0, 0.15)',
            borderWidth: 1,
            shadowBlur: 1,
            shadowColor: 'rgba(0, 0, 0, 0.1)'
          }
        },
        showEmptyItem: true,
        animation: false
      }]
    }

    chart.setOption(option)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
      chart.dispose()
    }
  }, [data, isPc])

  return (
    <div className="rounded-xl bg-card p-6 shadow-sm">
      {(title || description) && (
        <div className="mb-4">
          {title && <h2 className="text-lg font-medium">{title}</h2>}
          {description && <p className="text-sm text-gray-500">{description}</p>}
        </div>
      )}
      <div className="overflow-x-auto md:overflow-x-hidden">
        <div ref={chartRef} className="w-full md:w-full h-[150px] md:h-[240px] min-w-[800px]" />
      </div>
    </div>
  )
} 