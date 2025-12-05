import { motion } from "framer-motion"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const StatCard = ({ 
  className,
  title,
  value,
  icon,
  trend,
  delay = 0,
  ...props 
}) => {
  const formatValue = (val) => {
    if (typeof val === "number") {
      if (title?.toLowerCase().includes("value")) {
        return `$${val.toLocaleString()}`
      }
      return val.toLocaleString()
    }
    return val
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className={cn("glass rounded-xl p-6 glass-hover", className)}
      {...props}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center glow-purple">
          <ApperIcon name={icon} className="w-6 h-6 text-primary" />
        </div>
        
        {trend && (
          <div className={cn(
            "flex items-center space-x-1 text-sm",
            trend > 0 ? "text-success" : "text-error"
          )}>
            <ApperIcon 
              name={trend > 0 ? "TrendingUp" : "TrendingDown"} 
              className="w-4 h-4" 
            />
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <h3 className="text-white/80 text-sm font-medium">{title}</h3>
        <p className="text-white text-2xl font-bold bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">
          {formatValue(value)}
        </p>
      </div>
    </motion.div>
  )
}

export default StatCard