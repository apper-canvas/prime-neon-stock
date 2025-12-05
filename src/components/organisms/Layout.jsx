import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <div className="min-h-screen animated-background">
      <div className="min-h-screen backdrop-blur-sm bg-black/20">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout