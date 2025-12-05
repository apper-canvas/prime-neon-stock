import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Badge = forwardRef(({ 
  className, 
  variant = "default", 
  children,
  pulse = false,
  ...props 
}, ref) => {
  const variants = {
    default: "bg-white/20 text-white",
    success: "bg-success/20 text-success border border-success/30 glow-green",
    warning: "bg-warning/20 text-warning border border-warning/30 glow-yellow",
    error: "bg-error/20 text-error border border-error/30 glow-red",
    info: "bg-info/20 text-info border border-info/30 glow-blue"
  }

  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200",
        variants[variant],
        pulse && "pulse-neon",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})

Badge.displayName = "Badge"

export default Badge