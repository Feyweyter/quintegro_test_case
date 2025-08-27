import React, { useState, useEffect } from 'react'
import { ShoppingCart } from 'lucide-react'
import { useHistory } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

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

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      className="text-gray-700 hover:bg-gray-100 relative"
      title="Current Order"
    >
      <ShoppingCart className="h-5 w-5" />
      {itemCount > 0 && (
        <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs bg-blue-500 text-white">
          {itemCount}
        </Badge>
      )}
    </Button>
  )
}

export default CurrentOrder
