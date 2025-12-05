import { motion } from "framer-motion"
import { cn } from "@/utils/cn"
import StatCard from "@/components/molecules/StatCard"

const StatsGrid = ({ 
  className,
  stats = {},
  ...props 
}) => {
  const statsConfig = [
    {
      title: "Total Products",
      value: stats.totalProducts || 0,
      icon: "Package",
      delay: 0
    },
    {
      title: "Total Value",
      value: stats.totalValue || 0,
      icon: "DollarSign",
      delay: 0.1
    },
    {
      title: "Low Stock Items",
      value: stats.lowStockCount || 0,
      icon: "AlertTriangle",
      delay: 0.2
    },
    {
      title: "Categories",
      value: stats.categoryCount || 0,
      icon: "Grid3X3",
      delay: 0.3
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn("grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6", className)}
      {...props}
    >
      {statsConfig.map((stat, index) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          delay={stat.delay}
        />
      ))}
    </motion.div>
  )
}

export default StatsGrid