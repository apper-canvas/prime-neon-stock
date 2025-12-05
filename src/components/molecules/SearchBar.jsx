import { useState, useEffect } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const SearchBar = ({ 
  className,
  placeholder = "Search products...",
  onSearch,
  debounceMs = 300,
  ...props 
}) => {
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    if (!onSearch) return

    const timeoutId = setTimeout(() => {
      onSearch(searchTerm)
    }, debounceMs)

    return () => clearTimeout(timeoutId)
  }, [searchTerm, onSearch, debounceMs])

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleClear = () => {
    setSearchTerm("")
  }

  return (
    <div className={cn("relative", className)} {...props}>
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 z-10">
        <ApperIcon name="Search" className="w-5 h-5" />
      </div>
      
      <input
        value={searchTerm}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full h-12 pl-12 pr-12 glass rounded-xl text-white placeholder-white/50 border-white/20 focus:border-accent focus:ring-0 focus:outline-none focus:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 backdrop-blur-glass"
      />
      
      {searchTerm && (
        <button
          onClick={handleClear}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors duration-200 z-10"
        >
          <ApperIcon name="X" className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

export default SearchBar