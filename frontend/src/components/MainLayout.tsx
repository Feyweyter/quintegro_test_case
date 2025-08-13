import React from 'react'
import { Box, Container } from '@mui/material'
import HeaderComponent from './HeaderComponent'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <HeaderComponent />
      <Box
        component="main"
        sx={{
          flex: 1,
          overflow: 'auto',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            maxWidth: '1250px',
            width: '100%',
            py: 3,
            px: 2
          }}
        >
          {children}
        </Container>
      </Box>
    </Box>
  )
}

export default MainLayout
