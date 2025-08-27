import React from 'react'

const HomePage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-900">
        Welcome to Quintegro
      </h1>
      <div className="p-8 mt-6 bg-white rounded-lg border border-gray-200 shadow-sm">
        <p className="text-lg mb-4 text-gray-700">
          This is the home page of the Quintegro application.
        </p>
        <p className="text-sm text-gray-600">
          Built with React 18, TypeScript 5, shadcn/ui, and Vite.
        </p>
      </div>
    </div>
  )
}

export default HomePage
