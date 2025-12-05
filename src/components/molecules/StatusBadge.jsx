import { cn } from "@/utils/cn"
import Badge from "@/components/atoms/Badge"

const StatusBadge = ({ 
  className,
  status,
  quantity = 0,
  showQuantity = false,
  ...props 
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case "in-stock":
        return {
          variant: "success",
          label: showQuantity ? `In Stock (${quantity})` : "In Stock",
          pulse: false
        }
      case "low-stock":
        return {
          variant: "warning",
          label: showQuantity ? `Low Stock (${quantity})` : "Low Stock",
          pulse: true
        }
      case "out-of-stock":
        return {
          variant: "error",
          label: "Out of Stock",
          pulse: false
        }
      default:
        return {
          variant: "default",
          label: "Unknown",
          pulse: false
        }
    }
  }

  const config = getStatusConfig()

  return (
    <Badge
      className={className}
      variant={config.variant}
      pulse={config.pulse}
      {...props}
    >
      {config.label}
    </Badge>
  )
}

export default StatusBadge