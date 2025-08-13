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
import { Add, Remove } from '@mui/icons-material'

interface OrderListItemProps {
  product: {
    id: string
    title: string
    description: string
    image: string
  }
  amount: number
  onAmountChange: (productId: string, newAmount: number) => void
}

const OrderListItem: React.FC<OrderListItemProps> = ({ product, amount, onAmountChange }) => {
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

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Product Image */}
          <Avatar
            src={product.image}
            variant="rounded"
            sx={{ width: 80, height: 80 }}
          >
            {product.title.charAt(0)}
          </Avatar>

          {/* Product Details */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" component="h3" gutterBottom>
              {product.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>
          </Box>

          {/* Amount Controls */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              onClick={handleDecrement}
              disabled={currentAmount <= 1}
              size="small"
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
              sx={{ width: 80 }}
            />
            
            <IconButton
              onClick={handleIncrement}
              disabled={currentAmount >= 10}
              size="small"
            >
              <Add />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default OrderListItem
