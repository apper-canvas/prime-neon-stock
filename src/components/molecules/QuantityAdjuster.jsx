import { useState } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const QuantityAdjuster = ({ 
  className,
  value = 0,
  onChange,
  min = 0,
  max = 999,
  disabled = false,
  size = "sm",
  ...props 
}) => {
  const [isUpdating, setIsUpdating] = useState(false)

  const handleDecrease = async () => {
    if (value > min && !disabled && !isUpdating) {
      setIsUpdating(true)
      try {
        if (onChange) {
          await onChange(value - 1)
        }
      } finally {
        setIsUpdating(false)
      }
    }
  }

  const handleIncrease = async () => {
    if (value < max && !disabled && !isUpdating) {
      setIsUpdating(true)
      try {
        if (onChange) {
          await onChange(value + 1)
        }
      } finally {
        setIsUpdating(false)
      }
    }
  }

  const buttonSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10"
  }

  const textSizes = {
    sm: "text-sm min-w-[3rem]",
    md: "text-base min-w-[4rem]"
  }

  return (
    <div className={cn("flex items-center space-x-2", className)} {...props}>
      <Button
        variant="ghost"
        size={size}
        onClick={handleDecrease}
        disabled={disabled || isUpdating || value <= min}
        className={cn(
          buttonSizes[size],
          "p-0 glass-hover glow-blue",
          (disabled || value <= min) && "opacity-30"
        )}
      >
        <ApperIcon name="Minus" className="w-4 h-4" />
      </Button>
      
      <div className={cn(
        "text-center text-white font-medium",
        textSizes[size],
        isUpdating && "opacity-50"
      )}>
        {isUpdating ? "..." : value}
      </div>
      
      <Button
        variant="ghost"
        size={size}
        onClick={handleIncrease}
        disabled={disabled || isUpdating || value >= max}
        className={cn(
          buttonSizes[size],
          "p-0 glass-hover glow-blue",
          (disabled || value >= max) && "opacity-30"
        )}
      >
        <ApperIcon name="Plus" className="w-4 h-4" />
      </Button>
    </div>
  )
}

export default QuantityAdjuster