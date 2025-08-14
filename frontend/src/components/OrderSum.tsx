import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  CircularProgress,
  Paper
} from '@mui/material'

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
  const [sum, setSum] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const calculateSum = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const token = localStorage.getItem('auth_token')
      if (!token) {
        setError('Authentication required')
        return
      }

      // Prepare products data for the API request
      const productsData = products.map(item => ({
        id: item.product.id,
        amount: item.amount,
        price: item.price
      }))

      const response = await fetch(`/api/order/${orderId}/sum`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ products: productsData })
      })

      if (response.ok) {
        const result = await response.json()
        setSum(result)
      } else {
        setError('Failed to calculate sum')
      }
    } catch (err) {
      setError('Error calculating sum')
    } finally {
      setLoading(false)
    }
  }

  // Calculate sum whenever products change
  useEffect(() => {
    calculateSum()
  }, [products])

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
        {error}
      </Typography>
    )
  }

  return (
    <Paper sx={{ p: 2, mt: 2, backgroundColor: 'primary.light', color: 'primary.contrastText' }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        Order Total: ${sum?.toFixed(2) || '0.00'}
      </Typography>
    </Paper>
  )
}

export default OrderSum
