import React, { useState } from 'react'
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Container
} from '@mui/material'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../graphql/mutations'

const LoginPage: React.FC = () => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const history = useHistory()

  const [loginMutation, { loading: isLoading }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      localStorage.setItem('auth_token', data.login.token)
      history.push('/')
    },
    onError: (error) => {
      setError(error.message || 'An error occurred. Please try again.')
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      await loginMutation({
        variables: {
          input: { login, password }
        }
      })
    } catch (err) {
      // Error is handled by onError callback
    }
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100%',
          py: 4
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            maxWidth: 400
          }}
        >
          <Typography variant="h5" component="h1" gutterBottom align="center">
            Login
          </Typography>
          
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Login"
              variant="outlined"
              margin="normal"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
              disabled={isLoading}
            />
            
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />

            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}

export default LoginPage
