import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Box
} from '@mui/material'

const HeaderComponent: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div">
            Quintegro Frontend
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default HeaderComponent
