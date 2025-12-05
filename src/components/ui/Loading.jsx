import { cn } from "@/utils/cn"

const Loading = ({ className, type = "dashboard", ...props }) => {
  if (type === "dashboard") {
    return (
      <div className={cn("p-6 space-y-8", className)} {...props}>
        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="glass rounded-xl p-6 animate-pulse"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg"></div>
                <div className="w-4 h-4 bg-white/20 rounded"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-white/20 rounded w-3/4"></div>
                <div className="h-8 bg-white/30 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filter Skeleton */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="h-12 bg-white/10 rounded-lg animate-pulse"></div>
          </div>
          <div className="w-48">
            <div className="h-12 bg-white/10 rounded-lg animate-pulse"></div>
          </div>
        </div>

        {/* Table Skeleton */}
        <div className="glass rounded-xl overflow-hidden">
          <div className="p-4 border-b border-white/10">
            <div className="h-6 bg-white/20 rounded w-32 animate-pulse"></div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  {["Product", "SKU", "Category", "Quantity", "Price", "Status", "Actions"].map((header, i) => (
                    <th key={header} className="px-6 py-4 text-left">
                      <div 
                        className="h-4 bg-white/20 rounded animate-pulse"
                        style={{ animationDelay: `${i * 50}ms` }}
                      ></div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...Array(6)].map((_, rowIndex) => (
                  <tr key={rowIndex} className="border-b border-white/5">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-white/20 rounded-lg animate-pulse"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-white/20 rounded w-24 animate-pulse"></div>
                          <div className="h-3 bg-white/10 rounded w-16 animate-pulse"></div>
                        </div>
                      </div>
                    </td>
                    {[...Array(6)].map((_, colIndex) => (
                      <td key={colIndex} className="px-6 py-4">
                        <div 
                          className="h-4 bg-white/20 rounded animate-pulse"
                          style={{ animationDelay: `${(rowIndex * 7 + colIndex) * 25}ms` }}
                        ></div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("flex items-center justify-center p-8", className)} {...props}>
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-white/80 text-sm">Loading...</p>
      </div>
    </div>
  )
}

export default Loading