import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Input = forwardRef(({ 
  className, 
  type = "text",
  error,
  label,
  ...props 
}, ref) => {
  return (
    <div className="relative">
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-12 w-full rounded-lg glass px-4 py-3 text-white placeholder:text-white/50 transition-all duration-300",
          "border border-white/20 focus:border-accent/70 focus:ring-2 focus:ring-accent/30 focus:shadow-lg focus:shadow-accent/20",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "peer",
          error && "border-error/50 focus:border-error focus:ring-error/20 focus:shadow-error/20",
          className
        )}
        placeholder=" "
        {...props}
      />
      {label && (
        <label className={cn(
          "absolute left-4 top-3 text-white/50 transition-all duration-300 pointer-events-none",
          "peer-placeholder-shown:top-3 peer-placeholder-shown:text-base",
          "peer-focus:top-1 peer-focus:text-xs peer-focus:text-accent",
          "peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-white/70"
        )}>
          {label}
        </label>
      )}
    </div>
  )
})

Input.displayName = "Input"

export default Input