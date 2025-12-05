import { useState } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"
import Input from "@/components/atoms/Input"

const SearchBar = ({ 
  className,
  placeholder = "Search products...",
  onSearch,
  debounceMs = 300,
  ...props 
}) => {
  const [searchTerm, setSearchTerm] = useState("")

  const handleChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    
    if (onSearch) {
      const timeoutId = setTimeout(() => {
        onSearch(value)
      }, debounceMs)
      
      return () => clearTimeout(timeoutId)
    }
  }

  const handleClear = () => {
    setSearchTerm("")
    if (onSearch) {
      onSearch("")
    }
  }

  return (
    <div className={cn("relative", className)} {...props}>
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50">
        <ApperIcon name="Search" className="w-5 h-5" />
      </div>
      
      <Input
        value={searchTerm}
        onChange={handleChange}
        placeholder={placeholder}
        className="pl-12 pr-12"
      />
      
      {searchTerm && (
        <button
          onClick={handleClear}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors duration-200"
        >
          <ApperIcon name="X" className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

export default SearchBar