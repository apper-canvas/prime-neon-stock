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
        imageUrl: "",
        lowStockThreshold: 10
      })
    }
    setErrors({})
  }, [product, isOpen])

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
      className={className}
      {...props}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white">
              Product Name *
            </label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              error={errors.name}
              disabled={isLoading}
            />
            {errors.name && (
              <p className="text-error text-sm flex items-center space-x-1">
                <ApperIcon name="AlertCircle" className="w-4 h-4" />
                <span>{errors.name}</span>
              </p>
            )}
          </div>

          {/* SKU */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white">
              SKU *
            </label>
            <Input
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              placeholder="Enter SKU"
              error={errors.sku}
              disabled={isLoading}
            />
            {errors.sku && (
              <p className="text-error text-sm flex items-center space-x-1">
                <ApperIcon name="AlertCircle" className="w-4 h-4" />
                <span>{errors.sku}</span>
              </p>
            )}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white">
              Category *
            </label>
            <Select
              name="category"
              value={formData.category}
              onChange={handleChange}
              error={errors.category}
              disabled={isLoading}
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </Select>
            {errors.category && (
              <p className="text-error text-sm flex items-center space-x-1">
                <ApperIcon name="AlertCircle" className="w-4 h-4" />
                <span>{errors.category}</span>
              </p>
            )}
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white">
              Quantity *
            </label>
            <Input
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Enter quantity"
              min="0"
              error={errors.quantity}
              disabled={isLoading}
            />
            {errors.quantity && (
              <p className="text-error text-sm flex items-center space-x-1">
                <ApperIcon name="AlertCircle" className="w-4 h-4" />
                <span>{errors.quantity}</span>
              </p>
            )}
          </div>

          {/* Price */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white">
              Price *
            </label>
            <Input
              name="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              min="0.01"
              error={errors.price}
              disabled={isLoading}
            />
            {errors.price && (
              <p className="text-error text-sm flex items-center space-x-1">
                <ApperIcon name="AlertCircle" className="w-4 h-4" />
                <span>{errors.price}</span>
              </p>
            )}
          </div>

          {/* Low Stock Threshold */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white">
              Low Stock Threshold
            </label>
            <Input
              name="lowStockThreshold"
              type="number"
              value={formData.lowStockThreshold}
              onChange={handleChange}
              placeholder="Enter threshold"
              min="0"
              error={errors.lowStockThreshold}
              disabled={isLoading}
            />
            {errors.lowStockThreshold && (
              <p className="text-error text-sm flex items-center space-x-1">
                <ApperIcon name="AlertCircle" className="w-4 h-4" />
                <span>{errors.lowStockThreshold}</span>
              </p>
            )}
          </div>
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
        <div className="flex justify-end space-x-4 pt-6">
          <Button
            type="button"
            variant="ghost"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
            className="min-w-[120px]"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <ApperIcon name="Loader2" className="w-4 h-4 animate-spin" />
                <span>{isEditing ? "Updating..." : "Creating..."}</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <ApperIcon name={isEditing ? "Save" : "Plus"} className="w-4 h-4" />
                <span>{isEditing ? "Update" : "Create"}</span>
              </div>
            )}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default ProductModal