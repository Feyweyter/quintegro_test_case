import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material'
import OrderListItem from './OrderListItem'
import OrderSum from './OrderSum'

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

interface Order {
  orderId: string
  status: 'created' | 'submited' | 'finished'
  products: OrderItem[]
}

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const token = localStorage.getItem('auth_token')
      if (!token) {
        setError('Authentication required')
        setLoading(false)
        return
      }

      const response = await fetch('/api/order', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        if (response.status === 403) {
          setError('Access denied. Please login again.')
        } else {
          setError('Failed to fetch orders')
        }
        return
      }

      const data = await response.json()
      setOrders(data)
    } catch (err) {
      setError('An error occurred while fetching orders')
    } finally {
      setLoading(false)
    }
  }

  const handleAmountChange = (productId: string, newAmount: number) => {
    setOrders(prevOrders => 
      prevOrders.map(order => ({
        ...order,
        products: order.products.map(item => 
          item.product.id === productId 
            ? { ...item, amount: newAmount }
            : item
        )
      }))
    )
  }

  const handleDelete = (productId: string) => {
    setOrders(prevOrders => 
      prevOrders.map(order => ({
        ...order,
        products: order.products.filter(item => item.product.id !== productId)
      })).filter(order => order.products.length > 0)
    )
  }

  // @ts-ignore
  const handleSubmitOrder = async (orderId: string) => {
    try {
      const token = localStorage.getItem('auth_token')
      if (!token) {
        console.error('No authentication token found')
        return
      }

      const response = await fetch(`/api/order/${orderId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.status === 200) {
        // Reload the order list
        fetchOrders()
      } else {
        console.error('Failed to submit order:', response.statusText)
      }
    } catch (error) {
      console.error('Error submitting order:', error)
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    )
  }

  if (orders.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          No orders found
        </Typography>
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Your Orders
      </Typography>
      
      {orders.map((order) => (
        <Box key={order.orderId} sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Order #{order.orderId} - {order.status}
          </Typography>
          
          {order.products.map((item, index) => (
            <OrderListItem
              key={item.product.id}
              product={item.product}
              amount={item.amount}
              price={item.price}
              orderId={order.orderId}
              onAmountChange={handleAmountChange}
              onDelete={handleDelete}
              status={order.status}
              isLast={index === order.products.length -1}
            />
          ))}
          <OrderSum orderId={order.orderId} products={order.products} />
        </Box>
      ))}
    </Box>
  )
}

export default OrderList
