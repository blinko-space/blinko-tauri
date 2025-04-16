import { Card, CardBody } from "@heroui/react"
import { observer } from "mobx-react-lite"
import { useTranslation } from "react-i18next"
import { motion, AnimatePresence } from "framer-motion"
import { useMemo } from "react"
import { Icon } from '@/components/Common/Iconify/icons'

interface StatsCardsProps {
  stats: {
    noteCount?: number
    totalWords?: number
    maxDailyWords?: number
    activeDays?: number
  }
}

interface StatCardProps {
  label: string
  value: number
  delay?: number
  gradient: string
  icon: string
}

const gradients = [
  "from-[#FF6B6B] via-[#4ECDC4] to-[#45B7D1]",
  "from-[#08AEEA] via-[#2AF598] to-[#4FACFE]",
  "from-[#FF9A8B] via-[#FF6A88] to-[#FF99AC]",
  "from-[#A9C9FF] via-[#FFBBEC] to-[#F3A0F7]",
  "from-[#21D4FD] via-[#2876F9] to-[#B721FF]",
  "from-[#FEE140] via-[#FA709A] to-[#FF8177]"
]

const StatCard = ({ label, value, delay = 0, gradient, icon }: StatCardProps) => {
  return (
    <Card className="bg-background" shadow="none">
      <CardBody>
        <div className="flex items-center gap-2">
          <Icon icon={icon} className="w-5 h-5" />
          <p className="text-tiny uppercase font-bold">{label}</p>
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={value}
            className={`text-4xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              duration: 0.3, 
              delay: delay,
              type: "spring",
              stiffness: 200,
              damping: 20
            }}
          >
            {value}
          </motion.p>
        </AnimatePresence>
      </CardBody>
    </Card>
  )
}

export const StatsCards = observer(({ stats }: StatsCardsProps) => {
  const { t } = useTranslation()
  
  const randomGradients = useMemo(() => {
    const indices = Array.from({ length: gradients.length }, (_, i) => i)
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      //@ts-ignore
      [indices[i], indices[j]] = [indices[j], indices[i]]
    }
    return indices.slice(0, 4).map(i => gradients[i]!)
  }, [])
  
  const statItems = [
    { label: t('note-count'), value: stats?.noteCount ?? 0, delay: 0, gradient: randomGradients[0]!, icon: 'ri:file-list-3-line' },
    { label: t('total-words'), value: stats?.totalWords ?? 0, delay: 0.1, gradient: randomGradients[1]!, icon: 'ri:file-text-line' },
    { label: t('max-daily-words'), value: stats?.maxDailyWords ?? 0, delay: 0.2, gradient: randomGradients[2]!, icon: 'ri:line-chart-line' },
    { label: t('active-days'), value: stats?.activeDays ?? 0, delay: 0.3, gradient: randomGradients[3]!, icon: 'ri:calendar-check-line' }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {statItems.map((item) => (
        <StatCard key={item.label} {...item} />
      ))}
    </div>
  )
}) 