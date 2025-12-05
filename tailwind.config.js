/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#8B5CF6",
        secondary: "#3B82F6", 
        accent: "#06B6D4",
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#3B82F6",
        glass: "rgba(255, 255, 255, 0.1)",
        'glass-border': "rgba(255, 255, 255, 0.18)"
      },
      backgroundImage: {
        'gradient-main': 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 100%)',
        'gradient-purple': 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
        'gradient-neon': 'linear-gradient(135deg, #06B6D4 0%, #10B981 100%)'
      },
      backdropBlur: {
        'glass': '16px'
      },
      animation: {
        'pulse-glow': 'pulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)' },
          '100%': { boxShadow: '0 0 30px rgba(139, 92, 246, 0.8), 0 0 40px rgba(139, 92, 246, 0.6)' }
        }
      }
    },
  },
  plugins: [],
}