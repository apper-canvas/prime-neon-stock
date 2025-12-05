import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/utils/cn"
import Modal from "@/components/atoms/Modal"
import Input from "@/components/atoms/Input"
import Select from "@/components/atoms/Select"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const ProductModal = ({
  className,
  isOpen,
  onClose,
  onSubmit,
  product = null,
  categories = [],
  isLoading = false,
  ...props 
}) => {
const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "",
    quantity: 0,
    price: 0,
    location: "",
    imageUrl: "",
    lowStockThreshold: 10
  })
  const [errors, setErrors] = useState({})

  const isEditing = !!product

  useEffect(() => {
if (product) {
      setFormData({
        name: product.name || "",
        sku: product.sku || "",
        category: product.category || "",
        quantity: product.quantity || 0,
        price: product.price || 0,
        location: product.location || "",
        imageUrl: product.imageUrl || "",
        lowStockThreshold: product.lowStockThreshold || 10
      })
    } else {
      setFormData({
        name: "",
        sku: "",
        category: "",
        quantity: 0,
        price: 0,
        location: "",
        imageUrl: "",
        lowStockThreshold: 10
      })
    }
    setErrors({})
  }, [product, isOpen])

  const generateSKU = () => {
    const prefix = formData.name.substring(0, 3).toUpperCase() || "PRD"
    const timestamp = Date.now().toString().slice(-6)
    const randomNum = Math.floor(Math.random() * 100).toString().padStart(2, '0')
    const generatedSKU = `${prefix}${timestamp}${randomNum}`
    
    setFormData(prev => ({
      ...prev,
      sku: generatedSKU
    }))
  }

const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === "quantity" || name === "price" || name === "lowStockThreshold" 
        ? parseFloat(value) || 0 
        : value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }))
    }
  }

  const validateForm = () => {
const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required"
    }

    if (!formData.sku.trim()) {
      newErrors.sku = "SKU is required"
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required"
    }

    if (formData.quantity < 0) {
      newErrors.quantity = "Quantity must be 0 or greater"
    }

    if (formData.price <= 0) {
      newErrors.price = "Price must be greater than 0"
    }

    if (formData.lowStockThreshold < 0) {
      newErrors.lowStockThreshold = "Low stock threshold must be 0 or greater"
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    if (onSubmit) {
      await onSubmit(formData)
    }
  }

  const handleClose = () => {
setFormData({
      name: "",
      sku: "",
      category: "",
      quantity: 0,
      price: 0,
      location: "",
      imageUrl: "",
      lowStockThreshold: 10
    })
    setErrors({})
    if (onClose) {
      onClose()
    }
  }
return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditing ? "Edit Product" : "Add New Product"}
      size="lg"
      className="fixed bottom-0 left-0 right-0 mx-auto max-w-4xl"
      {...props}
    >
      <form onSubmit={handleSubmit} className="space-y-6 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
{/* Product Name */}
          <div className="space-y-2">
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              label="Product Name *"
              placeholder="Enter product name"
              error={errors.name}
              disabled={isLoading}
            />
            {errors.name && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-error text-sm flex items-center space-x-1"
              >
                <ApperIcon name="AlertCircle" className="w-4 h-4" />
                <span>{errors.name}</span>
              </motion.p>
            )}
          </div>

          {/* SKU */}
          <div className="space-y-2">
            <div className="flex space-x-2">
              <Input
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                label="SKU *"
                placeholder="Enter SKU"
                error={errors.sku}
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={generateSKU}
                disabled={isLoading || !formData.name}
                className="h-12 px-3"
              >
                <ApperIcon name="RefreshCw" className="w-4 h-4" />
              </Button>
            </div>
            {errors.sku && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-error text-sm flex items-center space-x-1"
              >
                <ApperIcon name="AlertCircle" className="w-4 h-4" />
                <span>{errors.sku}</span>
              </motion.p>
            )}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Select
              name="category"
              value={formData.category}
              onChange={handleChange}
              label="Category *"
              error={errors.category}
              disabled={isLoading}
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </Select>
            {errors.category && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-error text-sm flex items-center space-x-1"
              >
                <ApperIcon name="AlertCircle" className="w-4 h-4" />
                <span>{errors.category}</span>
              </motion.p>
            )}
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <Input
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              label="Quantity *"
              placeholder="Enter quantity"
              min="0"
              error={errors.quantity}
              disabled={isLoading}
            />
            {errors.quantity && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-error text-sm flex items-center space-x-1"
              >
                <ApperIcon name="AlertCircle" className="w-4 h-4" />
                <span>{errors.quantity}</span>
              </motion.p>
            )}
          </div>

          {/* Minimum Quantity */}
          <div className="space-y-2">
            <Input
              name="lowStockThreshold"
              type="number"
              value={formData.lowStockThreshold}
              onChange={handleChange}
              label="Minimum Quantity"
              placeholder="Enter minimum quantity"
              min="0"
              error={errors.lowStockThreshold}
              disabled={isLoading}
            />
            {errors.lowStockThreshold && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-error text-sm flex items-center space-x-1"
              >
                <ApperIcon name="AlertCircle" className="w-4 h-4" />
                <span>{errors.lowStockThreshold}</span>
              </motion.p>
            )}
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="relative">
              <Input
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                label="Price *"
                placeholder="0.00"
                min="0.01"
                error={errors.price}
                disabled={isLoading}
                className="pl-8"
              />
              <span className="absolute left-3 top-3 text-white/50 text-sm">$</span>
            </div>
            {errors.price && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-error text-sm flex items-center space-x-1"
              >
                <ApperIcon name="AlertCircle" className="w-4 h-4" />
                <span>{errors.price}</span>
              </motion.p>
            )}
          </div>
        </div>

        {/* Location - Full Width */}
        <div className="space-y-2">
          <Input
            name="location"
            value={formData.location}
            onChange={handleChange}
            label="Location *"
            placeholder="e.g., Warehouse A, Shelf B3"
            error={errors.location}
            disabled={isLoading}
          />
          {errors.location && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-error text-sm flex items-center space-x-1"
            >
              <ApperIcon name="AlertCircle" className="w-4 h-4" />
              <span>{errors.location}</span>
            </motion.p>
          )}
        </div>

        {/* Image URL */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white">
            Image URL
          </label>
          <Input
            name="imageUrl"
            type="url"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Enter image URL"
            disabled={isLoading}
          />
        </div>

        {/* Image Preview */}
        {formData.imageUrl && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white">Preview</label>
            <div className="w-24 h-24 rounded-lg overflow-hidden bg-white/10">
              <img
                src={formData.imageUrl}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none"
                  e.target.nextSibling.style.display = "flex"
                }}
              />
              <div className="w-full h-full bg-gradient-to-br from-error/20 to-error/40 flex items-center justify-center">
                <ApperIcon name="ImageOff" className="w-8 h-8 text-error" />
              </div>
            </div>
          </div>
        )}

{/* Actions */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-white/10">
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            disabled={isLoading}
            className="min-w-[100px]"
          >
            <div className="flex items-center space-x-2">
              <ApperIcon name="X" className="w-4 h-4" />
              <span>Cancel</span>
            </div>
          </Button>
          
          <Button
            type="submit"
            variant="primary"
            loading={isLoading}
            className="min-w-[140px]"
          >
            <div className="flex items-center space-x-2">
              <ApperIcon name={isEditing ? "Save" : "Plus"} className="w-4 h-4" />
              <span>Save Product</span>
            </div>
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default ProductModal