import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Input = forwardRef(({ 
  className, 
  type = "text",
  error,
  ...props 
}, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-12 w-full rounded-lg glass px-4 py-3 text-white placeholder:text-white/50 transition-all duration-200",
        "border border-white/20 focus:border-accent/50 focus:ring-2 focus:ring-accent/20",
        "disabled:cursor-not-allowed disabled:opacity-50",
        error && "border-error/50 focus:border-error focus:ring-error/20",
        className
      )}
      {...props}
    />
  )
})

Input.displayName = "Input"

export default Input