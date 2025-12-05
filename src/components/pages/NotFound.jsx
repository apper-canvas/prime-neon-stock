import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const NotFound = () => {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-8 max-w-md mx-auto"
      >
        {/* 404 Animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="text-8xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            404
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 mx-auto glass rounded-full flex items-center justify-center glow-purple"
          >
            <ApperIcon name="Search" className="w-12 h-12 text-primary" />
          </motion.div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <h1 className="text-3xl font-bold text-white">
            Page Not Found
          </h1>
          <p className="text-white/70 text-lg">
            The page you're looking for doesn't exist or has been moved to a different location.
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <Button
            onClick={handleGoHome}
            variant="primary"
            size="lg"
            className="w-full"
          >
            <ApperIcon name="Home" className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Button>

          <div className="flex items-center space-x-4 text-sm">
            <button
              onClick={() => window.history.back()}
              className="text-accent hover:text-accent/80 transition-colors"
            >
              Go back
            </button>
            <span className="text-white/30">•</span>
            <button
              onClick={() => window.location.reload()}
              className="text-accent hover:text-accent/80 transition-colors"
            >
              Refresh page
            </button>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut"
          }}
          className="flex justify-center space-x-2"
        >
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default NotFound