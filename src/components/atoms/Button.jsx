import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Button = forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  children, 
  disabled,
  loading,
  ...props 
}, ref) => {
  const variants = {
    primary: "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:shadow-xl",
    secondary: "glass text-white border border-white/20 shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:shadow-xl hover:border-accent/50",
    success: "bg-gradient-to-r from-success to-accent text-white shadow-lg shadow-success/25 hover:shadow-success/40 hover:shadow-xl",
    warning: "bg-gradient-to-r from-warning to-yellow-600 text-white shadow-lg shadow-warning/25 hover:shadow-warning/40 hover:shadow-xl",
    error: "bg-gradient-to-r from-error to-red-600 text-white shadow-lg shadow-error/25 hover:shadow-error/40 hover:shadow-xl",
    ghost: "text-white/80 hover:text-white hover:bg-white/10"
  }

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
    xl: "px-8 py-4 text-lg"
  }

  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50 disabled:opacity-50 disabled:cursor-not-allowed ripple",
        "hover:scale-105 active:scale-95 relative overflow-hidden",
        variants[variant],
        sizes[size],
        (disabled || loading) && "opacity-50 cursor-not-allowed hover:scale-100",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center space-x-2">
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>{children}</span>
        </div>
      ) : (
        children
      )}
    </button>
  )
})

Button.displayName = "Button"

export default Button