import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const ErrorView = ({ 
  className,
  error = "An error occurred",
  onRetry,
  title = "Something went wrong",
  ...props 
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center space-y-6", className)} {...props}>
      <div className="w-24 h-24 glass rounded-full flex items-center justify-center glow-red">
        <ApperIcon name="AlertTriangle" className="w-12 h-12 text-error" />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-white">{title}</h3>
        <p className="text-white/70 max-w-md">
          {error}
        </p>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg glass-hover glow-purple transition-all duration-200 hover:scale-105"
        >
          <ApperIcon name="RotateCcw" className="w-4 h-4" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  )
}

export default ErrorView