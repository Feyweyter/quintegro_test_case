import React from 'react'
import HeaderComponent from './HeaderComponent'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <HeaderComponent />
      <main className="flex-1 overflow-auto flex justify-center bg-gray-50">
        <div className="max-w-7xl w-full py-8 px-6">
          {children}
        </div>
      </main>
    </div>
  )
}

export default MainLayout
