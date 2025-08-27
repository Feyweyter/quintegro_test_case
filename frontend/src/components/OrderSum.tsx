import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_ORDER_SUM } from '../graphql/queries'
import { Loader2 } from 'lucide-react'

interface Product {
  id: string
  title: string
  description: string
  image: string
}

interface OrderItem {
  product: Product
  amount: number
  price: number
}

interface OrderSumProps {
  orderId: string
  products: OrderItem[]
}

const OrderSum: React.FC<OrderSumProps> = ({ orderId, products }) => {
  // Prepare products data for the GraphQL query
  const productsData = products.map(item => ({
    id: item.product.id,
    amount: item.amount,
    price: item.price
  }))

  const { loading, error, data } = useQuery(GET_ORDER_SUM, {
    variables: {
      orderId,
      products: productsData
    },
    skip: products.length === 0,
    onError: (error) => {
      console.error('Failed to calculate order sum:', error)
    }
  })

  if (loading) {
    return (
      <div className="flex items-center gap-2 mt-6">
        <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
        <span className="text-sm text-gray-600">
          Calculating...
        </span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md mt-6">
        <p className="text-sm">
          {error.message || 'Error calculating sum'}
        </p>
      </div>
    )
  }

  return (
    <div className="bg-blue-600 text-white p-6 mt-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold">
        Order Total: ${data?.orderSum?.toFixed(2) || '0.00'}
      </h3>
    </div>
  )
}

export default OrderSum
