import React, { useState } from 'react'
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material'
import { useQuery, useMutation } from '@apollo/client'
import { GET_ORDERS } from '../graphql/queries'
import { SUBMIT_ORDER, DELETE_PRODUCT_FROM_ORDER } from '../graphql/mutations'
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

  const { loading, error, data, refetch } = useQuery(GET_ORDERS, {
    onCompleted: (data) => {
      setOrders(data.orders || [])
    },
    onError: (error) => {
      console.error('GraphQL error:', error)
    }
  })

  const [submitOrder] = useMutation(SUBMIT_ORDER, {
    onCompleted: () => {
      refetch()
    },
    onError: (error) => {
      console.error('Failed to submit order:', error)
    }
  })

  const [deleteProduct] = useMutation(DELETE_PRODUCT_FROM_ORDER, {
    onCompleted: (data) => {
      // Update local state with the returned order
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.orderId === data.deleteProductFromOrder.orderId 
            ? data.deleteProductFromOrder 
            : order
        )
      )
    },
    onError: (error) => {
      console.error('Failed to delete product:', error)
    }
  })

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

  const handleSubmitOrder = async (orderId: string) => {
    try {
      await submitOrder({
        variables: { orderId }
      })
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
        {error.message}
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
              onSubmitOrder={handleSubmitOrder}
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
