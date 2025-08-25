import React from 'react'
import {
  Box,
  Typography,
  CircularProgress,
  Paper
} from '@mui/material'
import { useQuery } from '@apollo/client'
import { GET_ORDER_SUM } from '../graphql/queries'

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
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
        <CircularProgress size={20} />
        <Typography variant="body2" color="text.secondary">
          Calculating...
        </Typography>
      </Box>
    )
  }

  if (error) {
    return (
      <Typography variant="body2" color="error" sx={{ mt: 2 }}>
        {error.message || 'Error calculating sum'}
      </Typography>
    )
  }

  return (
    <Paper sx={{ p: 2, mt: 2, backgroundColor: 'primary.light', color: 'primary.contrastText' }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        Order Total: ${data?.orderSum?.toFixed(2) || '0.00'}
      </Typography>
    </Paper>
  )
}

export default OrderSum
