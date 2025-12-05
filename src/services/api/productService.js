import mockProducts from "@/services/mockData/products.json";

const STORAGE_KEY = "neonstock-products";

class ProductService {
  constructor() {
    this.initializeData();
  }
  initializeData() {
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (!savedData) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockProducts))
    }
  }

  getProducts() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
        resolve([...data])
      }, 250)
    })
  }

  getProductById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
        const product = data.find(p => p.Id === parseInt(id))
        if (product) {
          resolve({ ...product })
        } else {
          reject(new Error("Product not found"))
        }
      }, 200)
    })
  }

  createProduct(productData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
          const maxId = Math.max(...data.map(p => p.Id), 0)
          const newProduct = {
            ...productData,
            Id: maxId + 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
          data.push(newProduct)
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
          resolve({ ...newProduct })
        } catch (error) {
          reject(new Error("Failed to create product"))
        }
      }, 300)
    })
  }

  updateProduct(id, updates) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
          const index = data.findIndex(p => p.Id === parseInt(id))
          if (index !== -1) {
            data[index] = {
              ...data[index],
              ...updates,
              Id: parseInt(id),
              updatedAt: new Date().toISOString()
            }
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
            resolve({ ...data[index] })
          } else {
            reject(new Error("Product not found"))
          }
        } catch (error) {
          reject(new Error("Failed to update product"))
        }
      }, 250)
    })
  }

  deleteProduct(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
          const filteredData = data.filter(p => p.Id !== parseInt(id))
          if (filteredData.length !== data.length) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredData))
            resolve(true)
          } else {
            reject(new Error("Product not found"))
          }
        } catch (error) {
          reject(new Error("Failed to delete product"))
        }
      }, 200)
    })
  }

  updateQuantity(id, newQuantity) {
    return this.updateProduct(id, { quantity: parseInt(newQuantity) })
  }

  getCategories() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
        const categories = [...new Set(data.map(p => p.category))]
        resolve(categories.sort())
      }, 150)
    })
  }

  getStats() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
        const totalProducts = data.length
        const totalValue = data.reduce((sum, product) => sum + (product.quantity * product.price), 0)
        const lowStockCount = data.filter(product => product.quantity <= product.lowStockThreshold && product.quantity > 0).length
        const categoryCount = new Set(data.map(p => p.category)).size
        
        resolve({
          totalProducts,
          totalValue,
          lowStockCount,
          categoryCount
        })
      }, 200)
    })
}

  getProductStatus(product) {
    if (product.quantity === 0) return "out-of-stock";
    if (product.quantity <= product.lowStockThreshold) return "low-stock";
    return "in-stock";
  }

  // Get all unique categories from products
  getAllCategories() {
    const products = this.getAll();
    return [...new Set(products.map(product => product.category))].sort();
  }
// Get products filtered by stock status
  getProductsByStatus(status) {
    const products = this.getAll();
    if (!status || status === 'all') return products;
    
    return products.filter(product => {
      const productStatus = this.getProductStatus(product);
      return productStatus === status;
    });
  }
}

export const productService = new ProductService()