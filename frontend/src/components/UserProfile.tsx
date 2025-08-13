import React, { useState } from 'react'
import {
  IconButton,
  Menu,
  MenuItem,
  Typography
} from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import { useHistory } from 'react-router-dom'

const UserProfile: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const history = useHistory()
  
  const isAuthenticated = !!localStorage.getItem('auth_token')
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogin = () => {
    handleClose()
    history.push('/login')
  }

  const handleLogout = () => {
    handleClose()
    localStorage.removeItem('auth_token')
    // Force page reload to update authentication state
    window.location.reload()
  }

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="large"
        sx={{ ml: 2 }}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {isAuthenticated ? (
          <MenuItem onClick={handleLogout}>
            <Typography>Logout</Typography>
          </MenuItem>
        ) : (
          <MenuItem onClick={handleLogin}>
            <Typography>Login</Typography>
          </MenuItem>
        )}
      </Menu>
    </>
  )
}

export default UserProfile
