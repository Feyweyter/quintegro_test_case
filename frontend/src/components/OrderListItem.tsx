import React, { useState } from 'react'
import {
  Card,
  CardContent,
  Box,
  Typography,
  TextField,
  IconButton,
  Avatar, Button
} from '@mui/material'
import { Add, Remove, Delete } from '@mui/icons-material'

interface OrderListItemProps {
  product: {
    id: string
    title: string
    description: string
    image: string
  }
  amount: number
  price: number
  orderId: string
  onAmountChange: (productId: string, newAmount: number) => void
  onDelete: (productId: string) => void
  status: string;
  isLast: boolean;
}

const OrderListItem: React.FC<OrderListItemProps> = ({ product, amount, price, orderId, onAmountChange, onDelete, status, isLast }) => {
  const [currentAmount, setCurrentAmount] = useState(amount)

  const handleAmountChange = (newAmount: number) => {
    const clampedAmount = Math.max(1, Math.min(10, newAmount))
    setCurrentAmount(clampedAmount)
    onAmountChange(product.id, clampedAmount)
  }

  const handleIncrement = () => {
    handleAmountChange(currentAmount + 1)
  }

  const handleDecrement = () => {
    handleAmountChange(currentAmount - 1)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    handleAmountChange(value)
  }

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      if (!token) {
        console.error('No authentication token found')
        return
      }

      const response = await fetch(`/api/order/${orderId}/${product.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        onDelete(product.id)
      } else {
        console.error('Failed to delete product:', response.statusText)
      }
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  return (
      <Box>
    <Card 
      sx={{ 
        mb: 2,
        transition: 'all 0.3s ease-in-out',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
          backgroundColor: 'rgba(25, 118, 210, 0.02)'
        }
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            src={product.image}
            variant="rounded"
            sx={{ 
              width: 80, 
              height: 80,
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
          >
            {product.title.charAt(0)}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant="h6" 
              component="h3" 
              gutterBottom
              sx={{
                transition: 'color 0.3s ease-in-out',
                '&:hover': {
                  color: 'primary.main'
                }
              }}
            >
              {product.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end', gap: 1 }}>
            <Typography 
              variant="h6" 
              color="primary.main"
              sx={{ 
                fontWeight: 'bold',
                fontSize: '1.1rem'
              }}
            >
              ${price.toFixed(2)}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton
                onClick={handleDecrement}
                disabled={currentAmount <= 1}
                size="small"
                sx={{
                  transition: 'all 0.2s ease-in-out',
                  '&:hover:not(:disabled)': {
                    backgroundColor: 'error.light',
                    color: 'error.contrastText',
                    transform: 'scale(1.1)'
                  }
                }}
              >
                <Remove />
              </IconButton>
              <TextField
                value={currentAmount}
                onChange={handleInputChange}
                inputProps={{
                  min: 1,
                  max: 10,
                  style: { textAlign: 'center', width: 60 }
                }}
                size="small"
                sx={{ 
                  width: 80,
                  '& .MuiOutlinedInput-root': {
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.main',
                        borderWidth: '2px'
                      }
                    },
                    '&.Mui-focused': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.main',
                        borderWidth: '2px'
                      }
                    }
                  }
                }}
              />
              <IconButton
                onClick={handleIncrement}
                disabled={currentAmount >= 10}
                size="small"
                sx={{
                  transition: 'all 0.2s ease-in-out',
                  '&:hover:not(:disabled)': {
                    backgroundColor: 'success.light',
                    color: 'success.contrastText',
                    transform: 'scale(1.1)'
                  }
                }}
              >
                <Add />
              </IconButton>
              <IconButton
                onClick={handleDelete}
                size="small"
                sx={{
                  transition: 'all 0.2s ease-in-out',
                  color: 'error.main',
                  '&:hover': {
                    backgroundColor: 'error.light',
                    color: 'error.contrastText',
                    transform: 'scale(1.1)'
                  }
                }}
              >
                <Delete />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
        {isLast && status === 'created' && (
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                  variant="contained"
                  color="primary"
                  onClick={() => console.log("SUBMIT: ", orderId)}
                  sx={{ minWidth: 120 }}
              >
                Submit Order
              </Button>
            </Box>
        )}
      </Box>
  )
}

export default OrderListItem
