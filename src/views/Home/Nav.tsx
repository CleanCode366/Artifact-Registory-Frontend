import type React from "react";

const Nav: React.FC = () => {
  return (
    <nav className="backdrop-blur-md bg-slate-900/80 border-b border-slate-700/50 top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-lg">
              C
            </div>
            <div>
              <h1 className="text-xl font-bold">Archaeological Inscriptions</h1>
              <p className="text-sm text-slate-400">C-DAC Bangalore</p>
            </div>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-blue-400 transition-colors">Explore</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Contribute</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Research</a>
            <a href="#" className="hover:text-blue-400 transition-colors">About</a>
          </div>
          <div className="flex space-x-3">
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition-colors">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav;