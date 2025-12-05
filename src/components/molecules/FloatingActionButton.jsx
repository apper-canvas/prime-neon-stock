import { motion } from "framer-motion"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const FloatingActionButton = ({ 
  className,
  onClick,
  icon = "Plus",
  size = "lg",
  ...props 
}) => {
  const sizes = {
    md: "w-12 h-12",
    lg: "w-14 h-14",
    xl: "w-16 h-16"
  }

  const iconSizes = {
    md: "w-5 h-5",
    lg: "w-6 h-6", 
    xl: "w-7 h-7"
  }

  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "fixed bottom-6 right-6 rounded-full bg-gradient-to-r from-accent to-success text-white shadow-2xl flex items-center justify-center transition-all duration-300 ripple z-50",
        "hover:scale-110 active:scale-95 glow-blue animate-float",
        sizes[size],
        className
      )}
      whileHover={{ 
        scale: 1.1,
        boxShadow: "0 0 30px rgba(6, 182, 212, 0.6), 0 0 40px rgba(6, 182, 212, 0.4)"
      }}
      whileTap={{ 
        scale: 0.95,
        rotate: 90
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: 0.5
      }}
      {...props}
    >
      <ApperIcon name={icon} className={iconSizes[size]} />
    </motion.button>
  )
}

export default FloatingActionButton