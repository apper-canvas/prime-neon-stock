import { useState, useEffect, useMemo } from "react"
import { toast } from "react-toastify"
import { motion } from "framer-motion"
import { productService } from "@/services/api/productService"
import Loading from "@/components/ui/Loading"
import ErrorView from "@/components/ui/ErrorView"
import Empty from "@/components/ui/Empty"
import StatsGrid from "@/components/organisms/StatsGrid"
import ProductTable from "@/components/organisms/ProductTable"
import ProductModal from "@/components/organisms/ProductModal"
import DeleteConfirmationModal from "@/components/organisms/DeleteConfirmationModal"
import SearchBar from "@/components/molecules/SearchBar"
import FloatingActionButton from "@/components/molecules/FloatingActionButton"
import Select from "@/components/atoms/Select"

const Dashboard = () => {
  const [products, setProducts] = useState([])
  const [stats, setStats] = useState({})
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  
  // Modal states
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [deletingProduct, setDeletingProduct] = useState(null)
  const [modalLoading, setModalLoading] = useState(false)

  // Load initial data
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      setError("")
      
      const [productsData, statsData, categoriesData] = await Promise.all([
        productService.getProducts(),
        productService.getStats(),
        productService.getCategories()
      ])
      
      setProducts(productsData)
      setStats(statsData)
      setCategories(categoriesData)
    } catch (err) {
      setError(err.message || "Failed to load data")
    } finally {
      setLoading(false)
    }
  }

  // Filter and search products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = !searchTerm || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = !selectedCategory || product.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })
  }, [products, searchTerm, selectedCategory])

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  // Handle category filter
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
  }

  // Handle quantity change
  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      await productService.updateQuantity(productId, newQuantity)
      
      // Update local state
      setProducts(prev => prev.map(p => 
        p.Id === productId 
          ? { ...p, quantity: newQuantity, updatedAt: new Date().toISOString() }
          : p
      ))
      
      // Refresh stats
      const newStats = await productService.getStats()
      setStats(newStats)
      
      toast.success("Quantity updated successfully", {
        position: "top-right",
        autoClose: 2000
      })
    } catch (err) {
      toast.error(err.message || "Failed to update quantity", {
        position: "top-right"
      })
    }
  }

  // Handle add product
  const handleAddProduct = () => {
    setEditingProduct(null)
    setIsProductModalOpen(true)
  }

  // Handle edit product
  const handleEditProduct = (product) => {
    setEditingProduct(product)
    setIsProductModalOpen(true)
  }

  // Handle delete product
  const handleDeleteProduct = (product) => {
    setDeletingProduct(product)
    setIsDeleteModalOpen(true)
  }

  // Handle product submit (create/update)
  const handleProductSubmit = async (formData) => {
    try {
      setModalLoading(true)
      
      let updatedProduct
      if (editingProduct) {
        // Update existing product
        updatedProduct = await productService.updateProduct(editingProduct.Id, formData)
        setProducts(prev => prev.map(p => 
          p.Id === editingProduct.Id ? updatedProduct : p
        ))
        toast.success("Product updated successfully")
      } else {
        // Create new product
        updatedProduct = await productService.createProduct(formData)
        setProducts(prev => [...prev, updatedProduct])
        toast.success("Product created successfully")
      }
      
      // Refresh stats and categories
      const [newStats, newCategories] = await Promise.all([
        productService.getStats(),
        productService.getCategories()
      ])
      setStats(newStats)
      setCategories(newCategories)
      
      setIsProductModalOpen(false)
      setEditingProduct(null)
    } catch (err) {
      toast.error(err.message || "Failed to save product")
    } finally {
      setModalLoading(false)
    }
  }

  // Handle delete confirm
  const handleDeleteConfirm = async (productId) => {
    try {
      setModalLoading(true)
      
      await productService.deleteProduct(productId)
      
      setProducts(prev => prev.filter(p => p.Id !== productId))
      
      // Refresh stats and categories
      const [newStats, newCategories] = await Promise.all([
        productService.getStats(),
        productService.getCategories()
      ])
      setStats(newStats)
      setCategories(newCategories)
      
      setIsDeleteModalOpen(false)
      setDeletingProduct(null)
      
      toast.success("Product deleted successfully")
    } catch (err) {
      toast.error(err.message || "Failed to delete product")
    } finally {
      setModalLoading(false)
    }
  }

  // Loading state
  if (loading) {
    return <Loading type="dashboard" />
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <ErrorView
          error={error}
          onRetry={loadData}
          title="Failed to load dashboard"
        />
      </div>
    )
  }

  // Empty state
  if (products.length === 0 && !loading && !error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Empty
          title="No products in inventory"
          description="Start by adding your first product to manage your inventory effectively"
          actionLabel="Add First Product"
          onAction={handleAddProduct}
          icon="Package"
        />
        
        <FloatingActionButton onClick={handleAddProduct} />
        
        <ProductModal
          isOpen={isProductModalOpen}
          onClose={() => setIsProductModalOpen(false)}
          onSubmit={handleProductSubmit}
          product={editingProduct}
          categories={categories}
          isLoading={modalLoading}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold text-white">
            <span className="bg-gradient-to-r from-white via-accent to-primary bg-clip-text text-transparent">
              NeonStock
            </span>
          </h1>
          <p className="text-white/70 text-lg">
            Modern inventory management with futuristic flair
          </p>
        </motion.div>

        {/* Stats Grid */}
        <StatsGrid stats={stats} />

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <div className="flex-1">
            <SearchBar
              placeholder="Search products by name, SKU, or category..."
              onSearch={handleSearch}
              debounceMs={300}
            />
          </div>
          
          <div className="w-full sm:w-48">
            <Select
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
          </div>
        </motion.div>

        {/* Products Table */}
        {filteredProducts.length === 0 && (searchTerm || selectedCategory) ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="glass rounded-xl p-12 text-center"
          >
            <h3 className="text-xl font-semibold text-white mb-2">No products found</h3>
            <p className="text-white/70 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setSearchTerm("")}
                className="text-accent hover:text-accent/80 transition-colors"
              >
                Clear search
              </button>
              <span className="text-white/30">•</span>
              <button
                onClick={() => setSelectedCategory("")}
                className="text-accent hover:text-accent/80 transition-colors"
              >
                Clear filter
              </button>
            </div>
          </motion.div>
        ) : (
          <ProductTable
            products={filteredProducts}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            onQuantityChange={handleQuantityChange}
          />
        )}

        {/* Floating Action Button */}
        <FloatingActionButton onClick={handleAddProduct} />

        {/* Product Modal */}
        <ProductModal
          isOpen={isProductModalOpen}
          onClose={() => {
            setIsProductModalOpen(false)
            setEditingProduct(null)
          }}
          onSubmit={handleProductSubmit}
          product={editingProduct}
          categories={categories}
          isLoading={modalLoading}
        />

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false)
            setDeletingProduct(null)
          }}
          onConfirm={handleDeleteConfirm}
          product={deletingProduct}
          isLoading={modalLoading}
        />
      </div>
    </div>
  )
}

export default Dashboard