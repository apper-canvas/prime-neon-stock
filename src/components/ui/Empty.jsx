import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Empty = ({ 
  className,
  title = "No data found",
  description = "Get started by adding your first item",
  actionLabel = "Add Item",
  onAction,
  icon = "Package",
  ...props 
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center p-12 text-center space-y-6", className)} {...props}>
      <div className="w-32 h-32 glass rounded-full flex items-center justify-center glow-blue">
        <ApperIcon name={icon} className="w-16 h-16 text-accent" />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-white">{title}</h3>
        <p className="text-white/70 max-w-md text-lg">
          {description}
        </p>
      </div>

      {onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-accent to-success text-white font-semibold rounded-xl glass-hover glow-blue transition-all duration-200 hover:scale-105 ripple"
        >
          <ApperIcon name="Plus" className="w-5 h-5" />
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  )
}

export default Empty