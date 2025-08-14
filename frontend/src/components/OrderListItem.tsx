import React, { useState } from 'react'
import {
  Card,
  CardContent,
  Box,
  Typography,
  TextField,
  IconButton,
  Avatar
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
  onAmountChange: (productId: string, newAmount: number) => void
  onDelete: (productId: string) => void
}

const OrderListItem: React.FC<OrderListItemProps> = ({ product, amount, price, onAmountChange, onDelete }) => {
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
    const value = parseInt(event.target.value, 10)
    if (!isNaN(value)) {
      handleAmountChange(value)
    }
  }

  const handleDelete = () => {
    onDelete(product.id)
  }

  return (
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
          {/* Product Image */}
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

          {/* Product Details */}
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

          {/* Amount Controls */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end', gap: 1 }}>
            {/* Price Display */}
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

            {/* Amount Controls */}
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
                type="number"
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

              {/* Delete Button */}
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
  )
}

export default OrderListItem
