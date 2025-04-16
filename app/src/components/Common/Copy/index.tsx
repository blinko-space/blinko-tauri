import { Icon } from '@/components/Common/Iconify/icons';
import copy from "copy-to-clipboard";
import { useState } from "react";
type IProps = { content: string, size: number, className?: string }

export const Copy = ({ content, size = 20, className }: IProps) => {
  const [isCopy, setCopy] = useState(false)
  return <div className={className}>
    {
      !isCopy ? <Icon className="text-desc cursor-pointer" icon="si:copy-duotone" width={size} height={size} onClick={(e) => {
        e.stopPropagation()
        copy(content)
        setCopy(true)
        setTimeout(() => { setCopy(false) }, 1000)
      }} />
        : <Icon className="text-green-500" icon="line-md:check-all" width={size} height={size} />
    }
  </div>
}