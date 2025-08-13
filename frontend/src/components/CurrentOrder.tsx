import React, { useState, useEffect } from 'react'
import {
  IconButton,
  Badge,
  Tooltip
} from '@mui/material'
import { ShoppingCart } from '@mui/icons-material'
import { useHistory } from 'react-router-dom'

const CurrentOrder: React.FC = () => {
  const [itemCount, setItemCount] = useState(0)
  const history = useHistory()

  useEffect(() => {
    // Initialize with stub data if not exists
    const currentItems = localStorage.getItem('currentItems')
    if (!currentItems) {
      localStorage.setItem('currentItems', '10')
      setItemCount(10)
    } else {
      setItemCount(parseInt(currentItems, 10))
    }
  }, [])

  const handleClick = () => {
    history.push('/order')
  }

  // Only show badge if there are items
  if (itemCount === 0) {
    return (
      <Tooltip title="Current Order">
        <IconButton
          onClick={handleClick}
          size="large"
          sx={{ ml: 2 }}
          color="inherit"
        >
          <ShoppingCart />
        </IconButton>
      </Tooltip>
    )
  }

  return (
    <Tooltip title="Current Order">
      <IconButton
        onClick={handleClick}
        size="large"
        sx={{ ml: 2 }}
        color="inherit"
      >
        <Badge badgeContent={itemCount} color="secondary">
          <ShoppingCart />
        </Badge>
      </IconButton>
    </Tooltip>
  )
}

export default CurrentOrder
