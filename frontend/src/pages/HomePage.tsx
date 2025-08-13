import React from 'react'
import { Typography, Paper, Box } from '@mui/material'

const HomePage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to Quintegro
      </Typography>
      <Box sx={{ p: 3, mt: 2 }}>
        <Typography variant="body1" paragraph>
          This is the home page of the Quintegro application.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Built with React 18, TypeScript 5, Material-UI 7, and Vite.
        </Typography>
      </Box>
    </Box>
  )
}

export default HomePage
