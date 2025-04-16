import { observer } from "mobx-react-lite";

import { Input } from "@heroui/react";
import { Icon } from '@/components/Common/Iconify/icons';
import { useTranslation } from "react-i18next";
import { useState } from "react";

export const PasswordInput = observer(({ 
  value, 
  onChange, 
  onBlur,
  label, 
  placeholder, 
  className 
}: { 
  value: string, 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, 
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void,
  label?: string, 
  placeholder?: string, 
  className?: string 
}) => {
  const { t } = useTranslation()
  const [isConfirmVisible, setIsConfirmVisible] = useState(false)
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible)
  return <Input
    className={className}
    isRequired
    endContent={
      <button type="button" onClick={toggleConfirmVisibility}>
        {isConfirmVisible ? (
          <Icon
            className="pointer-events-none text-2xl text-default-400"
            icon="solar:eye-closed-linear"
          />
        ) : (
          <Icon
            className="pointer-events-none text-2xl text-default-400"
            icon="solar:eye-bold"
          />
        )}
      </button>
    }
    label={label}
    labelPlacement="outside"
    name="confirmPassword"
    placeholder={placeholder}
    type={isConfirmVisible ? "text" : "password"}
    variant="bordered"
    value={value}
    onChange={onChange}
    onBlur={onBlur}
  />
})