import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import QuantityAdjuster from "@/components/molecules/QuantityAdjuster";
import StatusBadge from "@/components/molecules/StatusBadge";
import { productService } from "@/services/api/productService";
import React from "react";

const ProductTable = ({ 
  className,
  products = [],
  onEdit,
  onDelete,
  onQuantityChange,
  ...props 
}) => {
  const handleQuantityUpdate = async (productId, newQuantity) => {
    if (onQuantityChange) {
      await onQuantityChange(productId, newQuantity)
    }
  }

  const getStatus = (product) => {
    return productService.getProductStatus(product)
  }

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`
  }

  if (products.length === 0) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn("glass rounded-xl overflow-hidden", className)}
      {...props}
    >
      <div className="p-6 border-b border-white/10">
        <h2 className="text-xl font-semibold text-white">Products</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="px-6 py-4 text-left text-sm font-medium text-white/80">Product</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-white/80">SKU</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-white/80">Category</th>
              <th className="px-6 py-4 text-center text-sm font-medium text-white/80">Quantity</th>
              <th className="px-6 py-4 text-right text-sm font-medium text-white/80">Price</th>
              <th className="px-6 py-4 text-center text-sm font-medium text-white/80">Status</th>
              <th className="px-6 py-4 text-center text-sm font-medium text-white/80">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              const status = getStatus(product)
              
              return (
                <motion.tr
                  key={product.Id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border-b border-white/5 table-row-hover"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/10 flex-shrink-0">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = "none"
                              e.target.nextSibling.style.display = "flex"
                            }}
                          />
                        ) : null}
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                          <ApperIcon name="Package" className="w-6 h-6 text-white/50" />
                        </div>
                      </div>
                      <div>
                        <p className="text-white font-medium">{product.name}</p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <span className="text-white/80 text-sm font-mono">{product.sku}</span>
                  </td>
                  
                  <td className="px-6 py-4">
                    <span className="text-white/80">{product.category}</span>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <QuantityAdjuster
                        value={product.quantity}
                        onChange={(newQuantity) => handleQuantityUpdate(product.Id, newQuantity)}
                      />
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 text-right">
                    <span className="text-white font-medium">{formatPrice(product.price)}</span>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <StatusBadge status={status} />
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex justify-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit && onEdit(product)}
                        className="w-8 h-8 p-0 glow-blue"
                      >
                        <ApperIcon name="Edit2" className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete && onDelete(product)}
                        className="w-8 h-8 p-0 glow-red hover:text-error"
                      >
                        <ApperIcon name="Trash2" className="w-4 h-4" />
                      </Button>
</div>
                  </td>
                </motion.tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

export default ProductTable