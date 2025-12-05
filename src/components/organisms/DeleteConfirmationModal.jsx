import { cn } from "@/utils/cn"
import Modal from "@/components/atoms/Modal"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const DeleteConfirmationModal = ({ 
  className,
  isOpen,
  onClose,
  onConfirm,
  product,
  isLoading = false,
  ...props 
}) => {
  const handleConfirm = async () => {
    if (onConfirm && product) {
      await onConfirm(product.Id)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Product"
      size="md"
      className={className}
      {...props}
    >
      <div className="space-y-6">
        {/* Warning Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-error/20 rounded-full flex items-center justify-center glow-red">
            <ApperIcon name="AlertTriangle" className="w-8 h-8 text-error" />
          </div>
        </div>

        {/* Message */}
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-white">
            Are you sure you want to delete this product?
          </h3>
          <p className="text-white/70">
            This action cannot be undone. The product "{product?.name}" will be permanently removed from your inventory.
          </p>
        </div>

        {/* Product Info */}
        {product && (
          <div className="glass rounded-lg p-4 space-y-2">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/10 flex-shrink-0">
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
                  <ApperIcon name="Package" className="w-5 h-5 text-white/50" />
                </div>
              </div>
              <div>
                <p className="text-white font-medium">{product.name}</p>
                <p className="text-white/60 text-sm">{product.sku}</p>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end space-x-4">
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          
          <Button
            variant="error"
            onClick={handleConfirm}
            disabled={isLoading}
            className="min-w-[100px]"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <ApperIcon name="Loader2" className="w-4 h-4 animate-spin" />
                <span>Deleting...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <ApperIcon name="Trash2" className="w-4 h-4" />
                <span>Delete</span>
              </div>
            )}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteConfirmationModal